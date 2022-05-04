'use strict';

const sqlite = require('sqlite3');
var db;

class DBManager {
    constructor() {
        this.db = new sqlite.Database('./db.sqlite', (err) => {
            if (err) {
                console.log("error " + err);
                throw err;
            }
        });

        console.log("DBManager started");

    }

    genericSqlRun(istruzione) {
        return new Promise((resolve, reject) => {
            db.run(istruzione, (err) => {
                if (err)
                    reject(err);
                else resolve(true);
            })
        })
    }

    genericSqlGet(istruzione) {
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = DBManager;