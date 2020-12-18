//엄격한 코드 검사
'use strict';

/************* include library **************/
var express             = require('express');
var path                = require('path');
var server              = express();
var axios               = require('axios');
var cron                = require('node-cron')


/************* view engine setup **************/
server.set('views', path.join(__dirname, '/web'));

server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);

server.use(express.static(__dirname + '/node_modules/startbootstrap-sb-admin-2'));

/************* Routing **************/
//client Index


server.get('/list.ejs', (req, res, next) => {

    axios.get('http://localhost:3000/api').then((Response)=>{
        //console.log(Responses.data);

        //va arrData = 
        //npm install axios
        var arrData = {
            "data" : Response.data
        }
        //console.log(arrData);
        res.render("list.ejs", arrData);
    }).catch((Error)=>{
        console.log(Error);
    })
})


cron.schedule('*/5* * * * *', () => {
     console.log('매 1,2,4,5분 마다 실행');

     var sensorType = 'temp';
     var sensroValue = 30;
     var userId = '20152829';
    
     axios.get('http://localhost:3000/api/inSsensor?sensorType='+ sensorType + '&sensorValue='+ sensroValue +
     '&userId='+ userId).then((response) => {

     }).catch((Error)=>{
         console.log(Error);
     })
});

module.exports =server;