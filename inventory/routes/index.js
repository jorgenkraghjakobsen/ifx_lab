var express = require('express');
var router = express.Router();
const fs = require('fs');
var nmap = require("../nmap_lib.js")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title : 'Express'})
});

router.post('/', function(req, res) {
    nmap.scanHosts((r, m) => {
        res.end(JSON.stringify({"inventory" : r, "manuls" : m}))
    })
});


module.exports = router;
