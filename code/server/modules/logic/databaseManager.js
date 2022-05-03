'use strict';

const sqlite = require('sqlite3');

class DBManager {
    constructor() {
        const db = new sqlite.Database('./db.sqlite', (err) => {
            if (err) {
                console.log("error " + err);
                throw err;
            }
        });

        console.log("DB started");

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

    genericGetSql(istruzione) {
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true)
                }
            })
        })
    }
}

module.exports = DBManager;