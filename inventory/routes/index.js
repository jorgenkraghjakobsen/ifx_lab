var express = require('express');
var router = express.Router();
const fs = require('fs');
var nmap = require("../resources/nmap_lib.js")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title : 'Express'})
});

router.post('/', function(req, res) {
    nmap.scanHosts((r) => {
        //console.log(r)
        res.end(JSON.stringify({"inventory" : r}))
    })
});


module.exports = router;
