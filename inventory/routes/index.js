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
    console.log(req.headers.detecttype)
    
    if(req.headers.detecttype) {
        if(req.headers.detecttype == "raspberries") {
            c = 0 
            networkScan(res, (r) => {
                console.log(Object.keys(r).length)
                for(i in r) {
                    (function(curI) {
                        s1 = new socket.device(r[curI]["ip"], 13371, "ping", (err, data, host) => {
                            if(data=="err") {
                                c++
                            } else {
                                console.log(data + " from " + host)
                                s2 = new socket.device(r[curI]["ip"], 13371, "getInstruments", (err, data, host) => {
                                    if(data=="err") {
                                        console.error(err)

                                    } else {
                                        r[curI].socket = "open"
                                        s3 = new socket.device(r[curI]["ip"], 13371, "getName", (err, data, host) => {
                                            if(data=="err") {
                                                console.error(err)

                                            } else {
                                                r[curI].hostname = data
                                                c++
                                                console.log(c)
                                                if(c == Object.keys(r).length-1) {                  
                                                    res.end(JSON.stringify({"inventory" : r}))
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                            console.log(c)
                            if(c == Object.keys(r).length-1) {                  
                                res.end(JSON.stringify({"inventory" : r}))
                            }
                        });
                    })(i)
                }
                /*while(!finishedFor) {
                    if(finished) {
                        for(j of r) {
                            if(j.socket) {
                                console.log("far")
                                if(!j.hostname) {
                                    continue;
                                }
                            }
                        }
                        res.end(JSON.stringify({"inventory" : r}))
                        finishedFor = true
                    }
                }*/
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
