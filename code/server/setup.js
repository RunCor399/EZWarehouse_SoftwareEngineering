'use strict'
const DBManager = require("./modules/database/databaseManager");
const dbManager = new DBManager();


async function createTables(dbManager) {

    const createSKU = `CREATE TABLE SKU(
            ID INT,
            weight FLOAT,
            volume FLOAT,
            price FLOAT,
            notes VARCHAR(250),
            description VARCHAR(250),
            availableQuantity INT,
            positionID INT,
            FOREIGN KEY(positionID) REFERENCES Position(ID),
            PRIMARY KEY (ID)
        )`

    const createTestDescriptor = `CREATE TABLE TestDescriptor(
            ID INT,
            name VARCHAR(100),
            description VARCHAR(250),
            passRate FLOAT,
            SKUID INT,
            PRIMARY KEY (ID),
            FOREIGN KEY (SKUID) REFERENCES SKU(ID)
        );`

    const createSKUItem = `CREATE TABLE SKUItem(
            RFID INT,
            SKUID INT, 
            dateOfStock DATE,
            available BOOLEAN,
            PRIMARY KEY (RFID),
            FOREIGN KEY (SKUID) REFERENCES SKU(ID)
        );`

    const createTestResult = `CREATE TABLE TestResult(
            testDescID INT,
            SKUItemID INT,
            date DATE,
            result BOOLEAN,
            PRIMARY KEY (testDescID, SKUItemID, date),
            FOREIGN KEY(testDescID) REFERENCES TestDescriptor(ID),
            FOREIGN KEY (SKUItemID) REFERENCES SKUItem(ID)
        );
        `
    const createPosition = `CREATE TABLE Position(
            positionID INT,
            maxVolume FLOAT,
            maxWeight FLOAT,
            aisle INT,
            row INT,
            column INT,
            occupiedWeight FLOAT,
            occupiedVolume FLOAT,
            PRIMARY KEY(positionID)
        );
        `
    const createStockInfo = `CREATE TABLE StockInfo(
            positionID INT,
            SKUItemID INT,
            stockDate DATE,
            PRIMARY KEY (positionID, SKUItemID, stockDate),
            FOREIGN KEY(positionID) REFERENCES Position(ID),
            FOREIGN KEY (SKUItemID) REFERENCES SKUItem(ID)
        );`
    const createUsers = `CREATE TABLE Users(
            ID INT,
            username VARCHAR(250),
            name VARCHAR(100),
            surname VARCHAR(100),
            type VARCHAR(100),
            password VARCHAR(250),
            PRIMARY KEY (ID)
        );`


    const createItem = `CREATE TABLE Item(
            ID INT,
            SKUID INT,
            supplierID INT,
            price INT,
            description VARCHAR(250),
            PRIMARY KEY (ID),
            FOREIGN KEY (SKUID) REFERENCES SKU(ID),
            FOREIGN KEY (supplierID) REFERENCES Users(ID),
            CONSTRAINT SS_Item UNIQUE(SKUID, supplierID)
        );`


    const createRestockOrder = `CREATE TABLE RestockOrder(
            ID INT,
            supplierID INT, 
            issueDate DATE,
            shipmentDate DATE, 
            state VARCHAR(250),
            PRIMARY KEY(ID),
            FOREIGN KEY(supplierID) REFERENCES Users(ID)
        );`
    const createReturnOrder = `CREATE TABLE  ReturnOrder(
            ID INT,
            returnDate DATE,
            supplierID INT, 
            restockOrderID INT,
            PRIMARY KEY(ID),
            FOREIGN KEY(supplierID) REFERENCES Users(ID),
            FOREIGN KEY(restockOrderID) REFERENCES RestockOrder(ID)
        );`
    const createInternalOrder =
        `CREATE TABLE InternalOrder(
            ID INT,
            state VARCHAR(250), 
            internalCustomerID INT,
            issueDate DATE,
            PRIMARY KEY(ID),
            FOREIGN KEY(internalCustomerID) REFERENCES Users(ID)
        )`
    const createItemsPerRestockOrder =
        `CREATE TABLE ItemsPerRestockOrder(
            orderID INT,
            SKUID INT,
            quantity INT, 
            PRIMARY KEY(orderID, SKUID),
            FOREIGN KEY(SKUID) REFERENCES SKU(ID),
            FOREIGN KEY(orderID) REFERENCES RestockOrder(ID)
        )
        `
    const createItemsPerReturnOrder =
        `CREATE TABLE ItemsPerReturnOrder(
            orderID INT,
            SKUID INT,
            quantity INT, 
            PRIMARY KEY(orderID, SKUID),
            FOREIGN KEY(SKUID) REFERENCES SKU(ID),
            FOREIGN KEY(orderID) REFERENCES ReturnOrder(ID)
        )
        `
    const createItemsPerInternalOrder =
        `CREATE TABLE ItemsPerInternalOrder(
            orderID INT,
            SKUID INT,
            quantity INT, 
            PRIMARY KEY(orderID, SKUID),
            FOREIGN KEY(SKUID) REFERENCES SKU(ID),
            FOREIGN KEY(orderID) REFERENCES InternalOrder(ID)
        )`

    const sqlInstructions = [createPosition, createTestDescriptor, createSKU, createSKUItem, createTestResult,
        createStockInfo, createUsers, createItem, createRestockOrder, createReturnOrder,
        createInternalOrder, createItemsPerRestockOrder, createItemsPerReturnOrder, createItemsPerInternalOrder]


    return new Promise(async (resolve, reject) => {
        try {
            sqlInstructions.forEach(async (sql) => {
                await dbManager.genericSqlRun(sql);
            });
        } catch (error) {
            reject(false)
        }
        resolve(true)
    });


}

async function addUsers(dbManager) {



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

}

createTables(dbManager).then(() => addUsers(dbManager));