'use strict';

const sqlite = require('sqlite3');
const Exceptions = require('../../routers/exceptions');

class DBManager {
    #db;
    constructor() {
        this.#db = new sqlite.Database('./modules/database/db.db', (err) => {
            if (err) {
                console.log("Database start error: " + err);
                throw err;
            }
        });

        console.log("DBManager started");

    }

    async genericSqlRun(istruzione) {
        return new Promise((resolve, reject) => {
            this.#db.run(istruzione, (err) => {
                if (err){
                    console.log("Database run error: err", err);
                    reject(err);
                }
                else resolve(true);
            })
        })
    }

    async genericSqlGet(istruzione) {
        return new Promise((resolve, reject) => {
            this.#db.all(istruzione, (err, rows) => {
                if (err) {
                    console.log("Database get error: err", err);
                    reject(err);
                    
                } else {
                    resolve(rows)
                }
            })
        })
    }


    async genericSqlRun(query, ...params) {
        return new Promise((resolve, reject) => {
            this.#db.run(query, params, (err) => {
                if (err){
                    console.log("Database run error: err", err);
                    reject(err);
                }
                else resolve(true);
            })
        })
    }

    async genericSqlGet(query, ...params) {
        return new Promise((resolve, reject) => {
            this.#db.all(query, params, (err, rows) => {
                if (err) {
                    console.log("Database get error: err", err);
                    reject(err);
                    
                } else {
                    resolve(rows)
                }
            })
        })
    }

}

module.exports = DBManager;