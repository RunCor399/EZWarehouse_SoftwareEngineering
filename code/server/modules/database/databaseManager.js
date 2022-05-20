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
        //console.log(params);
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

    //TESTING PURPOSES

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
            "DELETE FROM Item WHERE 1=1",

            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKU'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKUItem'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='Position'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKU_in_Position'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='TestDescriptor'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='TestResult'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='Users'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='RestockOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKUPerRestockOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKUItemsPerRestockOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='ReturnOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKUItemsPerReturnOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='InternalOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKUPerInternalOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='SKUItemsPerInternalOrder'",
            "DELETE FROM SQLITE_SEQUENCE WHERE name='Item'",

            'INSERT INTO Users (email, name, surname, password, type) \
             VALUES  ("user1@ezwh.com","name1","surname1","e16b2ab8d12314bf4efbd6203906ea6c","customer"), \
                    ("qualityEmployee1@ezwh.com", "name2","surname2","e16b2ab8d12314bf4efbd6203906ea6c","qualityEmployee"), \
                    ("clerk1@ezwh.com","name3","surname3","e16b2ab8d12314bf4efbd6203906ea6c","clerk"),  \
                    ("deliveryEmployee1@ezwh.com","name4","surname4","e16b2ab8d12314bf4efbd6203906ea6c","deliveryEmployee"), \
                    ("supplier1@ezwh.com","name5","surname5","e16b2ab8d12314bf4efbd6203906ea6c","supplier"), \
                    ("manager1@ezwh.com","name6","surname6","e16b2ab8d12314bf4efbd6203906ea6c","manager")' 
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


    async insertRestockAndReturnOrderTestData(){
        const insertRestockOrder = [' INSERT INTO RestockOrder ("issueDate", "state", "transportNote", "supplierId") \
                                     VALUES ("2021/01/01 01:01", "ISSUED", "", 5), \
                                            ("2022/01/02 10:10", "COMPLETEDRETURN", "", 4) \
                                    '];

        const insertReturnOrder = [`INSERT INTO ReturnOrder (returnDate, restockOrderID)
                                    VALUES ("2022/02/02", 1);
        `];
        
        const insertSKUItemsPerReturnOrder = [`INSERT INTO SKUItemsPerReturnOrder (id, SKUId, description, price,  RFID) 
                                               VALUES (1, 1, "skuPerReturnOrder", 30, "12345678901234567890123456789016");`];

        const insertSKU = [`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
                            VALUES ( 10, 20, 30, "note", "description", 40);`];

        const insertSKUItems = [`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) VALUES ("12345678901234567890123456789016",1,10,"2022/02/02");`];

        const insertQueries = [insertRestockOrder, insertReturnOrder, insertSKU, insertSKUItemsPerReturnOrder, insertSKUItems];

        return new Promise((resolve, reject) => {
            insertQueries.forEach((querySet) => {
                querySet.forEach((query) => {
                    this.#db.run(query, (err, rows) => {
                        if (err) {
                            console.log("Database get error: err", err);
                            reject(new Exceptions(500));
                        } else {
                            resolve(rows)
                        }
                    });
                }); 
            });
    })
                   
    }

}

module.exports = DBManager;