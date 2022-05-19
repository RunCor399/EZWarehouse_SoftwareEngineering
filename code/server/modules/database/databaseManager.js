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

    async deleteAllData(){
        const queries = [
            "DELETE FROM SKU WHERE 1=1",
            "DELETE FROM SKUItem WHERE 1=1",
            "DELETE FROM Position WHERE 1=1",
            "DELETE FROM SKU_in_Position WHERE 1=1",
            "DELETE FROM TestDescriptor WHERE 1=1",
            "DELETE FROM TestResult WHERE 1=1",
            "DELETE FROM Users WHERE 1=1",
            "DELETE FROM RestockOrder WHERE 1=1",
            "DELETE FROM SKUPerRestockOrder WHERE 1=1",
            "DELETE FROM SKUItemsPerRestockOrder WHERE 1=1",
            "DELETE FROM ReturnOrder WHERE 1=1",
            "DELETE FROM SKUItemsPerReturnOrder WHERE 1=1",
            "DELETE FROM InternalOrder WHERE 1=1",
            "DELETE FROM SKUPerInternalOrder WHERE 1=1",
            "DELETE FROM SKUItemsPerInternalOrder WHERE 1=1",
            "DELETE FROM Item WHERE 1=1"
        ];

        return new Promise((resolve, reject) => {

                
                queries.forEach((query) => {
                    this.#db.run(query, (err, rows) => {
                        if (err) {
                            console.log("Database get error: err", err);
                            reject(new Exceptions(500));
                        } else {
                            resolve(rows)
                        }
                    });
                });
        })
    }

}

module.exports = DBManager;