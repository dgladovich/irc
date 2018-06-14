/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename, __dirname) {

var fs        = __webpack_require__(57);
var path      = __webpack_require__(2);
var Sequelize = __webpack_require__(63);
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = __webpack_require__(12)[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/* WEBPACK VAR INJECTION */}.call(exports, "/index.js", "/"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("backbone.radio");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("backbone");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const log = __webpack_require__(64).createSimpleFileLogger({
    logFilePath: 'smart.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

class Logger {
    constructor(){

    }
    onControllerConectionEstablish(port, address){
        log.log('info', 'Connection to controller established');
        console.log(`Connect to controller on address: ${address}, port: ${port}`.cyan);
    }
    onControllerConnectionAttempt(port, address){
        let msg = `Trying connect to controller on port ${port} address ${address}`;
        log.log('info', msg);
        console.log(msg.cyan);
    }
    onControllerDisconnected(){
        let msg = `Controller disconnected`;
        console.log(msg.red);
        log.log('error', msg);
    }
    onControllerConnectionError(){
        console.log(`Error while connected to controller`.red);
        log.log('error', 'Error while connected to controller');
    }
    onControllerRecieveDataWithError(e){
        console.log('Error while get data from controller'.red);
        console.log(e);
        log.log('error', 'Error while getting data from controller');
    }
    onRecieveAlarm(){
        console.log(`Recieved alarm from controller`.cyan);
        log.log('warning', 'Recieved alarm from controller');
    }
    onFailControllerExecution(){
        console.log(`Something go wrong while controller executed command: `.yellow)
        log.log('error', `Something go wrong while controller executed command: `)
    }
}

module.exports = Logger;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const passport = __webpack_require__(62);
const { User } = __webpack_require__(1);
const JwtStrategy = __webpack_require__(13).Strategy;
const ExtractJwt = __webpack_require__(13).ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_SECRET;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    return User
        .findOne({where: { id: jwt_payload.id }, attributes: ['id', 'name']} )
        .then((user) => {
            if (user) {
                return done(null, user.toJSON());
            } else {
                return done(null, false);
                // or you could create a new account
            }
        })
        .catch((err) => {
            return done(err, false);
        })
}));

module.exports = passport;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"ctrl":{"id":2,"typ":2,"ip":"192.168.15.103","port":3001,"name":"Фильтр","cla":1,"plist":1,"stat":6,"mode_grp":2,"mode":3,"active":1,"devs":[{"id":1,"ctrl":2,"typ":2,"contyp":null,"grp":null,"name":"Фильтр цилиндрический ZEO-FCS-10.12","modif":56,"moto":0,"body_id":2,"parent":null,"nomi":7,"cur":null,"x":1,"y":1,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":0,"visible":1,"spec_act":0,"active":1,"dports":[{"id":1,"dev":1,"port_type":1,"port_dir":2,"port":0,"name":"Индикатор Работы"},{"id":2,"dev":1,"port_type":1,"port_dir":2,"port":1,"name":"Индикатор Предупр"},{"id":3,"dev":1,"port_type":1,"port_dir":2,"port":2,"name":"Индикатор Аварии"},{"id":4,"dev":1,"port_type":1,"port_dir":2,"port":3,"name":"Сирена"},{"id":5,"dev":1,"port_type":1,"port_dir":1,"port":4,"name":"Режим Местный"},{"id":6,"dev":1,"port_type":1,"port_dir":1,"port":5,"name":"Режим Дистанция"},{"id":7,"dev":1,"port_type":1,"port_dir":1,"port":6,"name":"Сервисная Кнопка"}],"dfaces":{},"nominals":[{"keyn":"valve_cnt","name":"Количество клапанов","meas":15,"val":"0"},{"keyn":"sleeve_cnt","name":"Количество рукавов","meas":15,"val":"0"},{"keyn":"nozzle_ispresend","name":"Наличие форсунки","meas":25,"val":"0"},{"keyn":"imp_len","name":"Длительность срабатывания клапана","meas":8,"val":"300"},{"keyn":"imp_period","name":"Длительность между импульсами","meas":8,"val":"1000"},{"keyn":"numof_cicles","name":"Количество завершающих циклов","meas":15,"val":"2"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":2,"ctrl":2,"typ":3,"contyp":null,"grp":null,"name":"Корпус фильтра","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":61,"cur":null,"x":52,"y":46,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":0,"visible":1,"spec_act":0,"active":1,"dports":[{"id":50,"dev":2,"port_type":1,"port_dir":2,"port":0,"name":"port_green"},{"id":51,"dev":2,"port_type":1,"port_dir":2,"port":1,"name":"port_yellow"},{"id":52,"dev":2,"port_type":1,"port_dir":2,"port":2,"name":"port_red"},{"id":53,"dev":2,"port_type":1,"port_dir":2,"port":3,"name":"port_horn"},{"id":54,"dev":2,"port_type":1,"port_dir":2,"port":4,"name":"port_runf"},{"id":55,"dev":2,"port_type":1,"port_dir":1,"port":5,"name":"portbt_serv"},{"id":56,"dev":2,"port_type":1,"port_dir":1,"port":6,"name":"portbt_run"}],"dfaces":{},"nominals":[{"keyn":"imp_len","name":"Длительность импульса","meas":8,"val":"500"},{"keyn":"imp_period","name":"Длительность между импульсами","meas":8,"val":"1000"},{"keyn":"num_endcicles","name":"Количество завершающих циклов","meas":15,"val":"0"},{"keyn":"valve_chdelay","name":"Задержка измерения состояния клапана","meas":8,"val":"100"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":3,"ctrl":2,"typ":12,"contyp":6,"grp":null,"name":"Датчик люка ревизионного","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":17,"y":25,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":8,"dev":3,"port_type":1,"port_dir":1,"port":0,"name":"state"}],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":4,"ctrl":2,"typ":9,"contyp":null,"grp":null,"name":"Привод вентилятора","modif":1,"moto":0,"body_id":null,"parent":5,"nomi":11,"cur":null,"x":57,"y":14,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":0,"visible":0,"spec_act":1,"active":0,"dports":[{"id":9,"dev":4,"port_type":1,"port_dir":1,"port":0,"name":"Контр Пускателя"},{"id":10,"dev":4,"port_type":1,"port_dir":1,"port":1,"name":"Контр Опер Напр"},{"id":11,"dev":4,"port_type":1,"port_dir":2,"port":2,"name":"Включ Пускателя"}],"dfaces":{},"nominals":[{"keyn":"voltage","name":"Напряжение","meas":1,"val":"0"},{"keyn":"rate","name":"Обороты","meas":14,"val":"0"},{"keyn":"start_type","name":"Тип пуска","meas":null,"val":"0"},{"keyn":"ip","name":"IP","meas":null,"val":"192.168.15.140"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":5,"ctrl":2,"typ":1,"contyp":2,"grp":null,"name":"Вентилятор","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":43,"y":26,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":0,"visible":1,"spec_act":0,"active":1,"dports":[{"id":57,"dev":5,"port_type":1,"port_dir":2,"port":0,"name":"state"},{"id":58,"dev":5,"port_type":1,"port_dir":2,"port":1,"name":"state_ctrl"}],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":6,"ctrl":2,"typ":9,"contyp":null,"grp":null,"name":"Привод затвора шлюзового","modif":3,"moto":0,"body_id":null,"parent":7,"nomi":11,"cur":null,"x":41,"y":83,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":0,"visible":1,"spec_act":0,"active":0,"dports":[{"id":12,"dev":6,"port_type":1,"port_dir":1,"port":0,"name":"Контроль пускателя"},{"id":13,"dev":6,"port_type":1,"port_dir":1,"port":1,"name":"Контр Опер Напр"},{"id":14,"dev":6,"port_type":1,"port_dir":2,"port":2,"name":"Включ Пускателя"}],"dfaces":{},"nominals":[{"keyn":"voltage","name":"Напряжение","meas":1,"val":"0"},{"keyn":"rate","name":"Обороты","meas":14,"val":"0"},{"keyn":"start_type","name":"Тип пуска","meas":null,"val":"0"},{"keyn":"ip","name":"IP","meas":null,"val":"192.168.15.140"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":7,"ctrl":2,"typ":11,"contyp":2,"grp":null,"name":"Затвор шлюзовой","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":56,"y":84,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":0,"visible":1,"spec_act":0,"active":1,"dports":[{"id":59,"dev":7,"port_type":1,"port_dir":2,"port":0,"name":"state"},{"id":60,"dev":7,"port_type":1,"port_dir":2,"port":1,"name":"state_ctrl"}],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":8,"ctrl":2,"typ":16,"contyp":4,"grp":null,"name":"Датчик пыли на выходе","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":27,"cur":null,"x":30,"y":19,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":0,"dports":[],"dfaces":{},"nominals":[{"keyn":"mindust","name":"Калиб Мин Концентр","meas":0,"val":"0"},{"keyn":"minots","name":"Калиб Мин Отсчет","meas":0,"val":"0"},{"keyn":"maxdust","name":"Калиб макс Коцентр","meas":0,"val":"0"},{"keyn":"maxots","name":"Калиб Макс отсчет","meas":0,"val":"0"},{"keyn":"nulltype","name":"Калиб знач нуля","meas":0,"val":"0"},{"keyn":"activfan","name":"Порог активации вент","meas":0,"val":"0"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":9,"ctrl":2,"typ":13,"contyp":6,"grp":null,"name":"Конденсатоотводчик","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":93,"y":40,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":0,"dports":[{"id":16,"dev":9,"port_type":1,"port_dir":1,"port":1,"name":"state"}],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":10,"ctrl":2,"typ":14,"contyp":6,"grp":null,"name":"Датчик сжатого воздуха","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":25,"cur":null,"x":84,"y":24,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":17,"dev":10,"port_type":3,"port_dir":1,"port":0,"name":"state"}],"dfaces":{},"nominals":[{"keyn":"presmax","name":"Калиб Давление макс","meas":0,"val":"0"},{"keyn":"otsmax","name":"Калиб отсчет Макс","meas":0,"val":"0"},{"keyn":"presmin","name":"Калиб Давление мин","meas":null,"val":"0"},{"keyn":"otsmin","name":"Калиб Отсчет мин","meas":0,"val":"0"},{"keyn":"nullstat","name":"Калиб значение нуля","meas":0,"val":"0"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":11,"ctrl":2,"typ":19,"contyp":6,"grp":null,"name":"Датчик панели взрыворазрядителя","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":11,"y":77,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":18,"dev":11,"port_type":1,"port_dir":1,"port":0,"name":"state"}],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":12,"ctrl":2,"typ":15,"contyp":3,"grp":null,"name":"Датчик дифференциального давления","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":23,"cur":null,"x":71,"y":16,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":19,"dev":12,"port_type":3,"port_dir":1,"port":0,"name":"Диф Давление"}],"dfaces":{},"nominals":[{"keyn":"minots","name":"Калибр Мин отсчет","meas":0,"val":"0"},{"keyn":"kalibminper","name":"Калибр Мин перепад","meas":0,"val":"0"},{"keyn":"cmaxots","name":"Калибр Макс отсчет","meas":0,"val":"0"},{"keyn":"cmaxper","name":"Калибр Макс перепад","meas":0,"val":"0"},{"keyn":"nullstat","name":"Калибр Значение нуля","meas":0,"val":"0"},{"keyn":"stepregsta","name":"Порог начала регенер","meas":25,"val":"0"},{"keyn":"stepregend","name":"Порог оконч регенер","meas":25,"val":"0"},{"keyn":"maxper","name":"Макс перепад","meas":25,"val":"0"},{"keyn":"minper","name":"Мин перепад","meas":25,"val":"0"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":13,"ctrl":2,"typ":16,"contyp":4,"grp":null,"name":"Датчик пыли на входе","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":27,"cur":null,"x":26,"y":82,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":0,"dports":[],"dfaces":{},"nominals":[{"keyn":"mindust","name":"Калиб Мин Концентр","meas":0,"val":"0"},{"keyn":"minots","name":"Калиб Мин Отсчет","meas":0,"val":"0"},{"keyn":"maxdust","name":"Калиб макс Коцентр","meas":0,"val":"0"},{"keyn":"maxots","name":"Калиб Макс отсчет","meas":0,"val":"0"},{"keyn":"nulltype","name":"Калиб знач нуля","meas":0,"val":"0"},{"keyn":"activfan","name":"Порог активации вент","meas":0,"val":"0"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":14,"ctrl":2,"typ":20,"contyp":6,"grp":null,"name":"Датчик вращения","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":15,"cur":null,"x":69,"y":84,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":20,"dev":14,"port_type":1,"port_dir":1,"port":0,"name":"state"}],"dfaces":{},"nominals":[{"keyn":"r_wait","name":"Ожидание вращения","meas":7,"val":"0"},{"keyn":"max_rtime","name":"Макс время раскрутки","meas":7,"val":"0"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":15,"ctrl":2,"typ":10,"contyp":6,"grp":1,"name":"Электроклапан №1","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":88,"y":76,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":22,"dev":15,"port_type":1,"port_dir":2,"port":1,"name":"state"}],"dfaces":{"15":{"id":15,"dev":15,"tardev":null,"name":"Статус","viewgrp":null,"viewtype":4,"stat_grp":2,"meas":null,"min_val":0,"max_val":0,"def":0,"lim_warning":0,"lim_warning_code":null,"lim_danger":0,"lim_danger_code":null,"history_fix":0,"use_range":0,"range_warn_min":0,"range_warn_min_code":null,"range_crit_min":0,"range_crit_min_code":null,"range_warn_max":0,"range_warn_max_code":null,"range_crit_max":0,"range_crit_max_code":null,"orde":0,"show_scat":0,"visible":1,"dvars":[{"id":61,"dev":15,"dface":15,"var_id":2,"val":"","name":"status","type":""}]}},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":16,"ctrl":2,"typ":10,"contyp":6,"grp":1,"name":"Электроклапан №2","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":92,"y":87,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":24,"dev":16,"port_type":1,"port_dir":2,"port":1,"name":"state"}],"dfaces":{"16":{"id":16,"dev":16,"tardev":null,"name":"Статус","viewgrp":null,"viewtype":4,"stat_grp":2,"meas":null,"min_val":0,"max_val":0,"def":0,"lim_warning":0,"lim_warning_code":null,"lim_danger":0,"lim_danger_code":null,"history_fix":0,"use_range":0,"range_warn_min":0,"range_warn_min_code":null,"range_crit_min":0,"range_crit_min_code":null,"range_warn_max":0,"range_warn_max_code":null,"range_crit_max":0,"range_crit_max_code":null,"orde":0,"show_scat":0,"visible":1,"dvars":[{"id":2,"contyp":6,"name":"status","val":"0","active":1,"type":""}]}},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":17,"ctrl":2,"typ":10,"contyp":6,"grp":1,"name":"Электроклапан №3","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":85,"y":87,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":0,"active":1,"dports":[{"id":26,"dev":17,"port_type":1,"port_dir":2,"port":1,"name":"state"}],"dfaces":{"17":{"id":17,"dev":17,"tardev":null,"name":"Статус","viewgrp":null,"viewtype":null,"stat_grp":2,"meas":null,"min_val":0,"max_val":0,"def":0,"lim_warning":0,"lim_warning_code":null,"lim_danger":0,"lim_danger_code":null,"history_fix":0,"use_range":0,"range_warn_min":0,"range_warn_min_code":null,"range_crit_min":0,"range_crit_min_code":null,"range_warn_max":0,"range_warn_max_code":null,"range_crit_max":0,"range_crit_max_code":null,"orde":0,"show_scat":0,"visible":1,"dvars":[{"id":2,"contyp":6,"name":"status","val":"0","active":1,"type":""}]}},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":18,"ctrl":2,"typ":10,"contyp":6,"grp":null,"name":"Форсунка","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":60,"cur":null,"x":82,"y":81,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":1,"spec_act":1,"active":1,"dports":[{"id":27,"dev":18,"port_type":1,"port_dir":2,"port":0,"name":"state"}],"dfaces":{},"nominals":[{"keyn":"fors","name":"fors_","meas":null,"val":"1"},{"keyn":"imp_len_nzl","name":"Длительность импульса","meas":8,"val":"1000"},{"keyn":"cycle_time_nzl","name":"Продув каждые","meas":8,"val":"1"},{"keyn":"nozzle_chdelay","name":"Задержка измерения состояния","meas":6,"val":"200"}],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":19,"ctrl":2,"typ":23,"contyp":6,"grp":null,"name":"Кнопка Аварийный Стоп","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":8,"y":48,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":0,"visible":1,"spec_act":0,"active":1,"dports":[{"id":29,"dev":19,"port_type":1,"port_dir":1,"port":0,"name":"state"}],"dfaces":{"18":{"id":18,"dev":19,"tardev":null,"name":"Состояние","viewgrp":null,"viewtype":null,"stat_grp":null,"meas":null,"min_val":0,"max_val":0,"def":0,"lim_warning":0,"lim_warning_code":null,"lim_danger":0,"lim_danger_code":null,"history_fix":0,"use_range":0,"range_warn_min":0,"range_warn_min_code":null,"range_crit_min":0,"range_crit_min_code":null,"range_warn_max":0,"range_warn_max_code":null,"range_crit_max":0,"range_crit_max_code":null,"orde":0,"show_scat":0,"visible":1,"dvars":[{"id":2,"contyp":6,"name":"status","val":"0","active":1,"type":""}]}},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":69,"ctrl":2,"typ":34,"contyp":null,"grp":null,"name":"Фильтр-регулятор","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":0,"y":0,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":0,"spec_act":0,"active":0,"dports":[],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":71,"ctrl":2,"typ":36,"contyp":null,"grp":null,"name":"Предохранительный пневмоклапан","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":0,"y":0,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":0,"spec_act":0,"active":0,"dports":[],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},{"id":72,"ctrl":2,"typ":37,"contyp":null,"grp":null,"name":"Ресивер","modif":null,"moto":0,"body_id":null,"parent":1,"nomi":null,"cur":null,"x":0,"y":0,"sgrp":1,"stat":6,"state_grp":null,"state":0,"ecode":0,"repairable":1,"visible":0,"spec_act":0,"active":0,"dports":[],"dfaces":{},"nominals":[],"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}}],"cmodules":{"100":{"id":100,"ctrl":2,"module":10,"i2c":33,"port":2,"in_type":1,"port_dir":2,"cmodule_opts":[{"id":163,"ctrl_module":100,"opt":72,"name":"Q1","invers":1,"antidreb":0,"i2c_addr":0,"in_type":1,"dev_port":50,"port_dir":2,"port_num":7,"port_type":1,"dev_port_name":"port_green","dev":2},{"id":164,"ctrl_module":100,"opt":73,"name":"Q2","invers":1,"antidreb":0,"i2c_addr":0,"in_type":1,"dev_port":51,"port_dir":2,"port_num":6,"port_type":1,"dev_port_name":"port_yellow","dev":2},{"id":165,"ctrl_module":100,"opt":74,"name":"Q3","invers":1,"antidreb":0,"i2c_addr":0,"in_type":1,"dev_port":52,"port_dir":2,"port_num":5,"port_type":1,"dev_port_name":"port_red","dev":2},{"id":166,"ctrl_module":100,"opt":75,"name":"Q4","invers":1,"antidreb":0,"i2c_addr":0,"in_type":1,"dev_port":53,"port_dir":2,"port_num":4,"port_type":1,"dev_port_name":"port_horn","dev":2},{"id":167,"ctrl_module":100,"opt":76,"name":"Q5","invers":1,"antidreb":0,"i2c_addr":0,"in_type":1,"dev_port":54,"port_dir":2,"port_num":3,"port_type":1,"dev_port_name":"port_runf","dev":2},{"id":168,"ctrl_module":100,"opt":77,"name":"Q6","invers":1,"antidreb":0,"i2c_addr":0,"in_type":1,"dev_port":57,"port_dir":2,"port_num":2,"port_type":1,"dev_port_name":"state","dev":5},{"id":169,"ctrl_module":100,"opt":78,"name":"Q7","invers":1,"antidreb":0,"i2c_addr":0,"in_type":1,"dev_port":58,"port_dir":2,"port_num":1,"port_type":1,"dev_port_name":"state_ctrl","dev":5}]},"101":{"id":101,"ctrl":2,"module":11,"i2c":38,"port":2,"in_type":1,"port_dir":2,"cmodule_opts":[{"id":170,"ctrl_module":101,"opt":79,"name":"Q9","invers":1,"antidreb":0,"i2c_addr":7,"in_type":1,"dev_port":22,"port_dir":2,"port_num":0,"port_type":1,"dev_port_name":"state","dev":15},{"id":171,"ctrl_module":101,"opt":80,"name":"Q10","invers":1,"antidreb":0,"i2c_addr":7,"in_type":1,"dev_port":24,"port_dir":2,"port_num":1,"port_type":1,"dev_port_name":"state","dev":16},{"id":172,"ctrl_module":101,"opt":81,"name":"Q11","invers":1,"antidreb":0,"i2c_addr":7,"in_type":1,"dev_port":26,"port_dir":2,"port_num":2,"port_type":1,"dev_port_name":"state","dev":17},{"id":173,"ctrl_module":101,"opt":82,"name":"Q12","invers":1,"antidreb":0,"i2c_addr":7,"in_type":1,"dev_port":null,"port_dir":2,"port_num":3,"port_type":1,"dev_port_name":"","dev":0},{"id":174,"ctrl_module":101,"opt":83,"name":"Q13","invers":1,"antidreb":0,"i2c_addr":7,"in_type":1,"dev_port":27,"port_dir":2,"port_num":4,"port_type":1,"dev_port_name":"state","dev":18},{"id":175,"ctrl_module":101,"opt":84,"name":"Q14","invers":1,"antidreb":0,"i2c_addr":7,"in_type":1,"dev_port":59,"port_dir":2,"port_num":5,"port_type":1,"dev_port_name":"state","dev":7},{"id":176,"ctrl_module":101,"opt":85,"name":"Q15","invers":1,"antidreb":0,"i2c_addr":7,"in_type":1,"dev_port":60,"port_dir":2,"port_num":6,"port_type":1,"dev_port_name":"state_ctrl","dev":7}]},"104":{"id":104,"ctrl":2,"module":12,"i2c":32,"port":0,"in_type":1,"port_dir":1,"cmodule_opts":[{"id":191,"ctrl_module":104,"opt":86,"name":"I1","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":5,"port_dir":1,"port_num":0,"port_type":1,"dev_port_name":"Режим Местный","dev":1},{"id":192,"ctrl_module":104,"opt":87,"name":"I2","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":6,"port_dir":1,"port_num":1,"port_type":1,"dev_port_name":"Режим Дистанция","dev":1},{"id":193,"ctrl_module":104,"opt":88,"name":"I3","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":55,"port_dir":1,"port_num":2,"port_type":1,"dev_port_name":"portbt_serv","dev":2},{"id":194,"ctrl_module":104,"opt":89,"name":"I4","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":8,"port_dir":1,"port_num":3,"port_type":1,"dev_port_name":"state","dev":3},{"id":195,"ctrl_module":104,"opt":90,"name":"I5","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":9,"port_dir":1,"port_num":4,"port_type":1,"dev_port_name":"Контр Пускателя","dev":4},{"id":196,"ctrl_module":104,"opt":91,"name":"I6","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":10,"port_dir":1,"port_num":5,"port_type":1,"dev_port_name":"Контр Опер Напр","dev":4},{"id":197,"ctrl_module":104,"opt":92,"name":"I7","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":12,"port_dir":1,"port_num":6,"port_type":1,"dev_port_name":"Контроль пускателя","dev":6},{"id":198,"ctrl_module":104,"opt":100,"name":"I8","invers":1,"antidreb":0,"i2c_addr":2,"in_type":1,"dev_port":13,"port_dir":1,"port_num":7,"port_type":1,"dev_port_name":"Контр Опер Напр","dev":6}]},"106":{"id":106,"ctrl":2,"module":13,"i2c":32,"port":1,"in_type":1,"port_dir":1,"cmodule_opts":[{"id":206,"ctrl_module":106,"opt":93,"name":"I9","invers":1,"antidreb":0,"i2c_addr":3,"in_type":1,"dev_port":null,"port_dir":1,"port_num":0,"port_type":1,"dev_port_name":"","dev":0},{"id":207,"ctrl_module":106,"opt":94,"name":"I10","invers":1,"antidreb":0,"i2c_addr":3,"in_type":1,"dev_port":16,"port_dir":1,"port_num":1,"port_type":1,"dev_port_name":"state","dev":9},{"id":208,"ctrl_module":106,"opt":95,"name":"I11","invers":1,"antidreb":0,"i2c_addr":3,"in_type":1,"dev_port":18,"port_dir":1,"port_num":2,"port_type":1,"dev_port_name":"state","dev":11},{"id":209,"ctrl_module":106,"opt":96,"name":"I12","invers":1,"antidreb":0,"i2c_addr":3,"in_type":1,"dev_port":20,"port_dir":1,"port_num":3,"port_type":1,"dev_port_name":"state","dev":14},{"id":210,"ctrl_module":106,"opt":97,"name":"I13","invers":1,"antidreb":0,"i2c_addr":3,"in_type":1,"dev_port":56,"port_dir":1,"port_num":4,"port_type":1,"dev_port_name":"portbt_run","dev":2},{"id":211,"ctrl_module":106,"opt":98,"name":"I14","invers":1,"antidreb":0,"i2c_addr":3,"in_type":1,"dev_port":29,"port_dir":1,"port_num":5,"port_type":1,"dev_port_name":"state","dev":19}]}},"ccams":{"1":{"id":1,"ip":"192.168.15.155","ctrl":2,"pos":"top","posx":0,"posy":0},"2":{"id":2,"ip":"192.168.15.155","ctrl":2,"pos":"bottom","posx":0,"posy":0}},"cameras":[{"id":1,"ip":"192.168.15.155","ctrl":2,"pos":"top","posx":0,"posy":0},{"id":2,"ip":"192.168.15.155","ctrl":2,"pos":"bottom","posx":0,"posy":0}],"pass":{"id":1,"controll_otk":"-","weight":340,"release_date":"2017-12-01","name":"ZEO-FCS-21.20","fact_number":1,"ctrl":2,"perfomance":"1200–1600 м³/час"},"stats":{"0":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"1":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"2":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"3":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"4":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"5":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"6":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}},"alive":1,"online":0,"speed":0,"host":"","grps":[{"id":1,"ctrl":2,"name":"Электроклапана","x":5,"y":13,"active":1}],"alrs":{},"modes":{"3":{"id":3,"mode_id":2,"name":"tit_turnedoff"},"4":{"id":4,"mode_id":2,"name":"tit_distance"},"5":{"id":5,"mode_id":2,"name":"tit_manual"}},"dev_grps":[{"id":1,"ctrl":2,"name":"Электроклапана","x":5,"y":13,"active":1}],"pickshit":{"27":{"id":27,"list":1,"des":"ZEO-FC","name":"Фильтр цилиндрический ZEO-FCS-10.12\t","cnt":1,"marks":"","active":1},"28":{"id":28,"list":1,"des":"ZEO-FC","name":"Затвор шлюзовый ZEO-RW-9","cnt":1,"marks":"0,25 кВт","active":1},"29":{"id":29,"list":1,"des":"","name":"Патрубок переходной ZEO-TT-&empty;140-210x180","cnt":1,"marks":"5.8 кг","active":1}},"controllers":[{"id":2,"ip":"192.168.15.103","port":3001,"name":"Фильтр","img":1},{"id":5,"ip":"192.168.15.101","port":3001,"name":"Нория","img":24},{"id":6,"ip":"192.168.15.102","port":3001,"name":"Конвейер скребковый","img":46}]},"dev_grps":[{"id":1,"ctrl":2,"name":"Электроклапана","x":5,"y":13,"active":1}],"statuses":{"1":{"id":1,"name":"stat_default","active":1,"sgrps_opts":{"1":{"id":1,"num":0,"grp":1,"name":"stat_ready","clr":"#c7c7c9","bgclr":"#545454","active":1,"dclass":""},"2":{"id":2,"num":1,"grp":1,"name":"stat_inwork","clr":"#0db800","bgclr":"#043001","active":1,"dclass":"active"},"3":{"id":3,"num":2,"grp":1,"name":"stat_crash","clr":"#e12c0d","bgclr":"#330a03","active":1,"dclass":"danger"},"4":{"id":4,"num":3,"grp":1,"name":"stat_serv","clr":"#ffa200","bgclr":"#472d00","active":1,"dclass":"service"},"5":{"id":5,"num":4,"grp":1,"name":"stat_manu","clr":"#00ddda","bgclr":"#004c4b","active":1,"dclass":"manual"},"6":{"id":6,"num":5,"grp":1,"name":"stat_repa","clr":"#0072ff","bgclr":"#001f47","active":1,"dclass":"repair"},"7":{"id":7,"num":6,"grp":1,"name":"stat_nocon","clr":"black","bgclr":"white","active":1,"dclass":"die"}}},"2":{"id":2,"name":"stat_openclose","active":1,"sgrps_opts":{"8":{"id":8,"num":0,"grp":2,"name":"stat_close","clr":"#0db800","bgclr":"","active":1,"dclass":"active"},"9":{"id":9,"num":1,"grp":2,"name":"stat_open","clr":"#e12c0d","bgclr":"","active":1,"dclass":"danger"}}},"8":{"id":8,"name":"stat_offon","active":1,"sgrps_opts":{"20":{"id":20,"num":0,"grp":8,"name":"stat_off","clr":"#e12c0d","bgclr":"","active":1,"dclass":"danger"},"21":{"id":21,"num":1,"grp":8,"name":"stat_on","clr":"#0db800","bgclr":"","active":1,"dclass":"active"}}},"9":{"id":9,"name":"stat_normcrash","active":1,"sgrps_opts":{"22":{"id":22,"num":0,"grp":9,"name":"stat_crash","clr":"#e12c0d","bgclr":"","active":1,"dclass":"danger"},"23":{"id":23,"num":1,"grp":9,"name":"stat_norm","clr":"#0db800","bgclr":"","active":1,"dclass":"active"}}},"10":{"id":10,"name":"Норма/Авария","active":1,"sgrps_opts":{"24":{"id":24,"num":0,"grp":10,"name":"stat_norm","clr":"#0db800","bgclr":"","active":1,"dclass":"active"},"25":{"id":25,"num":1,"grp":10,"name":"stat_crash","clr":"#e12c0d","bgclr":"","active":1,"dclass":"danger"}}},"11":{"id":11,"name":"Режимы Приводов","active":1,"sgrps_opts":{"26":{"id":26,"num":0,"grp":11,"name":"stat_off","clr":"#e12c0d","bgclr":"","active":1,"dclass":"danger"},"27":{"id":27,"num":1,"grp":11,"name":"stat_manu","clr":"#e12c0d","bgclr":"","active":1,"dclass":"danger"},"28":{"id":28,"num":2,"grp":11,"name":"stat_distrez","clr":"#0db800","bgclr":"","active":1,"dclass":"active"}}},"12":{"id":12,"name":"stat_onoff","active":1,"sgrps_opts":{"29":{"id":29,"num":0,"grp":12,"name":"stat_on","clr":"#0db800","bgclr":"","active":1,"dclass":"active"},"30":{"id":30,"num":1,"grp":12,"name":"stat_off","clr":"#e12c0d","bgclr":"","active":1,"dclass":"danger"}}},"13":{"id":13,"name":"stat_offon","active":1,"sgrps_opts":{"32":{"id":32,"num":0,"grp":13,"name":"stat_off","clr":"#e12c0d","bgclr":"","active":1,"dclass":null},"33":{"id":33,"num":1,"grp":13,"name":"stat_on","clr":"#0db800","bgclr":"","active":1,"dclass":null}}},"14":{"id":14,"name":"stat_offon","active":1,"sgrps_opts":{"34":{"id":34,"num":0,"grp":14,"name":"stat_off","clr":"#0db800","bgclr":"","active":1,"dclass":null},"35":{"id":35,"num":1,"grp":14,"name":"stat_on","clr":"#e12c0d","bgclr":"","active":1,"dclass":null}}},"15":{"id":15,"name":"Режимы работы","active":1,"sgrps_opts":{"36":{"id":36,"num":0,"grp":15,"name":"stat_turnedoff","clr":"","bgclr":"","active":1,"dclass":null},"37":{"id":37,"num":1,"grp":15,"name":"stat_distance","clr":"","bgclr":"","active":1,"dclass":null},"38":{"id":38,"num":2,"grp":15,"name":"stat_mest","clr":"","bgclr":"","active":1,"dclass":null}}}},"viewgrps":{"1":{"id":1,"name":"tit_air","active":1},"2":{"id":2,"name":"obj_fan","active":1},"3":{"id":3,"name":"obj_body","active":1},"4":{"id":4,"name":"obj_gate","active":1},"5":{"id":5,"name":"tit_noriahead","active":1},"6":{"id":6,"name":"obj_body","active":1},"7":{"id":7,"name":"tit_noriafoot","active":1},"8":{"id":8,"name":"tit_privod","active":1},"9":{"id":9,"name":"obj_body","active":1},"10":{"id":10,"name":"tit_natyazh","active":1}},"ecodes":{"0":{"id":0,"typ":0,"name":"","reason":"","solution":"","dtypes":null},"1":{"id":1,"typ":0,"name":"Устройство исправно","reason":"","solution":"","dtypes":null},"2":{"id":2,"typ":0,"name":"Включен","reason":"","solution":"","dtypes":null},"3":{"id":3,"typ":0,"name":"Выключен","reason":"","solution":"","dtypes":null},"4":{"id":4,"typ":0,"name":"Выведен в ремонт","reason":"","solution":"","dtypes":null},"5":{"id":5,"typ":0,"name":"Выведен из ремонта","reason":"","solution":"","dtypes":null},"6":{"id":6,"typ":2,"name":"Отсутствует оперативное напряжение","reason":"Нет напряжения сети<br>Сработал автомат защиты                 ","solution":"Обратиться к электротехническому персоналу предприятия","dtypes":9},"7":{"id":7,"typ":2,"name":"Сработал автомат защиты двигателя","reason":"Неисправность электропроводки<br>Неисправность электродвигателя","solution":"Обратиться к технической службе предприятия","dtypes":9},"8":{"id":8,"typ":1,"name":"Отключён или в местном режиме","reason":"Самопроизвольное срабатывание (внутреннее повреждение) кнопки<br>Несанкционированное переключение оборудования в местный режим.","solution":"Оператору или обслуживающему персоналу выяснить переведено ли оборудование в местный режим, или это ложный сигнал<br>В первой ситуации вызвать дежурного электрика","dtypes":9},"9":{"id":9,"typ":2,"name":"Несанкционированное изменение режима работы","reason":"Несанкционированное переключение оборудования в местный режим.","solution":"Оператору узнать причину изменения режима работы и действовать согласно инструкций и правил установленных на предприятии и в соответствии с правилами ТБ","dtypes":9},"10":{"id":10,"typ":2,"name":"Авария контактора. Нет обратной связи","reason":"Повреждение контактора<br>Повреждение эл. цепей контактора","solution":"Обратиться к электротехническому персоналу предприятия","dtypes":9},"11":{"id":11,"typ":2,"name":"Авария контактора. Отключён в работе","reason":"Повреждение контактора<br>Повреждение эл. цепей контактора","solution":"Обратиться к электротехническому персоналу предприятия","dtypes":9},"12":{"id":12,"typ":1,"name":"Повышенная температура двигателя ","reason":"Ложное срабатывание<br>Сильное загрязнение электродвигателя<br>Повреждение или отсутствие крыльчатки охлаждения<br>Внутренние повреждения электродвигателя (межвитковое замыкание)","solution":"Электротехническому персоналу проверить температуру, и если она повышенная найти причины<br>Очистить электродвигатель<br>Заменить крыльчатку<br>Электротехническому персоналу заменить или отремонтировать электродвигатель","dtypes":9},"13":{"id":13,"typ":2,"name":"Критическая температура двигателя ","reason":"Ложное срабатывание<br>Повреждение или отсутствие крыльчатки охлаждения<br>Внутренние повреждения электродвигателя (межвитковое замыкание)","solution":"Остановить норию, поставить в ремонт и определить причину<br>Электротехническому персоналу проверить температуру, и если она повышенная найти причины<br>Заменить крыльчатку<br>Электротехническому персоналу заменить или отремонтировать электродвигатель","dtypes":9},"14":{"id":14,"typ":1,"name":"Превышено номинальное значение нагрузки на двигатель","reason":"Превышение или неравномерность подачи продукта<br>Снижение напряжения и аварии в питающей сети<br>Неисправен или не сработал датчик подпора<br>Обратная сыпь продукта в холостую ветвь","solution":"Проверить равномерность подачи продукта, в случае превышения подачи прикрыть задвижку<br>Остановить транспортер, сообщить дежурному электрику<br>Отремонтировать или заменить датчик<br>Предпринять меры по устранению обратной сыпи","dtypes":9},"15":{"id":15,"typ":2,"name":"Превышено максимальное значение нагрузки на двигатель","reason":"Снижение напряжения или авария в питающей сети<br>Перегрузка механизма продуктом<br>Механическая неисправность","solution":"Остановить транспортер, сообщить дежурному электрику<br>Сообщить техническому персоналу<br>Отремонтировать или заменить датчик <br>Проверить исправность механизмов","dtypes":9},"16":{"id":16,"typ":1,"name":"Повышенная температура редуктора","reason":"Ложное срабатывание<br>Низкий уровень масла в корпусе редуктора<br>Внутренние повреждения редуктора","solution":"Обслуживающему персоналу проверить температуру редуктора, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Смотреть редуктор на наличие подтеканий, устранить и долить трансмиссионное масло<br>Вызвать специалистов сервисной службы","dtypes":9},"17":{"id":17,"typ":2,"name":"Критическая температура редуктора","reason":"Ложное срабатывание<br>Низкий уровень масла в корпусе редуктора<br>Необходима замена масла редуктора<br>Внутренние повреждения редуктора","solution":"Обслуживающему персоналу проверить температуру редуктора, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Смотреть редуктор на наличие подтеканий, устранить и долить трансмиссионное масло<br>Вызвать специалистов сервисной службы","dtypes":9},"18":{"id":18,"typ":1,"name":"Зажата кнопка \"Аварийный стоп\"","reason":"Самопроизвольное срабатывание (внутреннее повреждение) кнопки<br>Несанкционированная остановка оборудования","solution":"Оператору или обслуживающему персоналу выяснить включена кнопка аварийного останова, или это ложный сигнал. В первой ситуации вызвать дежурного электрика","dtypes":23},"19":{"id":19,"typ":2,"name":"В работе нажата кнопка \"Аварийный стоп\"","reason":"Самопроизвольное срабатывание (внутреннее повреждение) кнопки<br>Несанкционированная остановка оборудования","solution":"Оператору или обслуживающему персоналу выяснить причины включения кнопки \"Аварийный стоп\"","dtypes":23},"20":{"id":20,"typ":2,"name":"Нет контроля скорости","reason":"Неисправен датчик<br>Не отрегулирован зазор от датчика до лепестков<br>Механизм имеет: повреждение или посторонние предметы, мешающие вращению<br>Механизм перегружен продуктом","solution":"Заменить датчик<br>Отрегулировать зазор<br>Выяснит причину и устранить<br>Разгрузить механизм","dtypes":20},"21":{"id":21,"typ":1,"name":"Скорость конвейера на 10% ниже","reason":"Возможно некачественное электроснабжение или повреждение мотор-редуктора<br>Превышена максимальная подача продукта<br>Избыточная обратная сыпь","solution":"Электротехническому персоналу проверить электродвигатель и качество подводимого эл. питания<br>Уменьшить подачу продукта<br>Устранить обратную сыпь","dtypes":20},"22":{"id":22,"typ":2,"name":"Скорость конвейера на 20% ниже","reason":"Возможно некачественное электроснабжение или повреждение мотор-редуктора<br>Превышена максимальная подача продукта<br>Избыточная обратная сыпь","solution":"Электротехническому персоналу проверить электродвигатель и качество подводимого тока<br>Уменьшить подачу продукта<br>Устранить обратную сыпь","dtypes":20},"23":{"id":23,"typ":1,"name":"Превышено время разгон конвейера","reason":"Конвейер забит продуктом<br>Проскальзывание ленты на барабане головки нории","solution":"Очистить норию и запустить повторно<br>Натянуть ленту нории","dtypes":20},"24":{"id":24,"typ":2,"name":"Нет разгона конвейера","reason":"Конвейер забит продуктом<br>Качество электроснабжения<br>Внутренние повреждения электродвигателя","solution":"Очистить норию и запустить повторно<br>Электротехническому персоналу проверить качество электроснабжения<br>Вызвать специалистов сервисной службы.","dtypes":20},"25":{"id":25,"typ":2,"name":"Сработал датчик подпора","reason":"Забит самотёк на выходе нории<br>Ложное срабатывание","solution":"Выяснить причину и устранить её<br>Заменить либо отремонтировать датчик","dtypes":27},"26":{"id":26,"typ":1,"name":"Повышенная температура подшипника","reason":"Ложное срабатывание<br>Отсутствие или недостаточное количество смазки в подшипниковом узле<br>Внутренние повреждения подшипника","solution":"Обслуживающему персоналу проверить температуру подшипника, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Выяснить причину отсутствия или недостатка смазки в узле, добавить смазки<br>Заменить подшипник","dtypes":30},"27":{"id":27,"typ":2,"name":"Критическая температура подшипника","reason":"Ложное срабатывание<br>Отсутствие или недостаточное количество смазки в подшипниковом узле<br>Внутренние повреждения подшипника","solution":"Обслуживающему персоналу проверить температуру подшипника, в случае ложного срабатывания вызвать дежурного инженера КиП<br>Выяснить причину отсутствия или недостатка смазки в узле, добавить смазки<br>Заменить подшипник","dtypes":30},"28":{"id":28,"typ":1,"name":"Повышенная вибрация","reason":"Разрушение (внутренние повреждения подшипникового узла<br>Налипание продукта на барабан головки нории<br>Разрушение футеровки барабана головки нории","solution":"Заменить подшипниковый узел<br>Oчистить барабан головки нории<br>Заменить футеровку","dtypes":18},"29":{"id":29,"typ":2,"name":"Критическая вибрация","reason":"Разрушение (внутренние повреждения подшипникового узла)<br>Налипание продукта<br>Разрушение футеровки","solution":"Остановить конвейер и выяснить причину<br>Заменить подшипник<br>Очистить барабан","dtypes":18},"30":{"id":30,"typ":2,"name":"Сход ленты","reason":"Сход ленты по причине неравномерного растяжения","solution":"Отправить тех персонал для регулировки ленты","dtypes":21},"31":{"id":31,"typ":2,"name":"Нет давления сжатого воздуха.","reason":"Не работает компрессор<br>В зимний период возможно промерзание воздухоподводящих трубок<br>Обрыв трассы сжатого воздуха","solution":"Обратиться к техперсоналу","dtypes":14},"32":{"id":32,"typ":2,"name":"Давление сжатого воздуха ниже нормы.","reason":"Недостаточная производительность компрессора<br>Утечка воздуха<br>В зимний период возможно промерзание воздухоподводящих трубок","solution":"Обратиться к техперсоналу","dtypes":14},"33":{"id":33,"typ":2,"name":"Давление сжатого воздуха выше нормы.","reason":"Неисправен регулятор давления ресивера","solution":"Отремонтировать либо заменить","dtypes":14},"34":{"id":34,"typ":1,"name":"Наличие конденсата в системе.","reason":"Неисправен осушитель","solution":"Произвести диагностику и вызвать специализированную сервисную службу","dtypes":13},"35":{"id":35,"typ":2,"name":"Конденсатоотводчик не в норме.","reason":"Конденсатоотводчик неисправен","solution":"Заменить, либо отремонтировать","dtypes":13},"36":{"id":36,"typ":2,"name":"Авария конденсатоотводчика.","reason":"Конденсатоотводчик неисправен<br>Засорение входного отверстия конденсатоотводчика<br>Образование воздушной пробки в конденсатоотводчике<br>В зимний период возможно примерзание ","solution":"Заменить, либо отремонтировать<br>Демонтировать конденсатоотводчик. Прочистить либо заменить сетчатый фильтр на входе\n<br>Выполнить принудительный сброс конденсата<br>Oбратиться к техперсоналу","dtypes":13},"37":{"id":37,"typ":2,"name":"Датчик взрыворазрядителя не в норме.","reason":"Неисправен датчик<br>Обрыв провода датчика\n  ","solution":"Устранить неисправность датчика или проводки<br>Обратиться к электротехнической службе предприятия   \n  ","dtypes":19},"38":{"id":38,"typ":2,"name":"Сработал датчик взрыворазрядителя.","reason":"Ложное срабатывание<br>Резкий перепад давления в системе воздуховодов вызванный не правильным пуском оборудования<br>Открытие мембраны","solution":"Устранить неисправность датчика или проводки<br>Заменить взрыворазрядитель<br>Обратиться к руководителю техслужбы","dtypes":19},"39":{"id":39,"typ":2,"name":"Потеряна связь с датчиком пыли","reason":"Пропал, или окислился контакт","solution":"Обратиться к электротехническому персоналу","dtypes":16},"40":{"id":40,"typ":2,"name":"Авария датчика пыли","reason":"Неисправен датчик пыли","solution":"Обратиться к электротехническому персоналу","dtypes":16},"41":{"id":41,"typ":1,"name":"Повышенный уровень выброса пыли","reason":"Не корректная регулировка регенерации и других характеристик фильтра<br>Повреждены фильтроэлементы<br>Нарушен герметичность корпуса между камерами чистого и запыленного воздуха. Повреждение уплотнений<br>Нарушена герметизация в посадочных местах фильтровальных элементов<br>Фильтровальный элемент зафиксирован плохо","solution":"Произвести регулировку фильтра<br>Заменить фильтровальные элементы<br>Проверить затяжку болтов корпуса фильтра. Выполнить герметизацию корпуса<br>Проверить затяжку болтовых соединений каркасов фильтровальных элементов. Целостность уплотнений<br>Проверить целостность пружинного кольца и равномерность прилегания к адаптеру<br>Проверить затяжку хомутов и равномерный обжим фильтровального элемента.","dtypes":16},"42":{"id":42,"typ":2,"name":"Критический уровень выброса пыли","reason":"Не корректная регулировка регенерации и других характеристик фильтра<br>Входные параметры в фильтр выше нормы<br>Повреждены фильтроэлементы                              ","solution":"Произвести регулировку фильтра<br>Уменьшить расход воздуха при помощи шиберной задвижки<br>Заменить фильтровальные элементы                                              ","dtypes":16},"45":{"id":45,"typ":2,"name":"Несанкционированное открытие люка обслуживания.","reason":"Ложное срабатывание<br>Тех персонал не закрыл либо несанкционированное открыл люк","solution":"Устранить неисправность датчика или проводки<br>Обратиться к руководителю техслужбы","dtypes":12},"46":{"id":46,"typ":2,"name":"Отсутствует механическое срабатывание электроклапана","reason":"Клапан забит или заклинил<br>Повреждена мембрана","solution":"Отремонтировать клапан<br>Заменить мембрану","dtypes":10},"47":{"id":47,"typ":2,"name":"Обрыв эл. цепи электроклапана","reason":"Обрыв эл. цепи электроклапана","solution":"Обратиться к электротехническому персоналу","dtypes":10},"48":{"id":48,"typ":2,"name":"Короткое замыкания эл. цепи электроклапана","reason":"Короткое замыкания эл. цепи электроклапана","solution":"Обратиться к электротехническому персоналу","dtypes":10},"49":{"id":49,"typ":2,"name":"Ошибка","reason":"причина1","solution":"нет","dtypes":1}},"meas":{"1":{"id":1,"name":"meas_volt"},"2":{"id":2,"name":"meas_watt"},"3":{"id":3,"name":"meas_kwatt"},"4":{"id":4,"name":"meas_amp"},"5":{"id":5,"name":"meas_hour"},"6":{"id":6,"name":"meas_min"},"7":{"id":7,"name":"meas_sec"},"8":{"id":8,"name":"meas_milisec"},"9":{"id":9,"name":"meas_ghz"},"10":{"id":10,"name":"meas_cels"},"11":{"id":11,"name":"meas_pa"},"12":{"id":12,"name":"meas_bar"},"13":{"id":13,"name":"meas_proc"},"14":{"id":14,"name":"meas_rpm"},"15":{"id":15,"name":"meas_cnt"},"16":{"id":16,"name":"meas_g"},"17":{"id":17,"name":"meas_kg"},"18":{"id":18,"name":"meas_tonn"},"19":{"id":19,"name":"meas_liter"},"20":{"id":20,"name":"meas_kbps"},"21":{"id":21,"name":"meas_angle"},"22":{"id":22,"name":"meas_dustmeas"},"23":{"id":23,"name":"meas_vibro"},"24":{"id":24,"name":"meas_count"},"25":{"id":25,"name":"meas_nothing"}},"usrs":[{"id":1,"name":"Администратор"},{"id":2,"name":"Заказчик"},{"id":3,"name":"Оператор"},{"id":4,"name":"Инженер"},{"id":5,"name":"Админ"},{"id":6,"name":"test111"}]}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"development":{"storage":"smart.db","dialect":"sqlite"},"test":{"username":"root","password":null,"database":"database_test","host":"127.0.0.1","dialect":"mysql"},"production":{"username":"root","password":null,"database":"database_production","host":"127.0.0.1","dialect":"mysql"}}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("uuid/v1");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (app) {
    //const Switch = require('./Switch');
    //const switchBoard = new Switch(app);
    __webpack_require__(39)
}



