var sqlite3 = require('sqlite3').verbose();


function readTable(database, table, callback) { //when finished calls "callback" function with rows as argument.
    let db = new sqlite3.Database(database, (err) => {
        if (err) {
            return console.error(err.message);
        }
            console.log('Connected to database');
    });


    db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        callback(rows)
    });
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
}

module.exports.readTable = readTable;