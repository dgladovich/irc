const net = require('net');
const moment = require('moment');
const ControllerModel = require('./ControllerModel');
const DevicesCollection = require('./collections/DevicesCollection');
const FacesCollection = require('./collections/FacesCollection');
const QueueCollection = require('./collections/QueueCollection');
const AlarmsCollection = require('./collections/AlarmsCollection');
const Radio = require('backbone.radio');
const _ = require('underscore');
const uuidv1 = require('uuid/v1');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const ch = Radio.channel('controllerChannel');
const log = require('simple-node-logger').createSimpleFileLogger({
    logFilePath: 'smart.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});
const SECRET = process.env.AUTH_SECRET;
const PORT = process.env.TEST_CONTROLLER_PORT;
const ADDRESS = '127.0.0.1';

const controller = new ControllerModel(config.ctrl);
const devices = new DevicesCollection(config.ctrl.devs);
const faces = new FacesCollection(_.toArray(config.ctrl.cfaces));
const queues = new QueueCollection();
const alarms = new AlarmsCollection();

const {Alarm, Queue, User, SystemError} = require('../models/index');

controller.set({
    devices: devices,
    faces: faces,
    queues: queues,
    alarms: alarms
});

class ControllerRepeater {
    constructor() {
        this.controller = controller;
        this.client = new net.Socket();
        this._bindControllerEvents();
        this._bindUserEvents();
        this._loadInitialData().then(this._connect.bind(this))
        this._connect();

        log.log('info', `Controller initialized`);
        console.log('Controller repeater was intitialized'.cyan);
    }

    ///////////////////////
    //Connection Actions//
    //////////////////////

    _connect() {
        return this.client.connect(PORT, ADDRESS);
    }

    _disconnect() {
        return this.client.destroy();
    }

    _loadInitialData() {
        let data = [
            this._fetchAlarms(),
            this._fetchQueues()
        ]
        return Promise.all(data)
    }

    _fetchQueues() {
        return Queue.findAll({raw: true})
            .then(qs => {
                queues.add(qs)
            })
            .catch((e) => {
                console.log(`Error while fetching queues to database:`.red, e)
            });
    }

    _fetchAlarms() {
        Alarm
            .findAll({
                where: {
                    usr_confirm: null
                },
                raw: true
            })
            .then(alars => {
                alarms.add(alars)
            })
            .catch((e) => {
                console.log(`Error while fetching queues to database:`.red, e)
            });
    }

    _bindControllerEvents() {
        this.client.on('data', this.onControllerData.bind(this));
        this.client.on('connect', this.onControllerConnected.bind(this))
        this.client.on('close', this.onControllerClose.bind(this));
        this.client.on('error', this.onControllerConnectionError.bind(this));
    }

    _bindUserEvents() {
        ch.on('controll:command', this.onUserCommand.bind(this));
        ch.reply('initial:status', this.onRequestStatus.bind(this));
        ch.reply('initial:values', this.onRequestValues.bind(this));
        ch.reply('initial:alarms', this.onRequestAlarms.bind(this));
        ch.reply('initial:controller:status', this.onRequestControllerStatus.bind(this));
    }

    onControllerConnected() {
        queues.each(queue => {
            let args = {
                devId: 345,
                alarmId: queue.get('argument'),
                uuid: queue.get('uuid')
            };
            let command = {
                method: queue.get('method'),
                arguments: args
            }
            this.client.write(JSON.stringify(command))
        });
        //this.client.write(JSON.stringify(queues.toJSON()))
        log.log('info', 'Connection to controller established');
        console.log(`Repeater connected to TCP server on address: ${ADDRESS}, port: ${PORT}`.cyan);
    }

    onControllerClose() {
        console.log(`Controller server connection closed`.cyan);
        this.controller.get('devices').each((device) => {
            device.set('stat', 6);
        });
        ch.trigger('serror', {
            eventType: 'serror',
            data: [
                {
                    error: 'Connection with controller closed'
                }
            ]

        });
        setTimeout(this._connect.bind(this), 500);
    }

    onControllerConnectionError() {
        console.log(`Error while connected to controller`.cyan);
        let error = {
            uuid: uuidv1(),
            created_at: moment().format(`DD-MM-YYYY HH:mm:ss`),
            error_name: `Emergency disconnected from controller`
        }
        log.log('error', 'Error while connected to controller')
        SystemError
            .create(error)
            .then(() => {
                ch.trigger('serror', error)
            })
            .catch((e) => {
                console.log(`Error while writing error to database`.red)
            })

        this.controller.get('devices').each((device) => {
            device.set('stat', 6);
        })
        ch.trigger('serror', {
            event: 'serror',
            data: [
                {
                    error: 'Error while connected to controller'
                }
            ]

        })
    }

    ///////////////////
    //CONTROLLER DATA//
    ///////////////////
    onControllerData(d) {
        let data;
        if (d) {
            try {
                data = JSON.parse(d.toString());
                this.selectAction(data.eventGroup, data);
            } catch (e) {
                console.log(e); // error in the above string (in this case, yes)!
            }
        }
    }

    onChangeDeviceStatus(data) {
        _.each(data, (item) => {
            this.controller.get('devices').findWhere({id: +item.id}).set({stat: +item.stat, mode: +item.mode});
        })
    }

    onChangeDeviceValue(data) {
        _.each(data, (item) => {
            this.controller.get('faces').findWhere({id: +item.id}).set('def', +item.def);
        })
    }

    onOriginAlarm(data) {
        console.log(`Recieved alarm from controller`.cyan);

        Alarm
            .create(data)
            .then((shit) => {
                const message = {
                    method: `origin`,
                    data: data
                };
                ch.trigger('alarm', message)
            })
            .catch((e) => {
                console.log(`Error while writing alarm to database: ${e}`.red)
            })
    }


    onChangeDeviceMode(data) {
        _.each(data, (item) => {
            this.controller.get('devices').findWhere({id: +item.id}).set('mode', +item.mode);
        })
    }

    onControllerCommandResponse(data) {
        if (data.executed) {
            this.onControllerExecution.call(this, data);
        } else {
            this.onFailControllerExecution.call(this, data);
        }
        //ch.trigger('controll:exec', data);
    }

    onControllerExecution(data) {
        let uuid = data.uuid,
            queueUpdates = {
                execute_date: moment().format(`DD-MM-YYYY HH:mm:ss`),
                status: 'executed',
            },
            queueUpdateConditions = {
                where: {
                    uuid: uuid
                }
            };
        Queue
            .update(queueUpdates, queueUpdateConditions)
            .then(() => {
                let executedQueue = queues.findWhere({uuid: uuid});
                if (executedQueue) {
                    executedQueue.set('status', 'executed');
                    this.afterExecutionAction.call(this, executedQueue);
                }
            })
            .catch((e) => {
                console.log(`Error while updating queue status`.red)
            });
        console.log(`Controller executed command with uuid: ${uuid}`.cyan);
    }

    onFailControllerExecution(data) {
        console.log(`Something go wrong while controller executed command: ${data.uuid}`.yellow)
        log.log('error', `Something go wrong while controller executed command: ${data.uuid}`)

    }

    afterExecutionAction(queue) {
        let method = queue.get('method');
        switch (method) {
            case 'confirm':
                this.onControllerAlarmConfirm.call(this, queue)
                break;
            case 'speed':
                this.onControllerSpeedChange.call(this, queue);
                break;
            case 'repair':
                this.onControllerRepairExecution.call(this, queue);
                break;
            case 'stop':
                this.onControllerStopExecution.call(this, queue);
                break;
            case 'start':
                this.onControllerStartExecution.call(this, queue);
                break;
            default:
                console.log(`Unknown type of execution command method: ${method}`.red);
                return;
        }
    }

    onControllerAlarmConfirm(queue) {
        let aID = queue.get('argument'),
            userId = queue.get('user_id'),
            date_confirm = moment().format(`DD-MM-YYYY HH:mm:ss`),
            alarmUpdates = {
                usr_confirm: userId,
                date_confirm: date_confirm
            },
            alarmUpdatesConditions = {
                where: {id: aID}
            };
        Alarm
            .update(alarmUpdates, alarmUpdatesConditions)``
            .then((alarm) => {
                console.log('Alarm updated in DB'.cyan);
                let message = {
                    method: 'confirm',
                    data: {
                        aID: aID,
                        userId: userId,
                        date_confirm: date_confirm
                    }
                }

                ch.trigger('alarm', message);

            })
            .catch((e) => {
                console.log(`Error while updating alarm in DB`.red, e)
            })
    }

    //USER COMMANDS
    onUserCommand(data) {
        let method = data.method;
        switch (method) {
            case 'confirm':
                this.onUserAlarmConfirmation.call(this, data)
                break;
            case 'repair':
                this.onUserRepairCommand.call(this, data)
                break;
            case 'speed':
                this.onUserChangeSpeed.call(this, data)
                break;
            case 'start':
                this.onUserStartCommand.call(this, data)
                break;
            case 'stop':
                this.onUserStopCommand.call(this, data)
                break;
            default:
                console.log(`Unknown controll command method type: ${method}`.red);
                return;
        }
    }

    onUserAlarmConfirmation(cmnd) {
        const userId = cmnd.arguments.usrId;
        if (!userId) {
        } else {
            const user = jwt.verify(userId, SECRET),
                uuid = uuidv1(),
                alarmId = cmnd.arguments.alarmId,
                args = {
                    devId: cmnd.arguments.devId,
                    alarmId: alarmId,
                    uuid: uuid
                },
                command = {
                    method: cmnd.method,
                    arguments: args
                },
                queue = {
                    user_id: user.id,
                    create_date: moment().format(`DD-MM-YYYY HH:mm:ss`),
                    status: 'pending',
                    method: 'confirm',
                    uuid: uuid,
                    argument: alarmId
                };
            Queue.create(queue)
                .then((q) => {
                    queues.add(q.toJSON())
                    this.client.write(JSON.stringify(command));
                })
                .catch((e) => {
                    console.log(`Error while writing queue to database: ${uuid}`.red, e)
                });
            console.log(`User with name ${user.name} send command to confirm alarm: ${args.alarmId} `.cyan)
        }
    }

    onUserRepairCommand(cmnd) {
        console.log(cmnd)
        const user = jwt.verify(cmnd.arguments.usrId, SECRET),
            uuid = uuidv1(),
            args = {
                devId: cmnd.arguments.devId,
                uuid: uuid
            },
            command = {
                method: cmnd.method,
                arguments: args
            },
            queue = {
                user_id: user.id,
                create_date: moment().format(`DD-MM-YYYY HH:mm:ss`),
                status: 'pending',
                method: 'repair',
                uuid: uuid,
                argument: null
            };
        Queue.create(queue)
            .then((q) => {
                queues.add(q.toJSON())
                this.client.write(JSON.stringify(command));
            })
            .catch((e) => {
                console.log(`Error while writing queue to database: ${uuid}`.red, e)
            });

        console.log('Calling command to repair'.cyan)
        log.log(`User with name ${user.name} send command to set repair mode `)
        //console.log(`User with name ${user.name} send command to confirm alarm: ${args.alarmId} `.cyan)
    }

    onUserChangeSpeed(cmnd) {
        console.log(cmnd)
        const user = jwt.verify(cmnd.arguments.usrId, SECRET),
            uuid = uuidv1(),
            args = {
                devId: cmnd.arguments.devId,
                uuid: uuid
            },
            command = {
                method: cmnd.method,
                arguments: args
            },
            queue = {
                user_id: user.id,
                create_date: moment().format(`DD-MM-YYYY HH:mm:ss`),
                status: 'pending',
                method: 'speed',
                uuid: uuid,
                argument: null
            };
        Queue.create(queue)
            .then((q) => {
                queues.add(q.toJSON())
                this.client.write(JSON.stringify(command));
            })
            .catch((e) => {
                console.log(`Error while writing queue to database: ${uuid}`.red, e)
            });

        console.log('Calling command to change speed'.cyan)
        log.log(`User with name ${user.name} send command to change speed `)
        //console.log(`User with name ${user.name} send command to confirm alarm: ${args.alarmId} `.cyan)
    }

    onUserStopCommand(cmnd) {
        console.log(cmnd)
        const user = jwt.verify(cmnd.arguments.usrId, SECRET),
            uuid = uuidv1(),
            args = {
                devId: cmnd.arguments.devId,
                uuid: uuid
            },
            command = {
                method: cmnd.method,
                arguments: args
            },
            queue = {
                user_id: user.id,
                create_date: moment().format(`DD-MM-YYYY HH:mm:ss`),
                status: 'pending',
                method: 'stop',
                uuid: uuid,
                argument: null
            };
        Queue.create(queue)
            .then((q) => {
                queues.add(q.toJSON())
                this.client.write(JSON.stringify(command));
            })
            .catch((e) => {
                console.log(`Error while writing queue to database: ${uuid}`.red, e)
            });

        console.log('Calling command to stop device'.cyan)
        log.log(`User with name ${user.name} send command to stop `)
        //console.log(`User with name ${user.name} send command to confirm alarm: ${args.alarmId} `.cyan)
    }

    onUserStartCommand(cmnd) {
        console.log(cmnd)
        const user = jwt.verify(cmnd.arguments.usrId, SECRET),
            uuid = uuidv1(),
            args = {
                devId: cmnd.arguments.devId,
                uuid: uuid
            },
            command = {
                method: cmnd.method,
                arguments: args
            },
            queue = {
                user_id: user.id,
                create_date: moment().format(`DD-MM-YYYY HH:mm:ss`),
                status: 'pending',
                method: 'start',
                uuid: uuid,
            };
        Queue.create(queue)
            .then((q) => {
                queues.add(q.toJSON())
                this.client.write(JSON.stringify(command));
            })
            .catch((e) => {
                console.log(`Error while writing queue to database: ${uuid}`.red, e)
            });

        console.log('Calling command to start'.cyan)
        log.log(`User with name ${user.name} send command to start `)
        //console.log(`User with name ${user.name} send command to confirm alarm: ${args.alarmId} `.cyan)
    }

    ////////////////
    //INITIAL DATA//
    ////////////////
    onRequestAlarms() {
        return Alarm
            .findAll({
                where: {
                    usr_confirm: null
                },
                raw: true
            })
            .catch((e) => {
                console.log(`Error while getting initial alarms from DB`.red)
            })
    }

    onRequestQueues() {
        return queues.toJSON();
    }

    onRequestStatus() {
        return this.controller.get('devices').map((device) => {
            return {id: device.get('id'), stat: device.get('stat')}
        })
    }

    onRequestValues() {
        return this.controller.get('faces').map((face) => {
            return {id: face.get('id'), def: face.get('def')}
        })
    }

    onRequestControllerStatus() {
        return this.controller.get('stat');
    }

    selectAction(event, data) {
        switch (event) {
            case 'status':
                this.onChangeDeviceStatus(data.data);
                break;
            case 'values':
                this.onChangeDeviceValue(data.data);
                break;
            case 'controll':
                this.onControllerCommandResponse(data.data);
                break;
            case 'alarm':
                this.onOriginAlarm(data.data);
                break;
            case 'mode':
                this.onChangeDeviceMode(data.data);
                break;
            default:
                console.log(`Uncorrect event type ${event}, ${data}`.red)
        }
    }
}

module.exports = ControllerRepeater;