/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(0);
const _ = __webpack_require__(9);

const router = express.Router();
const path = __webpack_require__(2);
const to = __webpack_require__(53);
const errors = __webpack_require__(47);
const journal = __webpack_require__(48);
const svc = __webpack_require__(51);
const testing = __webpack_require__(52);
const controller = __webpack_require__(45);
const devices = __webpack_require__(46);
const statuses = __webpack_require__(50);
const analitics = __webpack_require__(42);
const values = __webpack_require__(54);
const login = __webpack_require__(49);
const config = __webpack_require__(44);
const passport = __webpack_require__(10);
const bot = __webpack_require__(43);


/* GET home page. */
router
    .get('/', function (req, res, next) {
        if (/*req.user === undefined*/ false) {
            res.redirect('/auth')
        } else {
            //res.sendFile(path.resolve('public', 'main.html'));
            res.sendFile(path.resolve('dist', 'index.html'));
        }
    })
router.use('/to', to);
router.use('/controller', controller);
router.use('/journal', journal);
router.use('/testing', testing);
router.use('/devices', devices);
router.use('/statuses', statuses);
router.use('/analitics', analitics);
router.use('/svc', svc);
router.use('/login', login);
router.use('/errors', errors);
router.use('/values', values);
router.use('/config', config);
router.use('/bot', bot);



