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
        "eventGroup": "status",
        "data": {
            "id": 12, //device id 
            "stat": 23 //device status
        }
    }
 ```
 
####Values
 ```json
    {
        "eventGroup": "values",
        "data": {
            "id": 12, //face id 
            "def": 23 //value
        }
    }
 ```
####State
 ```json
    {
        "eventGroup": "state",
        "data": {
            "id": 12, //device id 
            "state": 23 //state value
        }
    }
 ```
####Alarm
 ```json
    {
        "eventGroup": "alarm",
        "data": {
            "ivan_id": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id generated each time when origin alarm 
        }
    }
 ```
####Mode
 ```json
    {
        "eventGroup": "mode",
        "data": {
            "id": 1223, //Device id
            "mode": 2 //Mode number
        }
    }
 ```
####Controll
 ```json
    {
        "eventGroup": "controll",
        "data": {
            "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
            "executed": true 
        }
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
        "eventGroup": "controll",
        "method": "speed",
        "arguments": {
            "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
            "speed": 45 
        }
    }
 ```
####Start
 ```json
    {
        "eventGroup": "controll",
        "method": "start",
        "arguments": {
            "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id assigned to command        
            }
    }
 ```
####Stop
 ```json
    {
        "eventGroup": "controll",
        "method": "stop",
        "arguments": {
            "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131" //UUIDV1 - unique id assigned to command
        }
    }
 ```
####Confirm
 ```json
    {
        "eventGroup": "controll",
        "method": "confirm",
        "arguments": {
            "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
            "ivan_id": "f64f2940-fae4-11e7-8c5f-ef356f279131"// UUIDV1 - field which controller generated with alarm  
        }
    }
 ```
####Repair
Putting device in repair:
 ```json
    {
        "eventGroup": "controll",
        "method": "repair:in",
        "arguments": {
            "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
            "id": 45 // device id
        }
    } 
 ```
 Putting device out of repair:
 ```json
    {
        "eventGroup": "controll",
        "method": "repair:out",
        "arguments": {
            "uuid": "f64f2940-fae4-11e7-8c5f-ef356f279131", //UUIDV1 - unique id assigned to command
            "id": 45 // device id
        }
    } 
 ```