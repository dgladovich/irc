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

####Statuses 
 ```json
    {
        "ivan_id": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id generated each time when origin alarm 
        "status": {
        //    "dev_id": "status",
            "102": 1,
            "30": 1,
        }
    }
 ```
 
####Values
 ```json
    {
        "ivan_id": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id generated each time when origin alarm 
        "values": {
        //    "<dev_id>": "<value>",
            "102": "10",
            "30": "102.5",
        }
    }
 ```
####State
 ```json
    {
        "ivan_id": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id generated each time when origin alarm 
        "state": {
        //    "<dev_id>": "<state>",
            "102": 0,
            "30": 1,
        }
    }
 ```
####Alarm
 ```json
    {
        "ivan_id": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id generated each time when origin alarm 
        "alarm": {
             "dev_id": "err_code"
        }
        
    }
 ```
####Mode - 
 ```json
    {
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
        "mode": 2 // Mode number
    }
 ```
####Controll
 ```json
    {
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
        "control": "executed",
        "value": true
        
    }
 ```
 
 ###Data recieved from node js server
 ####Event groups
 * [Controll](#statuses)
 
####Controll
Controll event group has following methods: 
 * [Speed](#speed)
 * [Start](#start)
 * [Stop](#stop)
 * [Confirm](#confirm)
 * [Repair](#repair)
####Speed
 ```json
    {
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", // UUIDV1 - unique id assigned to command
        "control": "speed",	
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
        "ivan_id": "f64f2940-fae4-11e7-8c5f-ef356f279131"// UUIDV1 - field which controller generated with alarm  
    }
 ```
####Repair
Putting device in repair:
 ```json
    {
        "control": "repair:in",
        "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
        "id": 45 // device id
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
