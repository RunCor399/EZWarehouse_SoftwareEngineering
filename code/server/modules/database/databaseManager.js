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

    /** execute an update/insert/delete given an istruction and params 
     * @throws 500
    */
    async genericSqlRun(query, ...params) {
        console.log(params);
        return new Promise((resolve, reject) => {
            this.#db.run(query, params, (err) => {
                if (err) {
                    console.log("Database run error: err", err);
                    reject(new Exceptions(500));
                }
                else resolve(true);
            })
        })
    }
    
    /** execute a select given an istruction and params 
         * @throws 500
        */
    async genericSqlGet(query, ...params) {
        return new Promise((resolve, reject) => {
            this.#db.all(query, params, (err, rows) => {
                if (err) {
                    console.log("Database get error: err", err);
                    reject(new Exceptions(500));
                } else {
                    resolve(rows)
                }
            })
        })
    }

}

module.exports = DBManager;