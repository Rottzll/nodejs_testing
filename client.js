'use strict';

var express = require('express');
var server = express();
var path = require('path');
var axios = require('axios');


server.set('views', path.join(_dirname, '/web'));
server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);

server.get('/', (req, res, next)=>{
    axios.get('http://localhost/api').then((Respomse)=>{
        
    console.log(Response.data);

        var arrData = {
            "data" : JSON.parse(Response.data)
        }
        //console.log(arrData);
        res.render("clientList.html", arrData);
    }).catch((Error)=>{
        console.log(Error);
    })

});