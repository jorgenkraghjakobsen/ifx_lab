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
            networkScan(res, (r) => {
                for(i of r) {
                    //socket.device(i["ip"], 13371, "ping", (data) => {
                    s1 = new socket.device(i["ip"], 13371, "ping", (err, data, host) => {
                        if(data=="err") {
                        } else {
                            console.log(data + " from " + host)

                           /* s2 = new socket.device(host, 13371, "getDevices", (err, data, host) => {
                                if(err!=null) {
                                    console.log(err)
                                } else {
                                    console.log(data + " from " + host)
                                }
                            });*/
                        }
                    });
                    /*socket.device("192.168.1.150", 13371, "ping", (data) => {
                        //if(data=="err") {
                        //} else {
                            console.log(data)
                        //}
                    });*/
                }    
                res.end(JSON.stringify({"inventory" : r}))
            })
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
