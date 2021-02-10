var express = require('express');
var router = express.Router();
const fs = require('fs');
var sqlib = require("../sqlite3_lib.js")


/* GET home page. */
router.get('/', function(req, res, next) {
    manuals = []
    fs.readdir("./public/manual", (err, files) => {
        if (err) console.log(err)
        files.forEach(file => { 
            manuals.push(file)
      //console.log(file)
        });
        sqlib.readTable("./data/instruments.db", "instruments", (rows) => {
            //console.log(rows)
            res.render('index', { title: 'Express', manuals: manuals, instruments : rows});
        })
    });
});

module.exports = router;
