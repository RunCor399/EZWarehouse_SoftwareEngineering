const DBManager = require("./modules/database/databaseManager");

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

const dbManager = new DBManager();


 sqlInstructions.forEach(async (sql) => {
    try {
        await dbManager.genericSqlRun(sql);
    } catch (error) {
        console.log("error", error, "about", sql);
    }
})