module.exports = router;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
__webpack_require__(20).config()
const colors = __webpack_require__(18);
const express = __webpack_require__(0);
const app = express();
__webpack_require__(15)(app); //CONTROLLER server app
//require('./support')(app);//SUPPORT server app
const path = __webpack_require__(2);
const favicon = __webpack_require__(23);
const logger = __webpack_require__(22);
const cookieParser = __webpack_require__(19);
const bodyParser = __webpack_require__(17);
const session = __webpack_require__(21);
const passport = __webpack_require__(10);
const routes = __webpack_require__(16);

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(passport.initialize());


app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(process.env.SERVER_PORT);

module.exports = app;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// @flow

const ControllerServer = __webpack_require__(27);
const Logger = __webpack_require__(7);
const ZeoClient = __webpack_require__(33);
const SocketServer = __webpack_require__(32);
const Radio = __webpack_require__(3);
const DataHub = __webpack_require__(28);
const uuidv1 = __webpack_require__(14);
const moment = __webpack_require__(4);
const Database = __webpack_require__(55);
const db = new Database('smart.db');

const CC = Radio.channel('ControllerConnector');

class CentralBroker {
    constructor() {
        let broker = {broker: this};
        this.controllerServer = new ControllerServer(broker);
        this.dh = new DataHub(broker);
        this.zeoClient = new ZeoClient(broker);
        this.socketServer = new SocketServer(broker);
        this.logger = new Logger(broker);
        this.BUFFER = [];
        this.writingBuffer = setInterval(this.uploadBuffer.bind(this), 15000)

    }

