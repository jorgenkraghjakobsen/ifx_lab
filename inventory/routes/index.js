var express = require('express');
var router = express.Router();
const fs = require('fs');
var nmap = require("../resources/nmap_lib.js")
let socket = require('../resources/socket_lib.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title : 'Express'})
});
router.post('/', function(req, res) {    
    if(req.headers.detecttype) {
        if(req.headers.detecttype == "raspberries") {
            networkScan(res, (r) => {
                jobs = []
                for(i in r) {
                    jobs.push(i)
                }
                
                for(i in r) {
                    (function(curI, callback) {
                        if(curI == 8 || curI == 0) {
                        }
                        s1 = new socket.device(r[curI]["ip"], 13371, "ping", (err, data, host) => {
                            if(data=="err") {
                                callback(r, curI)
                            } else {
                                console.log(data + " from " + host)
                                r[curI].socket = "open"
                                s2 = new socket.device(r[curI]["ip"], 13371, "getInstruments", (err, data, host) => {
                                    if(data=="err") {
                                        console.error(err)

                                    } else {
//                                        console.log(data)
                                        if(data != "[]") {data = JSON.parse(data); r[curI].instruments = data.join(", ");}
                                        else {r[curI].instruments = "No instruments connected"}
                                        s3 = new socket.device(r[curI]["ip"], 13371, "getName", (err, data, host) => {
                                            if(data=="err") {
                                                console.error(err)
                                            } else {
                                                r[curI].hostname = data
                                                s4 = new socket.device(r[curI]["ip"], 13371, "getI2c", (err, data, host) => {
                                                    if(data=="err") {
                                                        console.error(err)
                                                    } else {
                                                        r[curI].i2c_data = data
                                                        console.log("asd")
                                                        callback(r, curI)
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    })(i, (r, curI) => {
                        jobs.splice(0, 1)
                        if(jobs.length == 2) {    
                            res.end(JSON.stringify({"inventory" : r}))
                        } else if (jobs.length < 8) {
                        }
                    })
                }
            });
        } else {
            networkScan(res, (r) => {
                res.end(JSON.stringify({"inventory" : r}))
            })
        }
    } else {
        networkScan(res, (r) => {
            res.end(JSON.stringify({"inventory" : r}))
        })
    }
    
});

function networkScan(res, callback) {
     nmap.scanHosts((r) => {
        callback(r)
    })
}

module.exports = router;
