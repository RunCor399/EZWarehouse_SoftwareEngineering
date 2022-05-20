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


    async insertTestData(){
        //insertQueries
        const insertUsers = [ ' INSERT INTO Users (email, name, surname, password, type) \
                                VALUES  ("user1@ezwh.com","name1","surname1","e16b2ab8d12314bf4efbd6203906ea6c","customer"), \
                                        ("qualityEmployee1@ezwh.com", "name2","surname2","e16b2ab8d12314bf4efbd6203906ea6c","qualityEmployee"), \
                                        ("clerk1@ezwh.com","name3","surname3","e16b2ab8d12314bf4efbd6203906ea6c","clerk"), \
                                        ("deliveryEmployee1@ezwh.com","name4","surname4","e16b2ab8d12314bf4efbd6203906ea6c","deliveryEmployee"),\
                                        ("supplier1@ezwh.com","name5","surname5","e16b2ab8d12314bf4efbd6203906ea6c","supplier"),\
                                        ("manager1@ezwh.com","name6","surname6","e16b2ab8d12314bf4efbd6203906ea6c","manager")\
                            '];

        const insertRestockOrder = [' INSERT INTO RestockOrder ("issueDate", "state", "transportNote", "supplierId") \
                                     VALUES ("2021/01/01 01:01", "ISSUED", "", 5), \
                                            ("2022/01/02 10:10", "COMPLETEDRETURN", "", 4) \
                                    '];

        const insertSKU = [`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
                            VALUES ( 10, 20, 30, "note", "description", 40);`];

        const insertSKUItems = [`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) VALUES ("12345678901234567890123456789016",1,10,"2022/02/02");`];

        const insertQueries = [insertUsers, insertRestockOrder, insertSKU, insertSKUItems];

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


    async dbClear(){
        const sql = [`DROP TABLE InternalOrder;`,
            `DROP TABLE Item;`,
            `DROP TABLE Position;`,
            `DROP TABLE RestockOrder;`,
            `DROP TABLE ReturnOrder;`,
            `DROP TABLE SKU;`,
            `DROP TABLE SKUItem;`,
            `DROP TABLE SKUItemsPerInternalOrder;`,
            `DROP TABLE SKUItemsPerReturnOrder;`,
            `DROP TABLE SKUItemsPerRestockOrder;`,
            `DROP TABLE SKUPerInternalOrder;`,
            `DROP TABLE SKUPerRestockOrder;`,
            `DROP TABLE SKU_in_Position;`,
            `DROP TABLE TestDescriptor;`,
            `DROP TABLE TestResult;`,
            `DROP TABLE Users;`,


            `CREATE TABLE SKU(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weight FLOAT,
            volume FLOAT,
            price FLOAT,
            notes VARCHAR(250),
            description VARCHAR(250),
            availableQuantity INT
        );`,

            `CREATE TABLE SKUItem(
            RFID VARCHAR(50),
            SKUId INT,
            available INT,
            dateOfStock VARCHAR(50),
            PRIMARY KEY (RFID),
            FOREIGN KEY (SKUId) REFERENCES SKU(id)
        );`,

            ` CREATE TABLE Position(
            positionID TEXT PRIMARY KEY,
            aisleID TEXT,
            row TEXT,
            col TEXT,
            maxWeight INT,
            maxVolume INT,
            occupiedWeight INT,
            occupiedVolume INT
        );`,

            ` CREATE TABLE SKU_in_Position(
            SKUId INT,
            positionID INT,
            PRIMARY KEY(SKUId, positionID),
            FOREIGN KEY (SKUId) REFERENCES SKU(id),
            FOREIGN KEY (positionID) REFERENCES Position(positionID)
        );`,

            ` CREATE TABLE TestDescriptor(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100),
            procedureDescription VARCHAR(250),
            idSKU INT,
            FOREIGN KEY (idSKU) REFERENCES SKU(id)
        );`,

            ` CREATE TABLE TestResult(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idTestDescriptor INT,
            RFID VARCHAR(50),
            Date VARCHAR(50),
            Result BOOLEAN,
            FOREIGN KEY(idTestDescriptor) REFERENCES TestDescriptor(id),
            FOREIGN KEY (RFID) REFERENCES SKUItem(RFID)
        );`,

            ` CREATE TABLE Users(
            id INTEGER  PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(250),
            name VARCHAR(100),
            surname VARCHAR(100),
            type VARCHAR(100),
            password VARCHAR(250)
        );`,

            ` CREATE TABLE RestockOrder(
            id INTEGER PRIMARY KEY,
            issueDate VARCHAR(50),
            state VARCHAR(250),
            transportNote VARCHAR(50),
            supplierId INT,
            FOREIGN KEY(supplierId) REFERENCES Users(id)
        );`,

            ` CREATE TABLE SKUPerRestockOrder(
            id INT,
            SKUid INT,
            description VARCHAR(250),
            price FLOAT,
            qty INT,
            PRIMARY KEY(id, SKUid),
            FOREIGN KEY(SKUid) REFERENCES SKU(id),
            FOREIGN KEY(id) REFERENCES RestockOrder(id)
        );`,

            `CREATE TABLE SKUItemsPerRestockOrder(
            id INT,
            SKUID INT,
            RFID VARCHAR(50),
            PRIMARY KEY(id, RFID),
            FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
            FOREIGN KEY(id) REFERENCES RestockOrder(id)
        );`,

            ` CREATE TABLE ReturnOrder(
            id INTEGER  PRIMARY KEY,
            returnDate VARCHAR(50),
            restockOrderID INT,
            FOREIGN KEY(id) REFERENCES RestockOrder(id)
        );`,

            `CREATE TABLE SKUItemsPerReturnOrder(
            id INT,
            SKUId INT,
            description VARCHAR(50),
            price FLOAT,
            RFID VARCHAR(50),
            PRIMARY KEY(id, RFID),
            FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
            FOREIGN KEY(id) REFERENCES InternalOrder(id)
        );`,

            `CREATE TABLE InternalOrder(
            id INTEGER  PRIMARY KEY,
            issueDate VARCHAR(50),
            state VARCHAR(250),
            customerId INT,
            FOREIGN KEY(customerId) REFERENCES Users(id)
        );`,

            ` CREATE TABLE SKUPerInternalOrder(
            id INT,
            SKUId INT,
            description VARCHAR(50),
            price FLOAT,
            qty INT,
            PRIMARY KEY(id, SKUId),
            FOREIGN KEY(SKUId) REFERENCES SKU(Id),
            FOREIGN KEY(id) REFERENCES InternalOrder(id)
        );`,

            ` CREATE TABLE SKUItemsPerInternalOrder(
            id INT,
            RFID VARCHAR(50),
            PRIMARY KEY(id, RFID),
            FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
            FOREIGN KEY(id) REFERENCES InternalOrder(id)
        );`,

            `CREATE TABLE Item(
            id INT,
            description VARCHAR(250),
            price FLOAT,
            SKUid INT,
            supplierId INT,
            PRIMARY KEY (id),
            FOREIGN KEY (SKUid) REFERENCES SKU(id),
            FOREIGN KEY (supplierId) REFERENCES Users(id),
            CONSTRAINT SS_Item UNIQUE(SKUid, supplierId)
        );`,

            ` INSERT INTO Users (email, name, surname, password, type)
        VALUES (
                "user1@ezwh.com",
                "name1",
                "surname1",
                "e16b2ab8d12314bf4efbd6203906ea6c",
                "customer"
            );`,

            ` INSERT INTO Users ( email, name, surname, password, type)
        VALUES (
                "qualityEmployee1@ezwh.com",
                "name2",
                "surname2",
                "e16b2ab8d12314bf4efbd6203906ea6c",
                "qualityEmployee"
            );`,

            ` INSERT INTO Users (email, name, surname, password, type)
        VALUES (
                "clerk1@ezwh.com",
                "name3",
                "surname3",
                "e16b2ab8d12314bf4efbd6203906ea6c",
                "clerk"
            );`,

            `INSERT INTO Users ( email, name, surname, password, type)
        VALUES (
                "deliveryEmployee1@ezwh.com",
                "name4",
                "surname4",
                "e16b2ab8d12314bf4efbd6203906ea6c",
                "deliveryEmployee"
            );`,

            ` INSERT INTO Users ( email, name, surname, password, type)
        VALUES (
                "supplier1@ezwh.com",
                "name5",
                "surname5",
                "e16b2ab8d12314bf4efbd6203906ea6c",
                "supplier"
            );`,

            ` INSERT INTO Users (email, name, surname, password, type)
        VALUES (
                "manager1@ezwh.com",
                "name6",
                "surname6",
                "e16b2ab8d12314bf4efbd6203906ea6c",
                "manager"
            );`]


        console.log("Start resetting")
        for (let i = 0; i < sql.length; i++) {
            await this.genericSqlRun(sql[i])
                .catch(err => { console.log("error") })
        }

        console.log("finish reset")
    }

}

module.exports = DBManager;