    getControllerStatus() {
        return this.dh.getControllerStatus();
    }

    getInitialSpeed() {
        return this.dh.getSpeed();
    }

    getInitialQueues() {
        return this.dh.getQueues();
    }

    getUserInitialAlarms() {
        return this.dh.getAlarmsJSON();
    }

    getUserInitialValues() {
        return this.dh.getValuesJSON();
    }

    getUserInitialStatuses() {
        return this.dh.getStatusesJSON();
    }

    handleChangedStatus(status) {
        let {id, stat} = status;
        this.dh.updateStatus(id, stat);
        this.socketServer.sendStatus(id, stat);
        this.zeoClient.sendStatus(id, stat);
    }

    handleChangedValue(value) {
        let {id, def} = value;
        this.dh.updateValue(id, def);
        this.socketServer.sendValue(id, def);
        this.zeoClient.sendValue(id, def);
    }

    handleChangedState(data) {
        let {id, state} = data;
        this.socketServer.sendState(id, state);
        this.zeoClient.sendState(id, state);
    }

    handleChangedMode(mode) {
    }

    handleAlarmOrigin(data) {
    }

    handleExecutedCommand(data) {
    }

    onAlarmOrigin(pack) {
        const alarm = pack.data;

        this.logger.onRecieveAlarm();
        this.dh.addAlarm(alarm).then((alrm) => {
            this.socketServer.sendAlarmOrigin(alrm);
            this.zeoClient.sendAlarmOrigin(alrm);
        });
    }

    onControllerSpeedChange(queue) {
        let speed = queue.get('argument');
        this.dh.updateSpeed(speed);
        this.socketServer.sendSpeed(speed);
        this.zeoClient.sendSpeed(speed);
    }

    onControllerAlarmConfirm(queue) {
        let {argument, execute_date, user_id} = queue.toJSON();
        this.dh
            .updateAlarm(argument, user_id, execute_date)
            .then((alarm) => {
                this.socketServer.sendAlarmConfirmation(argument);
                this.zeoClient.sendAlarmConfirmation(argument);
            });
    }

    onChangeDeviceStatus(pack) {
        const statuses = pack.data;
        statuses.forEach((status) => {
            this.dh.updateStatus(status);
            this.socketServer.sendStatus(status);
            this.zeoClient.sendStatus(status);
        })
    }

    onChangeDeviceMode(pack) {
    }

    onControllerCommandResponse(pack) {
        if (pack.data.executed) {
            this.onControllerExecution.call(this, pack.data);
        } else {
            this.onFailControllerExecution.call(this, pack.data);
        }
    }

    onControllerExecution(data) {
        let uuid = data.uuid;
        let vals = {
            status: 'executed'
        };

        this.dh.updateQueue(uuid, vals).then((queue) => {
            this.afterExecutionAction.call(this, this.dh.getQueue(uuid))
        });
    }

    onFailControllerExecution(data) {
        this.logger.onFailControllerExecution();
    }

    sendControllerInitialData() {
        let queues = this.dh.getQueues();
    }


    setDevicesOffline() {
        this.dh.getDevices().each((device) => {
            let devId = device.get('id'),
                stat = 6;
            console.log(`Setting device ${device.get('name')} offline`);
            device.set('stat', 6);
            this.socketServer.sendStatus(devId, stat);
            this.zeoClient.sendStatus(devId, stat);
        })
    }

    setControllerOffline() {
        this.dh.updateControllerStatus(stat);
    }


    writeValueBuffer(value) {
        return this.BUFFER.push({
            face_id: value.id,
            def: value.def
        });
    }

