'use strict';

const DBManager = require("./modules/database/databaseManager");
const dbManager = new DBManager();

function createTables(dbManager) {

    const createSKU =
        `CREATE TABLE SKU(
            id INT,
            weight FLOAT,
            volume FLOAT,
            price FLOAT,
            notes VARCHAR(250),
            description VARCHAR(250),
            PRIMARY KEY (id)
        )`;

    const createSKUItem =
        `CREATE TABLE SKUItem(
            RFID INT,
            SKUId INT, 
            available INT,
            dateOfStock DATE,
            PRIMARY KEY (RFID),
            FOREIGN KEY (SKUId) REFERENCES SKU(id)
        );`


    const createPosition =
        `CREATE TABLE Position(
            positionID INT,
            aisleID INT,
            row INT,
            col INT,
            maxWeight INT,
            maxVolume INT,
            occupiedWeight INT,
            occupiedVolume INT,
            PRIMARY KEY(positionID)
        );`

    const createSKU_in_Position =
        `CREATE TABLE SKU_in_Position(
            SKUId INT,
            positionID INT,
            PRIMARY KEY(SKUId, positionID),
            FOREIGN KEY (SKUId) REFERENCES SKU(id),
            FOREIGN KEY (positionID) REFERENCES Position(positionID)
        );`

    const createTestDescriptor =
        `CREATE TABLE TestDescriptor(
        id INT,
        name VARCHAR(100),
        procedureDescription VARCHAR(250),
        idSKU INT,
        PRIMARY KEY (id),
        FOREIGN KEY (idSKU) REFERENCES SKU(id)
    );`

    const createTestResult =
        `CREATE TABLE TestResult(
        id INT,
        idTestDescriptor INT,
        RFID INT,
        Date DATE,
        Result BOOLEAN,
        PRIMARY KEY (id),
        FOREIGN KEY(idTestDescriptor) REFERENCES TestDescriptor(id),
        FOREIGN KEY (RFID) REFERENCES SKUItem(RFID)
    );`

    const createUsers =
        `CREATE TABLE Users(
        id INT,
        username VARCHAR(250),
        name VARCHAR(100),
        surname VARCHAR(100),
        type VARCHAR(100),
        password VARCHAR(250),
        PRIMARY KEY (id)
    );`

    const createRestockOrder =
        `CREATE TABLE RestockOrder(
        id INT,
        issueDate DATE,
        state VARCHAR(250),
        shipmentDate DATE, 
        supplierId INT, 
        PRIMARY KEY(id),
        FOREIGN KEY(supplierId) REFERENCES Users(id)
    );`

    const createSKUPerRestockOrder =
        `CREATE TABLE SKUPerRestockOrder(
            id INT,
            SKUid INT,
            qty INT, 
            PRIMARY KEY(id, SKUid),
            FOREIGN KEY(SKUid) REFERENCES SKU(id),
            FOREIGN KEY(id) REFERENCES RestockOrder(id)
        )`

    const createSKUItemsPerRestockOrder =
        `CREATE TABLE SKUItemsPerRestockOrder(
            id INT,
            RFID INT,
            PRIMARY KEY(id, RFID),
            FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
            FOREIGN KEY(id) REFERENCES RestockOrder(id)
        )`

    const createReturnOrder =
        `CREATE TABLE  ReturnOrder(
            id INT,
            returnDate DATE,
            supplierID INT, 
            restockOrderID INT,
            PRIMARY KEY(id),
            FOREIGN KEY(supplierID) REFERENCES Users(id),
            FOREIGN KEY(id) REFERENCES RestockOrder(id)
        );`

    const createSKUPerReturnOrder =
        `CREATE TABLE SKUPerReturnOrder(
            id INT,
            SKUId INT,
            qty INT, 
            PRIMARY KEY(id, SKUId),
            FOREIGN KEY(SKUId) REFERENCES SKU(id)    
            FOREIGN KEY(id) REFERENCES ReturnOrder(id)
        )`

    const createInternalOrder =
        `CREATE TABLE SKUItemsPerReturnOrder(
            id INT,
            RFID INT,
            PRIMARY KEY(id, RFID),
            FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
            FOREIGN KEY(id) REFERENCES ReturnOrder(id)
        )`

    const createSKUPerInternalOrder =
        `CREATE TABLE SKUPerInternalOrder(
            id INT,
            SKUId INT,
            qty INT, 
            PRIMARY KEY(id, SKUId),
            FOREIGN KEY(SKUId) REFERENCES SKU(Id),
            FOREIGN KEY(id) REFERENCES InternalOrder(id)
        )`

    const createSKUItemsPerInternalOrder =
        `CREATE TABLE SKUItemsPerInternalOrder(
            id INT,
            RFID INT,
            PRIMARY KEY(id, RFID),
            FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
            FOREIGN KEY(id) REFERENCES InternalOrder(id)
        )`


    const createItem =
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
    );`


    const sqlInstructions = [
        createSKU, createSKUItem, createPosition, createSKU_in_Position, createTestDescriptor,
        createTestResult, createUsers, createRestockOrder, createSKUPerRestockOrder,
        createSKUItemsPerRestockOrder, createReturnOrder, createSKUPerReturnOrder,
        createInternalOrder, createSKUPerInternalOrder,createSKUItemsPerInternalOrder,
        createItem
    ]

    try{
        sqlInstructions.forEach((sql) => {
            dbManager.genericSqlRun(sql);});
    } catch {
        console.log("error");
        return 1;
    }



}

function addUsers(dbManager) {



    await dbManager.genericSqlRun(`INSERT INTO Users (id, username, name, surname, password, type) 
    VALUES (1, "user1@ezwh.com", "name1", "surname1", "e16b2ab8d12314bf4efbd6203906ea6c", "customer")`);
    await dbManager.genericSqlRun(`INSERT INTO Users (id, username, name, surname, password, type)
    VALUES (2, "qualityEmployee1@ezwh.com", "name2", "surname2", "e16b2ab8d12314bf4efbd6203906ea6c", "qualityEmployee")`);
    await dbManager.genericSqlRun(`INSERT INTO Users (id, username, name, surname, password, type) 
    VALUES (3, "clerk1@ezwh.com", "name3", "surname3", "e16b2ab8d12314bf4efbd6203906ea6c", "clerk")`);
    await dbManager.genericSqlRun(`INSERT INTO Users (id, username, name, surname, password, type) 
    VALUES (4, "deliveryEmployee1@ezwh.com", "name4", "surname4", "e16b2ab8d12314bf4efbd6203906ea6c", "deliveryEmployee")`);
    await dbManager.genericSqlRun(`INSERT INTO Users (id, username, name, surname, password, type) 
    VALUES (5, "supplier1@ezwh.com", "name5", "surname5", "e16b2ab8d12314bf4efbd6203906ea6c", "supplier")`);
    await dbManager.genericSqlRun(`INSERT INTO Users (id, username, name, surname, password, type) 
    VALUES (6, "manager1@ezwh.com", "name6", "surname6", "e16b2ab8d12314bf4efbd6203906ea6c", "manager")`);

function prova1() {
   try{
    console.log("prova1 start");
    const create =  createTables(dbManager);
    console.log("prova1 finish");
   } catch {
       return 1;
   }
   
   return 0;
}

function prova2(){
    console.log("prova2 start");
    const add = addUsers(dbManager);
    console.log("prova2 finish")
}

const myPromise = new Promise((resolve, reject) => {
    if(prova1() == 0){
        console.log("resolve 2");
        resolve();
    }
    else{
        reject();
    }
});


prom.then(() => {
    myPromise.then(() => {
        prova2();
    }).catch(() => {
        console.log("Error 2");
    });
});





//prova1();
//prova2();


}

createTables(dbManager).then(() => addUsers(dbManager));
