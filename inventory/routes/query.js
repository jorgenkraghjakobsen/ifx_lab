var express = require('express');
var router = express.Router();
const fs = require('fs');
let socket = require('../resources/socket_lib.js')

/* GET home page. */
router.post('/', function(req, res) {  
    console.log(req.body)  
    s1 = new socket.device(req.body.ip, 13371, `query+${req.body.instrument}+${req.body.command}`, (err, data, host) => {
        if(data=="err") {
            res.send(data)
            console.log(err)
        } else {
            res.send(data);
        }
    });
});


module.exports = router;
