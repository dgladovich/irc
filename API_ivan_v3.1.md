#Ivan c++ nodejs API 
##Data recieved types
* [Data recieved from controller](#data-recieved-from-controller)
* [Data recieved from node js server](#data-recieved-from-node-js-server)
###  Data recieved from controller 
####Event groups
* [Status](#statuses)
* [Values](#values)
* [State](#state)
* [Alarm](#alarm)
* [Mode](#mode)
* [Speed](#speed)

####Statuses 
 ```json
    {
        "status": {
        //    "dev_id": "status",
            "102": 1,
            "30": 1
        }
    }
 ```
 
####Values
 ```json
    {
        // only string !!!!
        "values": {
            "102": "10",  // "value id": "value"
            "30": "102.5"
        }
    }
 ```
####State // Do or not do?   -------------
 ```json
    {
        "state": {
            "102": 0, // "dev id": "value"
            "30": 1
        }
    }
 ```
####Alarm
 ```json
    {
        "cuuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id generated each time when origin alarm 
        "alarm": {
             "dev_id": "err_code"
        }
        
    }
 ```
####Mode
 ```json
    {
        "mode": 2 // Mode number
    }
 ```
####Speed
 ```json
    {
        "speed": 65
    }
 ```
 
 ###Data recieved from node js server
 ####Event groups
 * [Controll](#statuses)
 
####Controll
Controll event group has following methods: 
 * [Speed](#speed) Todo
 * [Start](#start)
 * [Stop](#stop)
 * [Confirm](#confirm)
 * [Repair](#repair)
####Speed   // ToDo: Don't worked yet --------
 ```json
    {
        "control": "speed",
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", // UUIDV1 - unique id assigned to command
        "value": 45
    }
 ```
####Start
 ```json
    {
        "control": "start",
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id assigned to command
	
    }
 ```
####Stop
 ```json
    {
        "control": "stop",
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id assigned to command
        
    }
 ```
####Confirm
 ```json
    {
        "control": "confirm",
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
        "cuuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", // UUIDV1 - field which controller generated with alarm
        "exec":true
    }
 ```
####Repair
Putting device in repair:
 ```json
    {
        "control": "repair:in",
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
        "id": 45 controller
    } 
 ```
 Putting device out of repair:
 ```json
    {
        "control": "repair:out",
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
        "id": 45 // device id
    }
 ```
