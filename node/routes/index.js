var express = require('express');
var router = express.Router();
const fs = require('fs');
var sqlib = require("../sqlite3_lib.js")


/* GET home page. */
router.get('/', function(req, res, next) {
    manuals = []
    fs.readdir("./public/manual", (err, files) => {
        if (err) console.log(err)

        sqlib.readTable("./data/instruments.db", "instruments", (rows) => {
            //console.log(rows)
            files.forEach(file => { 
                manuals.push(file)
          //console.log(file)
            });
            for(i in rows) {
                j = manuals.includes(rows[i].model + ".pdf")
                rows[i].manual = j
            }
            res.render('index', { title: 'Express', manuals: manuals, instruments : rows});
        })
    });
});

module.exports = router;
