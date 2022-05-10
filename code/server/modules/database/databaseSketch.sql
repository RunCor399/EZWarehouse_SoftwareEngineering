
CREATE TABLE TestDescriptor(
    ID INT,
    name VARCHAR(100),
    description VARCHAR(250),
    passRate FLOAT,
    SKUID INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (SKUID) REFERENCES SKU(ID)
);

CREATE TABLE SKUItem(
    RFID INT,
    SKUID INT, 
    dateOfStock DATE,
    available BOOLEAN,
    PRIMARY KEY (RFID),
    FOREIGN KEY (SKUID) REFERENCES SKU(ID)
);

CREATE TABLE SKU(
    ID INT,
    weight FLOAT,
    volume FLOAT,
    price FLOAT,
    notes VARCHAR(250),
    description VARCHAR(250),
    positionID INT,
    FOREIGN KEY(positionID) REFERENCES Position(ID),
    PRIMARY KEY (ID)
)

CREATE TABLE TestResult(
    testDescID INT,
    SKUItemID INT,
    date DATE,
    result BOOLEAN,
    PRIMARY KEY (testDescID, SKUItemID, date),
    FOREIGN KEY(testDescID) REFERENCES TestDescriptor(ID),
    FOREIGN KEY (SKUItemID) REFERENCES SKUItem(RFID)
);

CREATE TABLE Position(
    ID INT,
    maxVolume FLOAT,
    maxWeight FLOAT,
    aisle INT,
    row INT,
    column INT,
    occupiedWeight FLOAT,
    occupiedVolume FLOAT,
    PRIMARY KEY(ID)
);

CREATE TABLE StockInfo(
    positionID INT,
    SKUItemID INT,
    stockDate DATE,
    PRIMARY KEY (positionID, SKUItemID, stockDate),
    FOREIGN KEY(positionID) REFERENCES Position(ID),
    FOREIGN KEY (SKUItemID) REFERENCES SKUItem(RFID)
);


CREATE TABLE Item(
    ID INT,
    SKUID INT,
    supplierID INT,
    price INT,
    description VARCHAR(250),
    PRIMARY KEY (ID),
    FOREIGN KEY (SKUID) REFERENCES SKU(ID),
    FOREIGN KEY (supplierID) REFERENCES Users(ID),
    CONSTRAINT SS_Item UNIQUE(SKUID, supplierID)
);

CREATE TABLE Users(
    ID INT,
    name VARCHAR(100),
    surname VARCHAR(100),
    email VARCHAR(250),
    type VARCHAR(100),
    password VARCHAR(250),
    PRIMARY KEY (ID)
);

CREATE TABLE RestockOrder(
    ID INT,
    supplierID INT, 
    issueDate DATE,
    shipmentDate DATE, 
    state VARCHAR(250),
    PRIMARY KEY(ID),
    FOREIGN KEY(supplierID) REFERENCES Users(ID)
);

CREATE TABLE  ReturnOrder(
    ID INT,
    returnDate DATE,
    supplierID INT, 
    restockOrderID INT,
    PRIMARY KEY(ID),
    FOREIGN KEY(supplierID) REFERENCES Users(ID),
    FOREIGN KEY(restockOrderID) REFERENCES RestockOrder(ID)
);



CREATE TABLE SKUPerRestockOrder(
    orderID INT,
    SKUID INT,
    qty INT, 
    PRIMARY KEY(orderID, SKUID),
    FOREIGN KEY(SKUID) REFERENCES SKU(ID),
    FOREIGN KEY(orderID) REFERENCES RestockOrder(ID)
)

CREATE TABLE SKUPerReturnOrder(
    orderID INT,
    SKUID INT,
    qty INT, 
    PRIMARY KEY(orderID, SKUID),
    FOREIGN KEY(SKUID) REFERENCES SKU(ID)
)

CREATE TABLE InternalOrder(
    ID INT,
    state VARCHAR(250), 
    internalCustomerID INT,
    issueDate DATE,
    PRIMARY KEY(ID),
    FOREIGN KEY(internalCustomerID) REFERENCES Users(ID),
    FOREIGN KEY(ID) REFERENCES Order(ID);
)

CREATE TABLE SKUPerInternalOrder(
    orderID INT,
    SKUID INT,
    qty INT, 
    PRIMARY KEY(orderID, SKUID),
    FOREIGN KEY(SKUID) REFERENCES SKU(ID),
    FOREIGN KEY(orderID) REFERENCES InternalOrder(ID)
)

CREATE TABLE SKUItemsPerRestockOrder(
    orderID INT,
    SKUItemID INT,
    PRIMARY KEY(orderID, SKUIItemID),
    FOREIGN KEY(SKUItemID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(orderID) REFERENCES RestockOrder(ID)
)

CREATE TABLE SKUItemsPerReturnOrder(
    orderID INT,
    SKUItemID INT,
    PRIMARY KEY(orderID, SKUItemID),
    FOREIGN KEY(SKUItemID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(orderID) REFERENCES ReturnOrder(ID)
)


CREATE TABLE SKUItemsPerInternalOrder(
    orderID INT,
    SKUItemID INT,
    PRIMARY KEY(orderID, SKUItemID),
    FOREIGN KEY(SKUItemID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(orderID) REFERENCES InternalOrder(ID)
)


