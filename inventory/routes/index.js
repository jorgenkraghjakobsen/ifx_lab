var express = require('express');
var router = express.Router();
const fs = require('fs');
var nmap = require("../resources/nmap_lib.js")
//var socket = require("../resources/socket_lib.js")   MAKE SURE TO UNCOMMENT THIS IN PRODUCTION

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title : 'Express'})
});

router.post('/', function(req, res) {
    console.log(req.headers.detecttype)
    
    if(req.headers.detecttype) {
        if(req.headers.detecttype == "raspberries") {
            res.end(JSON.stringify({"raspberries" : "comming soon"}))
        } else {
            networkScan(res)
        }
    } else {
        networkScan(res)
    }
    
});
function networkScan(res) {
     nmap.scanHosts((r) => {
        res.end(JSON.stringify({"inventory" : r}))
    })
}

module.exports = router;
