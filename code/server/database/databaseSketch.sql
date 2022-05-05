CREATE TABLE DeliveryEmployee(
    ID INT,
    name VARCHAR(100),
    surname VARCHAR(100),
    privilegeLevel INT,
    PRIMARY KEY (ID)
);

CREATE TABLE QualityCheckEmployee(
    ID INT,
    name VARCHAR(100),
    surname VARCHAR(100),
    privilegeLevel INT,
    PRIMARY KEY (ID)
);

CREATE TABLE Manager(
    ID INT,
    name VARCHAR(100),
    surname VARCHAR(100),
    privilegeLevel INT,
    PRIMARY KEY (ID)
);

CREATE TABLE Clerk(
    ID INT,
    name VARCHAR(100),
    surname VARCHAR(100),
    privilegeLevel INT,
    PRIMARY KEY (ID)
);

CREATE TABLE TestDescriptor(
    ID INT,
    name VARCHAR(100),
    description VARCHAR(250),
    passRate FLOAT,
    addedByEmployee INT,
    PRIMARY KEY (ID),
    FOREIGN KEY(addedByEmployee) REFERENCES QualityCheckEmployee(ID)
);

CREATE TABLE SKUItem(
    ID INT,
    PRIMARY KEY (ID)
);

CREATE TABLE SKU(
    ID INT,
    weight FLOAT,
    volume FLOAT,
    price FLOAT,
    notes VARCHAR(250),
    description VARCHAR(250),
    PRIMARY KEY (ID)
)

CREATE TABLE TestDescriptorOwnership(
    testDescID INT,
    SKUID INT,
    PRIMARY KEY (testDescID, SKUID),
    FOREIGN KEY(testDescID) REFERENCES TestDescriptor(ID),
    FOREIGN KEY (SKUID) REFERENCES SKU(ID)
);

CREATE TABLE TestResult(
    testDescID INT,
    SKUItemID INT,
    date DATE,
    result BOOLEAN,
    PRIMARY KEY (testDescID, SKUItemID, date),
    FOREIGN KEY(testDescID) REFERENCES TestDescriptor(ID),
    FOREIGN KEY (SKUItemID) REFERENCES SKUItem(ID)
);

CREATE TABLE Position(
    ID INT,
    maxVolume FLOAT,
    maxWeight FLOAT,
    aisle VARCHAR(250),
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
    FOREIGN KEY (SKUItemID) REFERENCES SKUItem(ID)
);

CREATE TABLE SKUStorage(
    positionID INT,
    SKUID INT,
    PRIMARY KEY (positionID, SKUItemID),
    FOREIGN KEY(positionID) REFERENCES Position(ID),
    FOREIGN KEY (SKUID) REFERENCES SKU(ID)
);

CREATE TABLE Item(
    ID INT,
    SKUID INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (SKUID) REFERENCES SKU(ID)
);

CREATE TABLE Supplier(
    ID INT,
    name VARCHAR(250),
    PRIMARY KEY (ID)
);

CREATE TABLE ItemsSoldPerSupplier(
    itemID INT,
    supplierID INT,
    PRIMARY KEY (itemID, supplierID),
    FOREIGN KEY (itemID) REFERENCES Item(ID),
    FOREIGN KEY (supplierID) REFERENCES Supplier(ID),
);

CREATE TABLE Order(
    ID INT,
    PRIMARY KEY(ID)
);

CREATE TABLE RestockOrder(
    ID INT,
    supplierID INT, 
    issueDate DATE,
    shipmentDate DATE, 
    state VARCHAR(250),
    PRIMARY KEY(ID),
    FOREIGN KEY(supplierID) REFERENCES Supplier(ID),
    FOREIGN KEY(ID) REFERENCES Order(ID)
);

CREATE TABLE  ReturnOrder(
    ID INT,
    returnDate DATE,
    supplierID INT, 
    managerID INT,
    restockOrderID INT,
    PRIMARY KEY(ID),
    FOREIGN KEY(supplierID) REFERENCES Supplier(ID),
    FOREIGN KEY(managerID) REFERENCES Manager(ID),
    FOREIGN KEY(restockOrderID) REFERENCES RestockOrder(ID),
    FOREIGN KEY(ID) REFERENCES Order(ID)
);

CREATE TABLE SKUItemsReturnedPerOrder(
    returnOrderID INT,
    SKUItemID INT,
    PRIMARY KEY(returnOrderID, SKUItemID),
    FOREIGN KEY(SKUItemID) REFERENCES SKUItem(ID),
    FOREIGN KEY(returnOrderID) REFERENCES ReturnOrder(ID)
);


CREATE TABLE InternalCustomer(
    ID INT,
    name VARCHAR(250),
    surname VARCHAR(250),
    PRIMARY KEY(ID)
);

CREATE TABLE ItemsPerOrder(
    orderID INT,
    SKUID INT,
    quantity INT, 
    PRIMARY KEY(orderID, SKUID),
    FOREIGN KEY(SKUID) REFERENCES SKU(ID),
    FOREIGN KEY(orderID) REFERENCES Order(ID)

)

CREATE TABLE InternalOrder(
    ID INT,
    state VARCHAR(250), 
    internalCustomerID INT,
    PRIMARY KEY(ID),
    FOREIGN KEY(internalCustomerID) REFERENCES InternalCustomer(ID),
    FOREIGN KEY(ID) REFERENCES Order(ID);
)