    uploadBuffer() {
        this.BUFFER.forEach((buff) => {
            let buffer = {
                face_id: buff.face_id,
                def: buff.def,
                created_at: moment().format('YYYY-MM-DD')
            };

        });
        //this.dh.bulkWriteValue(this.BUFFER);

        this.BUFFER = [];
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


    confirmAlarm(pack) {
        if (pack) {
            let uuid = uuidv1(),
                confirmationMessage = {
                    eventGroup: 'controll',
                    method: 'confirm',
                    arguments: {
                        ivan_id: pack.ivan_id,
                        uuid: uuid
                    }
                },
                queueMessage = {
                    method: 'confirm',
                    argument: pack.ivan_id,
                    user_id: pack.user_id,
                    uuid: uuid
                };
            this.dh
                .addQueue(queueMessage)
                .then((data) => {
                    console.log(confirmationMessage)
                    this.controllerServer.sendDataToController(confirmationMessage);
                });
        }
    }

    setRepair(pack) {
        console.log('Central Broker: sending stop command to controller');

    }

    startController(pack) {
        let uuid = uuidv1();
        console.log('Central Broker: sending start command to controller');
        this.controllerServer.startController(uuid);
    }

    stopController(pack) {
        let uuid = uuidv1();
        console.log('Central Broker: sending stop command to controller');
        this.controllerServer.stopController(uuid);
    }

    changeSpeed(pack) {
        console.log('Central Broker: sending change speed command to controller');
        let uuid = uuidv1(),
            {speed, user_id} = pack,
            queueMessage = {
                method: 'speed',
                argument: +speed,
                user_id: +user_id,
                uuid: uuid
            };
        this.dh
            .addQueue(queueMessage)
            .then((data) => {
                this.controllerServer.changeSpeed(speed, uuid);
            })
            .catch((e) => {
                console.error(e)
            });


    }

    init() {
        this.dh
            .loadInitialData()
            .then(() => {
                this.controllerServer.connect();
            })
    }
}

module.exports = CentralBroker;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const net = __webpack_require__(61);
const Logger = __webpack_require__(7);
const SECRET = process.env.AUTH_SECRET;
const PORT = process.env.REAL_CONTROLLER_PORT;
const ADDRESS = process.env.REAL_CONTROLLER_IP;

class ControllerConnector {
    constructor(opt){
        this.isConnected = false;
        this.server = opt.server;
        this.client = new net.createConnection();
        this.logger = new Logger();
        this._bindEvents();

    }
    connect(){
        this.logger.onControllerConnectionAttempt(PORT, ADDRESS);
        this.client.connect(PORT, ADDRESS);
    }
    _bindEvents(){
        this.client.on('data', this.onReciveDataFromController.bind(this));
        this.client.on('connect', this.onControllerConnected.bind(this))
        this.client.on('close', this.onControllerDisconnected.bind(this));
        this.client.on('error', this.onControllerConnectionError.bind(this));
    }
    sendDataToController(data){
        this.client.write(JSON.stringify(data));
    }
    onControllerConnected(){
        this.isConnected = true;
        //this.server.sendControllerInitialData();
        this.logger.onControllerConectionEstablish(PORT, ADDRESS);
    }
    onControllerDisconnected(){
        this.logger.onControllerDisconnected();
        setTimeout(this.connect.bind(this, PORT, ADDRESS), 1000);
        //this.server.onControllerOffline();
        return this.client.destroy();
    }
    onControllerConnectionError(e){
        if(this.isConnected){
            this.server.onControllerOffline();
        }
        this.isConnected = false;
        this.logger.onControllerConnectionError()
    }
    onReciveDataFromController(data){
        if (data) {
            try {
                let d = JSON.parse(data.toString());
                for(let key in d){
                    this.server.handleControllerData(d[key], key);
                }
            } catch (e) {
                this.logger.onControllerRecieveDataWithError(e);
            }
        }
        console.log('recieve data from controller'.yellow)
    }

}
module.exports = ControllerConnector;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const ControllerConnector = __webpack_require__(26);

class ControllerServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.controllerConnector = new ControllerConnector({server: this});
    }

    connect() {
        this.controllerConnector.connect();
    }

    sendControllerInitialData() {
        let queues = this.broker.getInitialQueues();
        this.controllerConnector.sendDataToController(queues);
    }

    ////////////////////////////
    //DATA FROM CONTROLLER
    ///////////////////////////

    onControllerOffline() {
        this.broker.setControllerOffline();
    }

    onChangeStatus(data) {
        for(let key in data){
            let id = key,
                stat = data[key];
            this.broker.handleChangedStatus({id: id, stat: stat})
        }
    }

    onChangeValue(data) {
        for(let key in data){
            let id = key,
                def = data[key];
            this.broker.handleChangedValue({id: id, def: def})
        }
    }

    onOriginAlarm(alarm) {
    }

    onControllerCommandExecution(command) {
        console.log(command)
    }

    onChangeSpeed(speed) {
        console.log(speed)
    }

    onChangeMode(mode) {
        console.log(mode)
    }
    onChangeState(data) {
        for(let key in data){
            let id = key,
                state = data[key];
            this.broker.handleChangedState({id: id, state: state})
        }
    }

    ////////////////////////
    //COMMANDS TO CONTROLLER
    ////////////////////////
    _prepareCommand(uuid, method,) {

    }

    changeSpeed(speed, uuid) {
        console.log('Controller Server: sending ivan to change speed command')
        let speedCommand = {
            control: "speed",
            uuid: uuid,
            value: speed

        }
        this.controllerConnector.sendDataToController(speedCommand);
    }

    startController(uuid) {
        console.log('Controller Server: sending ivan start command')
        let startCommand = {
            control: "start",
            uuid: uuid

        }
        this.controllerConnector.sendDataToController(startCommand);
    }

    stopController(uuid) {
        console.log('Controller Server: sending ivan stop command')
        let stopCommand = {
            control: "start",
            uuid: uuid

        }
        this.controllerConnector.sendDataToController(stopCommand);
    }

    confirmAlarm() {
        let startCommand = {
            eventGroup: 'controll',
            method: 'confirm',
            arguments: {
                uuid: uuid,
                alarmId: alarmId
            }
        };
        this.controllerConnector.sendDataToController(startCommand);
    }


    ////////////////////////
    //MAIN HANDLER
    ////////////////////////
    handleControllerData(data, key) {
        switch (key) {
            case 'status':

                this.onChangeStatus(data);
                break;
            case 'values':
                this.onChangeValue(data);
                break;
            case 'controll':
                this.onControllerCommandExecution(data);
                break;
            case 'alarm':
                this.onOriginAlarm(data);
                break;
            case 'mode':
                this.onChangeMode(data);
                break;
            case 'state':
                this.onChangeState(data);
                break;
            default:
                console.log(`Uncorrect event type ${event}, ${data}`.red)
        }
    }
}

module.exports = ControllerServer;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const MemoryDataBase = __webpack_require__(30);
const DatabaseConnector = __webpack_require__(29);

class DataHub {
    constructor(opt) {
        this.broker = opt.broker;
        this.mdb = new MemoryDataBase();
        this.dbc = new DatabaseConnector();
    }

    loadInitialData() {
        let dataToLoad = [this.dbc.getQueuesJSON(), this.dbc.getAlarmsJSON()];
        return Promise
            .all(dataToLoad)
            .then((data) => {
                let queues = data[0];
                let alarms = data[1];

                this.mdb.addQueues(queues);
                this.mdb.addAlarms(alarms);
            })
    }

    getAlarms() {
        return this.mdb.getAlarms();
    }

    getQueues() {
        return this.mdb.getQueues();
    }
    getQueue(uuid) {
        return this.mdb.getQueue(uuid);
    }

    getSpeed(){
        return this.mdb.getSpeed();
    }
    getDevices() {
        return this.mdb.getDevices();
    }

    getAlarmsJSON() {
        return this.mdb.getAlarmsJSON();
    }

    getValuesJSON() {
        return this.mdb.getValuesJSON();
    }

    getStatusesJSON() {
        return this.mdb.getStatusesJSON();
    }
    getControllerStatus(){
        return this.mdb.getControllerStatus();
    }

    addAlarm(alarm) {
        return this.dbc
            .addAlarm(alarm)
            .then((alarm) => {
                this.mdb.addAlarms(alarm.toJSON());
                return alarm;
            })
            .catch((e) => {
            });
    }

    updateStatus(deviceId, status) {
        this.mdb.updateDeviceStatus(deviceId, status);
    }

    updateValue(faceId, def) {
        this.mdb.updateFaceValue(faceId, def);
    }

    removeAlarm(uuid) {
    }
    bulkWriteValue(values){
        return this.dbc.bulkWriteValues(values);
    }

    updateAlarm(ivan_id, user_id, date_confirm ) {
        return this.dbc.updateAlarm(ivan_id, user_id, date_confirm )
            .then(()=>{
                this.mdb.updateAlarm(ivan_id, user_id, date_confirm);
            })
            .catch((e)=>{})
    }

    addQueue(qm) {
        return this.dbc.addQueue(qm)
            .then((queueEntity)=>{
                let queue = queueEntity.dataValues;
                this.mdb.addQueues(queue);
            });
    }
    updateControllerStatus(stat){
        this.mdb.updateControllerStatus(stat);
    }

    removeQueue() {
    }
    writeValue(value) {
        return this.dbc.writeValue(value);
    }
    updateQueue(uuid, values) {
        return this.dbc.updateQueue(uuid, values).then(()=>{
            this.mdb.updateQueue(uuid, values)
        });
    }
    updateSpeed(value){
        return this.mdb.updateSpeed(value);
    }

}


module.exports = DataHub;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

const {Alarm, Queue, User, SystemError, Registering} = __webpack_require__(1);
const Logger = __webpack_require__(7);
const moment = __webpack_require__(4);
const uuidv1 = __webpack_require__(14);

class DatabaseConnector {
    constructor() {
    }

    getInitialData() {
    }

    getQueues() {
        return Alarm.findAll()
    }

    getAlarms() {
        return Queue.findAll();
    }

    getQueuesJSON() {
        return Queue.findAll({raw: true, where: { execute_date: null, user_id: null, status: 'executed' }});
    }

    getAlarmsJSON() {
        return Alarm.findAll({raw: true, where: { date_confirm: null, usr_confirm: 0 }});
    }

    getDevices() {
        return this.devices.toJSON();
    }

    getFaces() {
        return this.faces.toJSON();
    }

    addQueue(queue) {
/*        let uuid = uuidv1,
            q = Object.assign({uuid: uuid()}, queue);*/
        return Queue
            .create(queue)
            .catch((e) => {
            });
    }

    addAlarm(alarm) {
        return Alarm.create(alarm);
    }

    updateQueue(uuid, values) {
        let queueUpdates = {
                execute_date: moment(),
            },
            queueUpdateConditions = {
                where: {
                    uuid: uuid
                },
                returning: true,
                plain: true
            };
        return Queue
            .update(Object.assign(queueUpdates, values), queueUpdateConditions)
            .catch((e) => {
                console.log(`Error while updating queue status`.red)
            });
    }
    updateAlarm(ivan_id, user_id, date_confirm){
        return Alarm.update({ usr_confirm: user_id, date_confirm: date_confirm }, {where: { ivan_id: ivan_id }})
    }

    addDevices() {
    }

    addFaces() {
    }

    removeQueue() {
    }

    bulkWriteValues(values){
        console.log(values)
        return Registering.bulkCreate(values)
    }

    removeAlarm() {
    }
    writeValue(value){
        let valueToCreate = {
            face_id: value.id,
            def: value.def
        };
        return Registering.create(valueToCreate);
    }
}

module.exports = DatabaseConnector;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const ControllerModel = __webpack_require__(40);
const DevicesCollection = __webpack_require__(36);
const FacesCollection = __webpack_require__(37);
const QueueCollection = __webpack_require__(38);
const AlarmsCollection = __webpack_require__(35);
const _ = __webpack_require__(6);
const config = __webpack_require__(11);
function prepareFaces(devs){
    let faces = [];
    devs.each((d)=>{
        faces = faces.concat(_.toArray(d.get('dfaces')))
    });
    return faces;
}
class MemoryDataBase {
    constructor(){
        this.speed = 0;
        this.controller = new ControllerModel(config.ctrl);
        this.devices = new DevicesCollection(config.ctrl.devs);
        this.faces = new FacesCollection(prepareFaces(this.devices));
        this.queues = new QueueCollection();
        this.alarms = new AlarmsCollection();
    }
    getQueues(){
        return this.queues.toJSON();
    }
    getAlarms(){
        return this.alarms.toJSON();
    }
    getDevices(){
        return this.devices;
    }
    getSpeed(){
        return this.speed;
    }
    getQueue(uuid){
        return this.queues.findWhere({uuid: uuid});
    }
    getDevicesJSON(){
        return this.devices;
    }
    getControllerStatus(){
        return this.controller.get('stat');
    }
    getStatusesJSON(){
        return this.devices.map((device) => { return  {id: device.get('id'), stat: device.get('stat')}});
    }
    getValuesJSON(){
        return this.faces.map((face) => { return  { id: face.get('id'), def: face.get('def') }});
    }
    getAlarmsJSON(){
        return this.alarms.toJSON();
    }
    getFaces(){
        return this.faces.toJSON();
    }
    updateDeviceStatus(id, status){
        console.log(`Memory database: changing status, ID: ${id}, status: ${status}`)
        this.devices.findWhere({id: +id}).set({stat: +status});
    }
    updateFaceValue(id, value){
        console.log(`Memory database: changing face, ID: ${id}, faceId: ${value}`)
        this.faces.findWhere({id: +id}).set('def', +value);
    }
    updateQueue(uuid, status){
        let executedQueue = this.queues.findWhere({uuid: uuid});
        if (executedQueue) {
            executedQueue.set('status', status);
        }
    }
    updateSpeed(value){
        return this.speed = value;
    }
    updateAlarm(ivan_id, user_id, date_confirm){
        this.alarms.findWhere({ivan_id: ivan_id}).set({usr_confirm: user_id, date_confirm: date_confirm})
    }
    addQueues(queues){
        this.queues.add(queues);
    }
    addAlarms(alarms){
        this.alarms.add(alarms);
    }
    updateControllerStatus(stat){
        this.controller.set('stat', stat)
    }
    addDevices(){}
    addFaces(){}
    removeQueue(){}
    removeAlarm(){}

}

module.exports = MemoryDataBase;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const server = __webpack_require__(58).Server();

const io = __webpack_require__(65)(server);
const socketioJwt = __webpack_require__(67);
const PORT = process.env.CONTROLLER_PORT,
    SECRET = process.env.AUTH_SECRET,
    CONTROLLER_ID = process.env.AUTH_SECRET;

server.listen(PORT, (err, data) => {
    if (err) console.log(err);
    console.log(`CONTROLLER server started on port ${PORT}`)
});


class SocketConnector {
    constructor(opt){
        this.server = opt.server;
        io.on('connection', this.onClientConnect.bind(this));
    }
    sendData(data){
        io.emit('controller', data);
    }
    onClientConnect(socket){
        this._bindUserEvents.call(this, socket);
        this.server.sendInitialData(socket);
    }
    _bindUserEvents(socket){
        socket.on('disconnecting', this.onClientDisconnect.bind(this));
        socket.on('connect_failed', this.onConnectFail.bind(this));
        socket.on('controller', this.onUserData.bind(this, socket));
    }
    onClientDisconnect(){
        console.log('Client disconnected'.blue)
    }
    onConnectFail(){
        console.log('Connection Failed'.grey);
    }
    onUserData(socket, data){
        if(data.token){
            this.server.handleUserData(data, socket);
        }
    }
    requireAuth(socket){
        socket.emit('auth')
    }
}
module.exports = SocketConnector;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

