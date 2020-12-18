//엄격한 코드 검사
'use strict';

/************* include library **************/
var express = require('express');
var DB   = require('./DB');
var api  = express();


api.use(express.static(__dirname + '/node_modules/startbootstrap-sb-admin-2'));

/************* Routing **************/
//api Index
api.get('/sensor', (req, res, next) => {

    DB.query('SELECT * FROM sensor_data', function(error, results, fielads){
        if(error){
            console.log(error);
        }
        console.log(results);
        res.send(results);
    });
});

/************* Routing **************/
//api Index
api.get('/hello2', (req, res, next) => {
    var pId ="0";
    if(req.query.id !== null && req.query.id !== undefined){
        pId = req.query.id;
    }

    res.send("510호"+pId);
});

api.post('/hello', (req, res, next) => {
    var pId = "0";
    var name = "";
    var num = "";

    if(req.query.id !== null && req.query.id !== undefined){
        pId = req.query.id;
    }
    if(req.query.name !== null && req.query.name !== undefined){
        name = req.query.name;
    }
    if(req.query.num !== null && req.query.num !== undefined){
        num = req.query.num;
    }

    res.send("백석대학교 : " + pId + name + num);
});

api.post('/insSensor', (req, res, next) => {

    var sensorType = req.body.sensorType;// "";
    var sensorValue = req.body.sensorValue;//"";
    var userId = req.body.userId; //"";

    var sql = "insert into sensor_data(sensor_type, sensor_value, sensor_user, ins_date) values ";
    sql += " ('"+ sensorType +"', "+ sensorValue +", '"+ userId +"', now() )";
    console.log(sql);

    console.log("init start");
    DB.query(sql , function(error, results, fields){
        console.log(error);
        console.log(results);
        res.send(results);
    })


    //req.body.sensorIdx
    //req.body.sensorType
    //req.body.sensorValue

});


/* bootstarap */


api.get('/insSensor', (req, res, next) => {
    
    // let sensor_data = {
    //         sensorType : "0",
    //         sensorValue : 20,
    //         userId : '20152829'
    // }
   
    // if(req.query.sensorType !== null && req.query.sensorType !== undefined){
    //     sensor_data.sensorType = req.query.sensorType;
    // }
    // if(req.query.sensorValue !== null && req.query.sensorValue !== undefined){
    //     sensor_data.sensorValue = req.query.sensorValue;
    // }
    // if(req.query.userId !== null && req.query.userId !== undefined){
    //     sensor_data.userId = req.query.userId;
    // }
    // var sql = "insert into sensor_data(sensor_type, sensor_value, sensor_user, ins_date) values ";
    // sql += " ('"+ sensor_data.sensorType +"', "+ sensor_data.sensorValue +", '"+ sensor_data.userId +"', now() )";
    // console.log(sql);
    

    var sensorType = req.query.sensorType;// "";
    var sensorValue = req.query.sensorValue;//"";
    var userId = req.query.userId; //"";

    var sql = "insert into sensor_data(sensor_type, sensor_value, sensor_user, ins_date) values ";
    sql += " ('"+ sensorType +"', "+ sensorValue +", '"+ userId +"', now() )";
    console.log(sql);
    
    console.log("init start");
    DB.query(sql , function(error, results, fields){
        console.log(error);
        console.log(results);
        res.send(results);
    })
});



//Query String
// ex) http://localhost/api/echo?param1=123&param2=321
api.get('/query_echo', (req, res, next) => {
    res.send(req.query);
});


module.exports = api;