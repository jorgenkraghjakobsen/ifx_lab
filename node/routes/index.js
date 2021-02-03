var express = require('express');
var router = express.Router();
const fs = require('fs');



/* GET home page. */
router.get('/', function(req, res, next) {
  manuals = []
  fs.readdir("./public/manual", (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
      manuals.push(file)
      console.log(file)
    });

    res.render('index', { title: 'Express', manuals: manuals});
  });
});

module.exports = router;