const SocketConnector = __webpack_require__(31);
const jwt = __webpack_require__(8);
const SECRET = process.env.AUTH_SECRET;
const _ = __webpack_require__(6);

class SocketServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.socketConnector = new SocketConnector({server: this});
        this.listeners = [];
    }

    sendAlarmOrigin(alarm) {
        let message = {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign(alarm, {date_confirm: null})
        };
        this.socketConnector.sendData(message)
    }

    sendAlarmConfirmation(ivan_id) {
        let message = {
            eventGroup: 'alarm',
            method: 'confirm',
            arguments: Object.assign({ivan_id: ivan_id}, {})
        };
        this.socketConnector.sendData(message)
    }

    sendStatus(devId, stat) {
        let status = {id: devId, stat: stat},
            message = {
                eventGroup: 'status',
                data: [Object.assign({}, status)]
            };
        this.socketConnector.sendData(message)
    }

    sendValue(faceId, def) {
        let message = {
            eventGroup: 'value',
            data: [{id: faceId, def: def}]
        };
        this.socketConnector.sendData(message)
    }

    sendSpeed(speed) {
        let message = {
            eventGroup: 'speed',
            data: {speed: speed}
        };
        this.socketConnector.sendData(message);
    }
    sendState(devId, state) {
        let st = {id: devId, state: state},
            message = {
                eventGroup: 'state',
                data: [Object.assign({}, st)]
            };
        this.socketConnector.sendData(message);
    }
    sendAuthRequired(){}

    sendInitialData(socket) {
        let alarms = this.broker.getUserInitialAlarms(),
            statuses = this.broker.getUserInitialStatuses(),
            values = this.broker.getUserInitialValues(),
            speed = this.broker.getInitialSpeed(),
            statusPack = {
                eventGroup: 'status',
                data: statuses
            },
            valuesPack = {
                eventGroup: 'value',
                data: values
            },
            speedPack = {
                eventGroup: 'speed',
                data: {speed: speed}
            },
            alarmsPack = {
                eventGroup: 'alarm',
                method: 'add'
            };
        setTimeout(() => {
            socket.emit('controller', statusPack);
            socket.emit('controller', valuesPack);
            socket.emit('controller', speedPack);
            alarms.forEach((alarm) => {
                socket.emit('controller', Object.assign(alarmsPack, {arguments: alarm}))
            });
        }, 750);
    }

    handleUserData(data, socket) {
        let pack, userId,
            {method, token} = data,
            args = data.arguments,
            verified = jwt.verify(token, SECRET);
        if(verified){
            console.log('Everything is all right with token')
            userId = verified.id;
            switch (method) {
                case 'confirm':
                    console.log('Socket server: calling alarm confirmation method');
                    pack = {
                        ivan_id: args.ivan_id,
                        user_id: userId
                    };
                    this.broker.confirmAlarm(pack);
                    break;
                case 'repair':
                    console.log('Socket server: calling repair method');

                    this.broker.setRepair(data)
                    break;
                case 'speed':
                    console.log('Socket server: calling speed change method');

                    pack = {
                        speed: args.speed,
                        user_id: userId,

                    };
                    this.broker.changeSpeed(pack)
                    break;
                case 'start':
                    console.log('Socket server: calling start method');

                    pack = {
                        user_id: userId
                    };
                    this.broker.startController(pack);
                    break;
                case 'stop':
                    console.log('Socket server: calling stop method');
                    pack = {
                        user_id: userId,
                    };
                    this.broker.stopController(pack)
                    break;
                default:
                    console.log(`Unknown controll command method type: ${method}`.red);
                    return;
            }

        } else {
            console.error('Something wrong with Token')
            this.socketConnector.requireAuth(socket);
        }
    }

    validateData() {
    }
}

module.exports = SocketServer;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const ZeoConnector = __webpack_require__(34);
const {
    CONTROLLER_ID,
} = process.env;

class ZeoClient {
    constructor(opt) {
        this.broker = opt.broker;
        this.zeoConnector = new ZeoConnector({server: this});
        this.zeoConnector.connect();
    }

    sendInitialData() {
        let speed = this.broker.getInitialSpeed(),
            alarms = this.broker.getUserInitialAlarms(),
            statuses = this.broker.getUserInitialStatuses();
        statuses.forEach(status => {
            this.sendStatus(status);
        });
        alarms.forEach((alarm) => {
            this.sendAlarmOrigin(alarm);
        });
        this.sendSpeed(speed);
        this.sendMode();
    }

    sendStatus(devId, stat) {
        let status = {deviceId: devId, stat: stat},
            controllerStatus = this.broker.getControllerStatus,
            apiStatus = {
                eventGroup: 'status',
                data: [status],
                controller: {
                    controllerId: +CONTROLLER_ID,
                    stat
                }
            };
        this.zeoConnector.sendData(apiStatus)
    }
    sendState(devId, state) {
        let st = {deviceId: devId, stat: state},
            controllerStatus = this.broker.getControllerStatus,
            apiStatus = {
                eventGroup: 'state',
                data: [st],
                controller: {
                    controllerId: +CONTROLLER_ID,
                    state
                }
            };
        this.zeoConnector.sendData(apiStatus)
    }
    sendValue(faceId, def){

    }

    sendSpeed(speed) {
        let apiSpeed = {};
        this.zeoConnector.sendData(apiSpeed);
    }

    sendMode(pack) {
        let apiMode = {};
        this.zeoConnector.sendData(apiMode);
    }

    sendAlarmOrigin(pack) {
        let apiAlarmOrigin = {};
        this.zeoConnector.sendData(apiAlarmOrigin);

    }

    sendAlarmConfirmation(pack) {
        let apiAlarmConfirmation = {};
        this.zeoConnector.sendData(apiAlarmConfirmation);
    }

    onOperatorCommand() {
    }
    handleOperatorCommand(command){
        console.log('ZeoClient: handling operator command', command)
        //switch(){}
    }
}

module.exports = ZeoClient;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

const io = __webpack_require__(66);
const jwt = __webpack_require__(8);
const {
    ZEO_SERVER,
    ZEO_SERVER_PORT,
    AUTH_SECRET,
    CONTROLLER_ID
} = process.env;
const CONTROLLER_MAC = '40:d6:3c:03:09:be';
const token = jwt.sign({id: CONTROLLER_ID, mac: CONTROLLER_MAC}, AUTH_SECRET);

class ZeoConnector {
    constructor(opt){
        this.server = opt.server;
    }
    connect(){
        this.socket = io(`${ZEO_SERVER}:${ZEO_SERVER_PORT}`, {'query': 'auth_token=' + token});
        this._bindEvents();
    }
    _bindEvents() {
        this.socket.on('connect', this.onConnected.bind(this));
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('controller', this.onZeoEvent.bind(this));
        this.socket.on('connect_failed', this.onConnectFail.bind(this));
    }
    onConnected() {
        this.server.sendInitialData();
    }

    onDisconnect() {
        console.log('disconnected from vasiliy'.grey)
    }

    onConnectFail() {
        console.log('Connection Failed'.grey);
    }
    onZeoControllEvent(cmnd){
        console.log(cmnd)
    }

    onZeoEvent(cmnd) {
        this.server.handleOperatorCommand(c);
        let eventGroup = cmnd.eventGroup;
        switch (eventGroup) {
            case 'controll':
                this.onZeoControllEvent(cmnd);
                break;
            default:
                return;
        }
    }
    onZeoData(){}
    onConnectionError(){}
    sendData(data){
        this.socket.emit('controller', data);
    }
}

module.exports = ZeoConnector;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const Backbone = __webpack_require__(5);
const Radio = __webpack_require__(3);

const ch = Radio.channel('controllerChannel');

const Alarm = Backbone.Model.extend({
    defaults: {
        date_confirm: null
    },
    initialize: function () {

        this.on('change:usr_confirm', () => {
            if (this.get('usr_confirm') !== 0) {
                this.collection.remove(this);
            }
        })
    }
});

const AlarmsCollection = Backbone.Collection.extend({
    model: Alarm
});

module.exports = AlarmsCollection;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

const Backbone = __webpack_require__(5);
const Radio = __webpack_require__(3);

const ch = Radio.channel('controllerChannel');

const Device = Backbone.Model.extend({
/*    initialize: function () {
        function onChangeStatus(){
            ch.trigger('status', {id: this.get('id'),mode: this.get('mode'), stat: this.get('stat')});
            //console.log(`Status changed: ${this.get('name')}, ${this.get('stat')}`)
        }
        function onChangeMode(){
            ch.trigger('mode', {id: this.get('id'), mode: this.get('mode'), stat: this.get('stat')});
            //console.log(`Mode changed: ${this.get('name')}, ${this.get('mode')}`)
        }
        this.on('change:stat', onChangeStatus.bind(this));
        this.on('change:mode', onChangeMode.bind(this));
    }*/
});

const DevicesCollection = Backbone.Collection.extend({
    model: Device
});

module.exports = DevicesCollection;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

const Backbone = __webpack_require__(5);
const Radio = __webpack_require__(3);

const ch = Radio.channel('controllerChannel');

const Face = Backbone.Model.extend({
/*    initialize: function () {
        function onChangeValue(){
            ch.trigger('value', {id: this.get('id'), def: this.get('def')});
            //console.log(`Value changed: ${this.get('name')}, ${this.get('def')}`)
        }
        this.on('change:def', onChangeValue.bind(this));
    }*/
});

const FacesCollection = Backbone.Collection.extend({
    model: Face
});

module.exports = FacesCollection;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

const Backbone = __webpack_require__(5);
const Radio = __webpack_require__(3);

const ch = Radio.channel('controllerChannel');

const Queue = Backbone.Model.extend({
    defaults: {
        status: 'pending',
    },
    initialize: function () {
        this.on('change:status', ()=>{
            if(this.get('status') === 'executed'){
                this.collection.remove(this);
            } else {

            }
        });
    }
});

const QueueCollection = Backbone.Collection.extend({
    url: '/que',
    model: Queue
});

module.exports = QueueCollection;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

const CentralBroker = __webpack_require__(25);


const centralBroker = new CentralBroker();
centralBroker.init();

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

const Backbone = __webpack_require__(5);
const Radio = __webpack_require__(3);
const ch = Radio.channel('controllerChannel');

