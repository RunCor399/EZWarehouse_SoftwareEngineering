

CREATE TABLE SKU(
    id INT,
    weight FLOAT,
    volume FLOAT,
    price FLOAT,
    notes VARCHAR(250),
    description VARCHAR(250),
    availableQuantity INT,
    PRIMARY KEY (id)
)

CREATE TABLE SKUItem(
    RFID VARCHAR(50),
    SKUId INT, 
    available INT,
    dateOfStock VARCHAR(50),
    PRIMARY KEY (RFID),
    FOREIGN KEY (SKUId) REFERENCES SKU(id)
);

CREATE TABLE Position(
    positionID INT,
    aisleID INT,
    row INT,
    col INT,
    maxWeight INT,
    maxVolume INT,
    occupiedWeight INT,
    occupiedVolume INT,
    PRIMARY KEY(positionID)
);

CREATE TABLE SKU_in_Position(
    SKUId INT,
    positionID INT,
    PRIMARY KEY(SKUId, positionID),
    FOREIGN KEY (SKUId) REFERENCES SKU(id),
    FOREIGN KEY (positionID) REFERENCES Position(positionID)
)

CREATE TABLE TestDescriptor(
    id INT,
    name VARCHAR(100),
    procedureDescription VARCHAR(250),
    idSKU INT,
    PRIMARY KEY (id),
    FOREIGN KEY (idSKUID) REFERENCES SKU(id)
);


CREATE TABLE TestResult(
    id INT,
    idTestDescriptor INT,
    RFID VARCHAR(50),
    Date VARCHAR(50),
    Result BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY(idTestDescriptor) REFERENCES TestDescriptor(id),
    FOREIGN KEY (RFID) REFERENCES SKUItem(RFID)
);


CREATE TABLE Users(
    id INT,
    name VARCHAR(100),
    surname VARCHAR(100),
    username VARCHAR(250),
    type VARCHAR(100),
    password VARCHAR(250),
    PRIMARY KEY (id)
);


CREATE TABLE RestockOrder(
    id INT,
    issueDate VARCHAR(50),
    state VARCHAR(250),
    shipmentDate VARCHAR(50), 
    supplierId INT, 
    PRIMARY KEY(id),
    FOREIGN KEY(supplierId) REFERENCES Users(id)
);

CREATE TABLE SKUPerRestockOrder(
    id INT,
    SKUid INT,
    description VARCHAR(250),
    price FLOAT,
    qty INT, 
    PRIMARY KEY(id, SKUid),
    FOREIGN KEY(SKUid) REFERENCES SKU(id),
    FOREIGN KEY(id) REFERENCES RestockOrder(id)
)

CREATE TABLE SKUItemsPerRestockOrder(
    id INT,
    SKUID INT,
    RFID VARCHAR(50),
    PRIMARY KEY(id, RFID),
    FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(id) REFERENCES RestockOrder(id)
)


CREATE TABLE  ReturnOrder(
    id INT,
    returnDate VARCHAR(50),
    supplierID INT, 
    restockOrderID INT,
    PRIMARY KEY(id),
    FOREIGN KEY(supplierID) REFERENCES Users(id),
    FOREIGN KEY(id) REFERENCES RestockOrder(id)
);


CREATE TABLE SKUPerReturnOrder(
    id INT,
    SKUId INT,
    description VARCHAR(250),
    price FLOAT,
    RFID VARCHAR(50), 
    PRIMARY KEY(orderID, SKUId),
    FOREIGN KEY(SKUId) REFERENCES SKU(id)    
    FOREIGN KEY(id) REFERENCES ReturnOrder(id)
)

CREATE TABLE SKUItemsPerReturnOrder(
    id INT,
    SKUID INT,
    RFID VARCHAR(50),
    PRIMARY KEY(id, RFID),
    FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(id) REFERENCES ReturnOrder(id)
)


CREATE TABLE InternalOrder(
    id INT,
    issueDate VARCHAR(50),
    state VARCHAR(250), 
    customerId INT,
    PRIMARY KEY(id),
    FOREIGN KEY(customerId) REFERENCES Users(id),
    FOREIGN KEY(id) REFERENCES Order(id);
)

CREATE TABLE SKUPerInternalOrder(
    id INT,
    SKUId INT,
    description VARCHAR(250),
    price FLOAT,
    qty INT, 
    PRIMARY KEY(id, SKUId),
    FOREIGN KEY(SKUId) REFERENCES SKU(Id),
    FOREIGN KEY(id) REFERENCES InternalOrder(id)
)


CREATE TABLE SKUItemsPerInternalOrder(
    id INT,
    SKUID INT,
    RFID VARCHAR(50),
    PRIMARY KEY(id, RFID),
    FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(id) REFERENCES InternalOrder(id)
)


CREATE TABLE Item(
    id INT,
    description VARCHAR(250),
    price FLOAT,
    SKUid INT,
    supplierId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (SKUid) REFERENCES SKU(id),
    FOREIGN KEY (supplierId) REFERENCES Users(id),
    CONSTRAINT SS_Item UNIQUE(SKUid, supplierId)
);