module.exports = Backbone.Model.extend({
    onChangeStatus: function(){
        let stat = this.get('stat');
        this.get('devices').each('')
    },
    initialize: function(){
        this.on('change:stat', this.onChangeStatus.bind(this))
    }
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

let _ = __webpack_require__(9);
let sqlite3 = __webpack_require__(68).verbose();

module.exports = {
    db: null,
    last: 0,
    texts: [],
    info: {},
    init: function(dbfile='', days=1, callback) {
        if(dbfile.length > 0 || days <= 0) {
            this.db = new sqlite3.Database(dbfile);
            this.dbdo(`SELECT * FROM smart_informer WHERE active = 1`, (err, texts) => {
                this.texts = texts;
                this.recalculate(days, (info) => {
                    callback(info);
                });
            });
        } else {
            let errmsg = 'File name is empty or days == 0';
            console.error(errmsg);
            callback(errmsg, {});
        }
    },
    recalculate: function(days=0, callback) {
        let rnd = this.randomize();
        this.dbdo(`SELECT * from smart_alrs WHERE strftime('%Y-%m-%d', date) > date('now', '-${days} days') ORDER BY date ASC`, (err, alrs) => {
            this.info = {
                text: (_.has(this.texts, rnd)) ? this.texts[rnd].text : '',
                crashes: 0,
                hours: {
                    idle: 0,
                    work: 0,
                    eidle: 0
                },
                nodes: []
            };
            if(alrs.length > 0) {
                let cur = null;
                let crash_delay = 0;
                if (alrs.length > 0) {
                    _.each(alrs, (alr) => {

                        // Count crashes
                        if (alr.stat === 2) {
                            this.info.crashes += 1;
                            if (!crash_delay) {
                                crash_delay = alr.date;
                            }
                        }
                        if (!cur) {
                            cur = Object.assign({}, alr);
                        } else {
                            // New status?
                            if (cur.stat !== alr.stat) {
                                // Count hours
                                this.info.hours[(cur.stat === 1) ? 'work' : 'idle'] += this.count_hours(alr.date, cur.date);

                                // Count error delay status
                                if (alr.stat === 0 || alr.stat === 1) {
                                    if (crash_delay) {
                                        this.info.hours.eidle = this.count_hours(alr.date, crash_delay);
                                        crash_delay = null;
                                    }
                                }

                                this.info.nodes.push({start: cur.date, end: alr.date, stat: cur.stat, dev: cur.dev, code: cur.code});
                                cur = null;
                            }
                        }
                    });
                }
            }
            callback(this.info);
        });
    },
    get_info: function() {
        return this.info;
    },
    count_hours: function(d1, d2) {
        let c = Math.abs(new Date(d1) - new Date(d2));
        return parseInt((c/(1000*60*60))%24);
    },
    randomize: function() {
        let r = Math.floor(Math.random() * 10);
        return this.last = ((r === this.last) ? this.randomize() : r);
    },
    dbdo: function(req=null, callback) {
        if(this.db && !_.isNull(req) && req.length > 0) {
            this.db.all(req, function (err, rows) {
                callback(err, rows);
            });
        }
    }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const db = __webpack_require__(1);
const { Informer } = db;


router.get('/', function(req, res, next) {
    Informer.findAll().then((informs)=>{
        res.json(informs);
    }).catch((err)=>{
        res.json({
            errors: err
        })
    })
});


module.exports = router;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
const db = __webpack_require__(1);
const bot = __webpack_require__(41);

/* GET home page. */
router
	//====================================
	//  	GET ALL
	//====================================
	.get('/', function(req, res, next) {
		bot.init('smart.db', 1, (info) => {
			res.send(info);
		});
	});

module.exports = router;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const path = __webpack_require__(2);
const locale = __webpack_require__(59);
const supported = new locale.Locales(["en", "ru", "ua"]);
router
    .get('/', function (req, res, next) {

        res.sendFile(path.resolve('./config.json'));
    })
    .get('/locale', (req, res, next) => {
        let lang;
        if (req.session.lang) {
            lang = req.session.lang;
        } else {
            const locales = new locale.Locales(req.headers["accept-language"]);
            const best = locales.best(supported);
            lang = best.language;
        }

        res.sendFile(path.resolve(`./locales/lang_${lang}.json`))
    })
    .get('/locale/:lang', (req, res, next) => {
        const lang = req.params.lang;
        req.session.lang = lang;
        res.sendFile(path.resolve(`./locales/lang_${lang}.json`))
    })


module.exports = router;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const db = __webpack_require__(1);
const {Controller} = db;

router.get('/', function (req, res, next) {
    Controller
        .findById(context.controller)
        .then((ctrl) => {
            res.json(ctrl);
        })
        .catch((err)=>{res.status(500).send(err)})
});

module.exports = router;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const moment = __webpack_require__(4);
const context = __webpack_require__(12);
const db = __webpack_require__(1);
const env = process.env.NODE_ENV;
const {
    Alarm,
    Device,
    DeviceCamera,
    ViewGroup,
    ControllerFace,
    ValueMeasurment,
    Language,
    DeviceGroup,
    PassportData,
    PickingList,
    PickingListOpt,
    DeviceService,
    DeviceServiceWork,
    Work,
    WorkMaterial,
    Material,
    Type
} = db;

/* GET home page. */
router
//====================================
//      GET ALL
//====================================
    .get('/', function (req, res, next) {
        Device.findAll({
            where: {ctrl: context[env].controller, active: 1},
            include: [
                /*                {
                 model: DeviceCamera,
                 as: 'cameras'
                 },*/
                {
                    model: ControllerFace,
                    as: 'faces',
                    include: [{
                        model: ValueMeasurment,
                        as: 'measure',
                        include: [{
                            model: Language,
                            as: 'translate'
                        }]
                    }]

                },
                {
                    model: DeviceGroup,
                    as: 'devicegroup',
                },
                {
                    model: PassportData,
                    as: 'passportdata',
                },
                {
                    model: PickingList,
                    as: 'pickinglist',
                    include: [{
                        model: PickingListOpt,
                        as: 'opts'
                    }]
                },
                {
                    model: DeviceService,
                    as: 'service',
                    order: [['ser_num', 'ASC']],
                    include: [
                        {
                            model: DeviceServiceWork,
                            as: 'service_work',
                            include: [
                                {
                                    model: Work,
                                    as: 'works',
                                    include: [{
                                        model: WorkMaterial,
                                        as: 'materials',
                                        include: [{
                                            model: Material,
                                            as: 'mat'
                                        }]
                                    }]
                                },
                                {
                                    model: Type,
                                    as: 'devicetype',
                                    include: [{
                                        model: Language,
                                        as: 'translate'
                                    }]
                                },
                                {
                                    model: Device,
                                    as: 'device'
                                }
                            ]
                        }
                    ]
                }]
        }).then((devices) => {
            res.send(devices);
        }).catch(err => {
            res.send({errors: err})
        })
    })
    .get('/:id/services', function (req, res, next) {
        DeviceService.findAll({where: {dev: req.params.id}}).then((services) => {
            res.send(services);
        });
    })
    .get('/viewgroups', function (req, res, next) {
        ViewGroup.findAll({where: {}, include: [{model: Language, as: 'translate'}]}).then((views) => {
            res.json(views);
        })
    })
    .get('/groups', function (req, res, next) {
        DeviceGroup.findAll({
            where: {},
            include: [{model: Device, as: 'devices', where: {ctrl: context.controller}}]
        }).then((groups) => {
            res.json(groups);
        })
    })
    .get('/services/:id/works', function (req, res, next) {
        DeviceWork.findAll({
            where: {service_id: req.params.id},
            include: [{model: Work, as: 'description'}]
        }).then((works) => {
            res.send(works);
        })
    })
    //====================================
    //      GET BY ID
    //====================================
    .get('/:id', function (req, res, next) {
        res.send('i am getting stuff with id:' + req.params.id);
    })
    //====================================
    //      SEND BY ID
    //====================================
    .post('/:id', function (req, res, next) {
        res.send('i am posting all tests stuff');

    })
    //====================================
    //      INSERT/UPDATE BY ID
    //====================================
    .put('/:id', function (req, res, next) {
        Device.update(req.body, {where: {id: req.params.id}}).then(() => {
            Device.findById(req.params.id).then((deviceService) => {
                res.send(deviceService);
            })
        });
    })


    //====================================
    //      MAKING SERVICE
    //====================================
    .put('/:deviceID/services/:serviceID', function (req, res, next) {
        DeviceService
            .update(req.body, {where: {id: req.params.serviceID}})
            .then((deviceService) => {
                DeviceWork.findAll({
                    where: {service_id: req.params.serviceID},
                    include: [{model: Work, as: 'description'}]
                }).then((deviceServiceWorks) => {
                    let promises = [];
                    let doneWorks = '';
                    deviceServiceWorks.forEach((deviceServiceWork) => {
                        if (deviceServiceWork.get('done') === 1) {
                            doneWorks += deviceServiceWork.get('description').desc + ', '
                        } else {
                            doneWorks += '';
                        }

                        //promises.push( DeviceServiceWork.update );
                    });
                    doneWorks += ';'

                    DeviceWork.update({done: 0}, {where: {service_id: req.params.serviceID}}).then(() => {
                        History
                            .create({
                                dev: req.params.deviceID,
                                txt: 'Проведено ТО' + req.body.ser_num + '; Выполнил: администратор;' + 'Выполненые работы: ' + doneWorks + ' Дата проведения: ' + new Date(),
                                usr: 1
                            })
                            .then(() => {
                                DeviceService.findById(req.params.serviceID).then((devServ) => {
                                    res.json(devServ);
                                });
                            });
                    });
                });

            });

    })
    //====================================
    //      MAKING UNSHEDULED SERVICE
    //====================================  
    .put('/:deviceID/unsheduled', function (req, res, next) {
        History
            .create({
                dev: req.params.deviceID,
                txt: 'Выполнен внеплановый ремонт:' + req.body.txt + '; Выполнил: администратор; Дата проведения: ' + new Date(),
                usr: 1
            })
            .then(() => {
                DeviceService.findById(req.params.serviceID).then((devServ) => {
                    res.json(devServ);
                });
            });

    })
    .put('/services/:serviceID/works/:workID', function (req, res, next) {

        DeviceWork
            .update(req.body, {where: {id: req.params.workID}})
            .then((deviceServiceWork) => {
                History
                    .create({
                        dev: req.body.dev,
                        txt: 'Выполнена работа:' + req.body.ser_num + '; Выполнил: администратор; Дата проведения: ' + new Date(),
                        usr: 1
                    })
                    .then(() => {
                        DeviceWork
                            .findById(req.params.workID)
                            .then((devServWork) => {
                                res.json(devServWork);
                            });
                    });

            });

    })
    //====================================
    //      DELETE BY ID
    //====================================
    .delete('/:id', function (req, res, next) {
        res.send('i am deleting all tests stuff');
    });

module.exports = router;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var express = __webpack_require__(0);
var router = express.Router();
const db = __webpack_require__(1);
const {ErrorCode} = db;


router.get('/', function(req, res, next) {
  ErrorCode.findAll().then((errors)=>{
    res.json(errors);
  })
});

module.exports = router;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(0);
const router = express.Router();
const moment = __webpack_require__(4);
const _ = __webpack_require__(6);
const db = __webpack_require__(1);
const {Op} = db.Sequelize;
const {Alarm, User, ErrorCode} = db;


router
    .get('/', function (req, res, next) {
        let where = {};
        let whereType = {};
        let whereDate = {};
        let order = ['id', 'ASC'];
        let items = 20;
        let page = 1;
        let offset = 0;
        if (!_.isEmpty(req.query)) {

            req.query.type !== 'all' ? whereType.typ = +req.query.type : delete whereType.typ;
            req.query.code !== 'all' ? where.code = +req.query.code : delete where.code;

            whereDate = {
                [Op.and]: [{
                    date: {
                        [Op.gte]: req.query.dateFrom
                    }
                },
                    {
                        date: {
                            [Op.lte]: req.query.dateTo + ' 23:59:59Z'
                        }
                    }
                ]
            }

        }
        if (req.query.page) {
            offset = items * (req.query.page - 1);
        }
        where.ctrl = context.controller;
        Alarm.findAll({
            limit: items,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            where: Object.assign(where, whereDate),
            include: [{
                model: User,
                as: 'user',
                attributes: ['name']
            }, /*{
                model: ErrorCode,
                as: 'ecode',
                where: whereType
            }*/]
        }).then((alarms) => {
            res.json(alarms);
        })
    })

    .get('/events', function (req, res, next) {

        Journal
            .findAll({
                where: {
                    [Op.and]: [{
                        expiration_date: {
                            [Op.gte]: req.query.start
                        }
                    },
                        {
                            expiration_date: {
                                [Op.lte]: req.query.end
                            }
                        }
                    ]
                },
                attributes: [
                    'id', ['expiration_date', 'start'],
                    'status',
                    'transfer', ['service_id', 'resourceId'],
                ],
                include: [{
                    model: DeviceService,
                    as: 'service',
                    include: [{
                        model: Device,
                        as: 'device'
                    }]
                }]
            })
            .then((events) => {
                Promise.all(events.map((e, i) => {

                    let service = e.get('service');
                    if (service !== null) {
                        let device = service.get('device');
                        let start = moment(e.get('start')).add(e.get('transfer'), 'days').format('YYYY-MM-DD');
                        let backgroundColor = 'blue';
                        let borderColor = 'blue';
                        if (moment(start).isBefore(moment())) {
                            backgroundColor = '#B33A3A';
                            borderColor = 'rgb(197, 103, 103)';


                        } else if (moment(start).diff(moment(), 'days') >= 0 && moment(start).diff(moment(), 'days') <= 1) {
                            backgroundColor = '#FFCC00';
                            borderColor = '#FFCC00';
                        }
                        return {
                            id: e.get('id'),
                            start: start,
                            status: e.get('status'),
                            transfer: e.get('transfer'),
                            resourceId: device.get('id'),
                            title: 'ТО' + service.get('ser_num') + " - " + device.get('name'),
                            backgroundColor: backgroundColor,
                            borderColor: borderColor

                        };
                    } else {
                        return {}
                    }

                })).then((data) => {
                    res.json(data);
                })
            });
    })
    .get('/resources', function (req, res, next) {

        Journal
            .findAll({
                where: {
                    [Op.and]: [{
                        expiration_date: {
                            [Op.gte]: req.query.start
                        }
                    },
                        {
                            expiration_date: {
                                [Op.lte]: req.query.end
                            }
                        }
                    ]
                },
                attributes: ['id', 'service_id'],
                include: [{
                    model: DeviceService,

                    as: 'service',
                    include: [{
                        distinct: 'service_id',
                        model: Device,
                        as: 'device',
                    },
                        {
                            model: DeviceServiceWork,
                            as: 'service_work',
                            include: [{
                                model: Work,
                                as: 'works',
                                foreignKey: 'work_id',
                                attributes: ['desc']
                            }]
                        }
                    ]

                }]
            })
            .then((events) => {

                Promise.all(events.map((e, i) => {

                    let service = e.get('service');
                    if (service !== null) {
                        let device = service.get('device');
                        return {
                            id: device.get('id'),
                            title: device.get('name'),
                            serviceId: service.get('service_id'),
                            children: []
                        };
                    } else {
                        return {}
                    }


                })).then((data) => {

                    res.json(data);
                })

            });
    })
    .get('/update/calendar', function (req, res, next) {
        DeviceService
            .findAll({
                include: [{model: Device, as: 'device'},
                    {
                        as: 'service',
                        model: Service,
                        where: {
                            ser_type: 'calendar'
                        }
                    }
                ]
            })
            .then((deviceServices) => {
                let promises = [];
                deviceServices.forEach((deviceService) => {
                    let startDate = deviceService.get('device').get('start_date');

                    let duration = moment.duration(deviceService.get('service').get('_set'), 'month');
                    let expDate = moment(startDate).add(duration).format();
                    promises.push(
                        Journal.findOrCreate({
                            where: {
                                service_id: deviceService.get('id'),
                                status: 'pending'
                            },
                            defaults: {
                                service_id: deviceService.get('id'),
                                status: 'pending',
                                expiration_date: expDate
                            }
                        })
                    );
                });
                Promise.all(promises).then(() => {
                    console.log('this shit finished');
                    res.json(deviceServices);
                });

            });
    })
    .get('/update/hourly', function (req, res, next) {
        DeviceService
            .findAll({
                include: [{
                    model: Device,
                    as: 'device'
                },

                    {
                        as: 'service',
                        model: Service,
                        where: {
                            ser_type: 'hourly'
                        }
                    }
                ]
            })
            .then((deviceServices) => {
                Promise
                    .all(deviceServices.map((deviceService, i) => {
                        let device = deviceService.get('device');
                        let moto = device.get('moto');
                        let service = deviceService.get('service');
                        let startDate = moment(device.get('start_date'));
                        let duration = moment.duration(deviceService.get('_lim') + deviceService.get('_pre') - moto, 'hours');
                        let expDate = moment(startDate).add(duration).format();
                        return Journal.findOne({
                            where: {
                                service_id: deviceService.get('id'),
                                status: 'pending'
                            }
                        }).then((journal) => {
                            if (journal) { // update
                                return journal.update({
                                    service_id: deviceService.get('id'),
                                    status: 'pending',
                                    expiration_date: expDate
                                });
                            } else { // insert
                                return Journal.create({
                                    service_id: deviceService.get('id'),
                                    status: 'pending',
                                    expiration_date: expDate
                                });
                            }
                        })
                    }))
                    .then((data) => {
                        res.json(data);
                    });
            });
    })
    .get('/danger', function (req, res, next) {
        Alarm
            .findAll({
                where: {
                    usr_confirm: 0,
                    ctrl: context.controller,
                },
                order: [
                    ['id', 'DESC']
                ],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name']
                }, {
                    model: ErrorCode,
                    as: 'ecode',
                    //required: false,
                    where: {
                        typ: 2
                    }
                }]
            })
            .then((alarms) => {
                res.json(alarms);
            })
            .catch(err => {
                console.log(err)
                res.json({
                    errors: {
                        code: err
                    }
                })
            })
    })
    //====================================
    //  	GET BY ID
    //====================================
    .get('/:id', function (req, res, next) {
        res.send('i am getting stuff with id:' + req.params.id);
    })
    .get('/newupdate', function (req, res, next) {
        console.log('this route works fine')
        Type.findAll({
            include: [{
                model: Service,
                as: 'service'
            }]
        })
    })

module.exports = router;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const db = __webpack_require__(1);
const jwt = __webpack_require__(8);
const md5 = __webpack_require__(60);
const { User, UserGroup } = db;

router
    .post('/', function (req, res, next) {

        User
            .findOne({
                where: {id: req.body.name},
                include: [
                    {
                        model: UserGroup,
                        as: 'group'
                    }
                ]
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send('No user found.');
                }
                let passwordIsValid = md5(req.body.password) === user.get('pass');
                if (!passwordIsValid) {
                    return res.status(401).send({auth: false, token: null});
                }

                let token = jwt.sign(
                    {
                        id: user.get('id')
                    },
                    process.env.AUTH_SECRET,
                    {
                        expiresIn: 86400 // expires in 24 hours
                    }
                );
                let usr = {
                    id: user.get('id'),
                    name: user.get('name'),
                    group: user.get('group'),
                }
                res.status(200).send({auth: true, token: token, user: usr});
            })
            .catch((err) => {
                return res.status(500).send(`Error on the server. <br> ${err}`);
            });
    })
    .get('/users', (req, res, next) => {
        User.findAll({attributes: ['id', 'name']})
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    })
module.exports = router;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(0);
const router = express.Router();
const db = __webpack_require__(1);
const {
    ValueStatuses,
    Language
} = db;

router.get('/', function (req, res, next) {
    ValueStatuses
        .findAll({
            include: [
                {
                    models: Language,
                    as: 'translate'
                }
            ]
        })
        .then(statuses => {
            res.json({
                data: {
                    statuses: statuses
                }
            });
        })
        .catch((err) => {
            console.log(err)
            res.json({
                errors: {
                    code: err
                }
            })
        })
});

module.exports = router;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const path = __webpack_require__(2);
const db = __webpack_require__(1)


/* GET home page. */
router
    .get('/events', function(req, res, next) {
        res.end();
    })
    .get('/sources', function(req, res, next) {
        res.end();
    })
    .get('/update', function(req, res, next) {
        Device.findAll({
            include: [{
                model: Type,
                as: 'type',
                include: [{
                    model: Service,
                    as: 'services',
                    include: [{
                            model: Work,
                            as: 'works',
                        },
                    ]
                }]
            }]
        }).then((devices) => {
            res.json(devices);
        })
    })
    .get('/updateservice', function(req, res, next) {
        Device.findAll({
            include: [{
                model: Type,
                as: 'type',
                include: [{
                    model: Service,
                    as: 'services',
                    include: [{
                        model: Work,
                        as: 'works',
                    }, ]
                }]
            }]
        }).then((devices) => {

            Promise.all(devices.map((device, index) => {
                let type = device.get('type').get('id');
                return Service.bulkCreate([{
                        ser_num: 1,
                        typ: type,
                        name: 'TO1',
                        device_type: type
                    },
                    {
                        ser_num: 2,
                        typ: type,
                        name: 'TO2',
                        device_type: type
                    },
                    {
                        ser_num: 3,
                        typ: type,
                        name: 'TO3',
                        device_type: type
                    },
                    {
                        ser_num: 4,
                        typ: type,
                        name: 'TO4',
                        device_type: type
                    },
                    {
                        ser_num: 5,
                        typ: type,
                        name: 'TO5',
                        device_type: type
                    }
                ]);
            })).then((services) => {

                Promise.all(services.map((service) => {
                    return Promise.all(service.map((ser) => {
                        let service = ser.get('id');
                        let service_number = ser.get('ser_num');
                        return Promise.all([
                            Work.bulkCreate([{
                                    service_id: service,
                                    ser_num: service_number,
                                    desc: 'work which I should do 1',
                                    active: 1,
                                },
                                {
                                    service_id: service,
                                    ser_num: service_number,
                                    desc: 'work which I should do 2',
                                    active: 1,
                                },
                                {
                                    service_id: service,
                                    ser_num: service_number,
                                    desc: 'work which I should do 3',
                                    active: 1,
                                },
                            ]),
                        ])
                    }));
                })).then((works) => {
                    res.json(works)
                })

            })

        })

    })
    .get('/updatedeviceservice', function(req, res, next) {
        Device.findAll({
            include: [{
                model: Type,
                as: 'type',
                include: [{
                    model: Service,
                    as: 'services',
                    include: [{
                        model: Work,
                        as: 'works',
                    }, ]
                }]
            }]
        }).then((devices) => {
            Promise.all(devices.map((device, index) => {
                let type = device.get('type');
                let services = type.get('services');


                if (services.length > 0) {
                    return Promise.all(services.map((service) => {
                        return DeviceService
                            .create({
                                ctrl: device.get('ctrl'),
                                dev: device.get('id'),
                                ser_num: service.get('ser_num'),
                                service_id: service.get('id'),
                                _lim: 0,
                                _pre: 666,

                            })
                            .then((serv) => {
                                return Promise.all(service.works.map((work) => {
                                    return {
                                        ctrl: device.get('ctrl'),
                                        dev: device.get('id'),
                                        ser_num: serv.get('ser_num'),
                                        work: work.get('id'),
                                        service_id: serv.get('id')
                                    }
                                })).then((works) => {
                                    return DeviceWork
                                        .bulkCreate(works)
                                        .then((deviceworks) => {
                                            return deviceworks
                                        })
                                })
                            })
                        //
                    }))

                } else {
                    res.send('no services')
                }

            })).then((services) => {
                res.json(services)
            })

        })

    })
module.exports = router;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const db = __webpack_require__(1);

router.get('/seed_alarms', function (req, res) {
    let alarms = [];
    for (let i = 0; i < 50; i++) {
        alarms.push({
            ctrl: 2,
            dev: faker.random.number(),
            typ: faker.random.number(),
            par: faker.random.number(),
            num: faker.random.number(),
            dat: moment(faker.date.past()).format(),
        });
    }
    Alarms.bulkCreate(alarms).then(() => {
        res.json({success: true});
    })

});
module.exports = router;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const path = __webpack_require__(2)
const _ = __webpack_require__(9);
const moment = __webpack_require__(4);
const db = __webpack_require__(1);
const {History, Service, ServiceWork, Device, DeviceService, Language, DeviceServiceWork, DeviceTMC, Type, Work, WorkMaterial, Material } = db;
const {CONTROLLER_ID} = process.env;
/* GET home page. */
router
    .get('/', function (req, res, next) {
        Device.findAll({
            where: {
                ctrl: config.controller
            },
            include: [{
                model: Type,
                as: 'type',
                include: [{
                    model: Service,
                    as: 'service',
                    include: [{
                        model: Work,
                        as: 'works',
                        include: [{
                            model: WorkMaterial,
                            as: 'materials',
                            include: [{
                                model: Material
                            }]
                        }]
                    }]
                }]
            }]
        }).then((devices) => {
            Promise.all(devices.map((device) => {
                return {
                    device: device,
                    type: device.get('type')
                }
            })).then((types) => {
                let services = [];
                let createServices = [];
                let createWorks = [];
                types.map((type) => {
                    let typ = type.type;
                    let device = type.device;
                    let servs = typ.get('service')
                    if (servs.length) {
                        Promise.all(servs.map((service) => {
                            createWorks.push({
                                id: service.get('id'),
                                service: service.toJSON(),
                                works: service.get('works')
                            });
                            return DeviceService.create({
                                ctrl: device.get('ctrl'),
                                dev: device.get('id'),
                                ser_num: service.get('ser_num'),
                                _lim: service.get('_set'),
                                _pre: 0,
                                ser_type: service.get('ser_type'),
                                service_id: service.get('id')
                            })
                        })).then((devservices) => {
                            devservices.map((devser) => {
                                let works = _.findWhere(createWorks, {id: devser.get('service_id')}).works;
                                Promise.all(works.map((work) => {
                                    return DeviceServiceWork.create({
                                        ctrl: device.get('ctrl'),
                                        ser_num: devser.get('ser_num'),
                                        service_id: devser.get('id'),
                                        work_id: work.get('id'),
                                        typ: work.get('dev'),
                                        dev: device.get('id'),
                                        user_occ: work.get('user_occ')
                                    })
                                })).then((dsws) => {
                                    dsws.map((dsw) => {
                                        //console.log(dsw.toJSON())
                                    })
                                })
                            })
                        })
                    }
                });

                res.send(services)
            })
        })
    })
    .get('/services', function (req, res, next) {
        DeviceService.findAll({
            where: {
                ctrl: CONTROLLER_ID
            },
            order: [['ser_num', 'ASC']],
            include: [
                {
                    model: DeviceServiceWork,
                    as: 'service_work',
                    include: [
                        {
                            model: Work,
                            as: 'works',
                            include: [{
                                model: WorkMaterial,
                                as: 'materials',
                                include: [{
                                    model: Material,
                                    as: 'mat'
                                }]
                            }]
                        }
                    ]
                }
            ]
        }).then((services) => {
            res.json(services)
        })
    })
    .get('/dev', (req, res, next) => {
        Device.findAll({
            where: {
                ctrl: config.controller
            },
            include: [{
                model: DeviceService,
                as: 'service',
                include: [{
                    model: DeviceServiceWork,
                    as: 'serviceWorks',
                    include: [{
                        model: Work,
                        as: 'works',
                        /*                        include: [{
                         model: WorkMaterial,
                         as: 'materials',
                         include: [{
                         model: Material
                         }]
                         }]*/
                    }]
                }]
            }]
        }).then((devices) => {
            res.json(devices)
        })
    })
    .get('/servicejournal', (req, res, next) => {
        History.findAll({
            where: {
                ctrl: config.controller
            },
            order: [['last_service', 'DESC']],
            limit: 20
        }).then((history) => {
            res.json(history)
        })
    })
    .put('/', (req, res) => {
        let id = req.body.id,
            ser = req.body;
        DeviceService.findById(req.body.id, {
            include: [
                {
                    model: Device,
                    as: 'device'
                }
            ]
        }).then((service) => {
            let device = service.get('device');
            let updatedField = {
                _pre: device.get('moto')
            }
            service
                .update(updatedField)
                .then((upService) => {
                    let dname = device.get('name'),
                        date = moment().format('d.MM.YYYY HH:MM:ss'),
                        ser_num = req.body.ser_num,
                        works = ser.performed.length === 0 ? 'Работ не выполнено' : (() => {
                            let performText = `Выполнены работы по следующему оборудованию: `
                            ser.performed.map((work, index) => {
                                let sign = '';
                                if (index + 1 < ser.performed.length) {
                                    sign = ', '
                                } else {
                                    sign = ''
                                }
                                performText += work.deviceName + `${sign}`;

                            })
                            return performText;
                        })()
                    let description = `${dname}<br> <p class='service-aligner'>${date}<br> Выполнено ТО${ser_num}<br> ${works}</p>`;
                    let historyRow = {
                        service_id: id,
                        description: description,
                        last_service: moment(),
                        ctrl: req.body.ctrl
                    };
                    Promise
                        .all(ser.performed.map((work) => {
                            console.log('updating service work suka')
                            return DeviceServiceWork.update({perform: 0}, {where: {id: work.id}}).then()
                        }))
                        .then(() => {
                            History.create(historyRow).then(() => {
                                DeviceService.findById(id).then((service) => {
                                    res.json(service)
                                })
                            })
                        });
                })
        });
    })
    .put('/performworks', (req, res) => {
        let performed = req.body;
        Promise.all(performed.map((work) => {
            return DeviceServiceWork.findById(work.id, {
                include: [
                    {
                        model: DeviceService,
                        as: 'devser',
                        include: [
                            {
                                model: Device,
                                as: 'device',
                                attributes: ['name', 'ctrl']
                            },
                        ]
                    }, {
                        model: Type,
                        as: 'devtype',
                        include: [
                            {
                                model: Language,
                                as: 'translate'
                            }
                        ]
                    },
                ]
            }).then((work) => {
                let service = work.get('devser');
                let type = work.get('devtype');
                let device = service.get('device');
                let sernum = service.get('ser_num');
                let typText = _.isNull(type.get('translate')) ? type.get('name') : type.get('translate').get('rus');
                let serText = `Выполнена работа по следующему устройству`;
                let description = `${device.get('name')} <br><p class='service-aligner'> ТО${sernum} <br> ${serText}: ${typText}</p> `;
                let historyRow = {
                    service_id: work.get('service_id'),
                    description: description,
                    last_service: moment(),
                    ctrl: device.get('ctrl')
                }
                History.create(historyRow);
                return work.update({
                    perform: 1,
                    perform_date: work.datetime
                })
            });
        })).then((data) => {
            res.json(data);
        });
    })
    .put('/performrepair', (req, res) => {
        let data = req.body,
            name = data.deviceName,
            text = data.text,
            ctrl = data.ctrl,
            descText = `Выполнен ремонт`,
            repText = `Текст ремонта`,
            datetime = moment(),
            description = `${name}<br> ${descText}<br> ${datetime}<br> ${repText}: ${text}`,
            historyRow = {
                service_id: null,
                description: description,
                last_service: datetime,
                ctrl: ctrl
            };

        History.create(historyRow).then((data) => {
            res.end()
        });

    });

module.exports = router;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(0);
const router = express.Router();
const db = __webpack_require__(1);
const {Registering, Sequelize} = db;
const Op = Sequelize.Op;
const faker = __webpack_require__(56);
const moment = __webpack_require__(4);
const config = __webpack_require__(11);
const _ = __webpack_require__(6);
const faces = _.toArray(config.ctrl.cfaces);

router.get('/', function (req, res, next) {
    const {from, to} = req.query;
    const PAGE_NUMBER = req.query.page || 1;
    const ITEMS_PER_PAGE = 100;
    const OFFSET = ITEMS_PER_PAGE * (PAGE_NUMBER - 1);
    if (from && to) {
        Registering
            .findAll({
                where: {
                    created_at: {[Op.between]: [from, to]}
                },
                limit: ITEMS_PER_PAGE,
                order: [['created_at', 'DESC']],
                offset: OFFSET,
            })
            .then((values) => {
                res.json(values)
            })
    } else {
        res.send('not used parameters');
    }
}).get('/seed', function (req, res, next) {
    let values = [];
    for (let i = 0; i < 1000000; i++) {
        const face = _.sample(faces);
        values.push({
            face_id: face.id,
            def: _.random(face.min_val, face.max_val),
            created_at: faker.date.between('2018-01-01', '2018-12-31')
        })
    }
    Registering
        .bulkCreate(values)
        .then(() => {
            res.send('Seeded successfully')
        })
});


module.exports = router;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("better-sqlite3");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("faker");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("locale");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("simple-node-logger");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("socketio-jwt");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("sqlite3");

/***/ })
/******/ ]);