# Requirements Document



## Stakeholders
- Medium Companies / Retailers
   
-  Retailers (com)
  
- Suppliers (companies that supply items to the warehouse, hence to the warehouse's owner company)
  
- Physical Warehouse (items stocking facility)
  
- Warehouse Items (items stocked in a warehouse)
  
- Warehouse Manager (person in charge of managing the warehouse)
  
- Items Ordering system (system that manages incoming orders)
  
- Items Availability Checking System (system that checks availability of items)
  
- Items Collection System (system that collects items to be delivered)
  
- Items Delivery System (system that manages the delivery of items within an order)

- Warehouse worker

- Courier
  
- Quality Office (office that performs tests on items)
  
- Quality Checking System (system that schedules tests and logs their outcomes)
  
- Quality Tests (tests for the different items)     !!!
  
- Items Stocking System (system that manages the stocking in the warehouse of new items)
  
- Items Returning System (system that manages the returning of items that haven't passed one or more quality checks)
  
- Warehouse Space Management System (system that optimizes the space occupied by items in a warehouse)
  
- Items Location Tracking System (system that tracks items that have to be dispatched)
  
- Company Organizational Units (sub-parts of the same company owning the warehouse)
  
- Internal Ordering System (system that manages company-internal incoming orders)


## Functional Requirements

- FR1 Placement of an Order 
  - FR1.1 Placement of an internal order
    - FR1.1.1 Choice of the wanted item
    - FR1.1.2 Issue Order to warehouse

  - FR1.2 Placement of an order to a supplier
    - FR1.2.1 Record info of a supplier
    - FR1.2.2 Fill information needed for the order
    - FR1.2.3 Send order
  
- FR2 Management of the physical warehouse
  - FR2.1 Check availability of an item
  - FR2.2 Collect an item to be delivered
  - FR2.3 Select the position in which to stock a new item
  - FR2.4 Issue a position replacement for an item
  - FR2.5 Track an item by it's ID
  - FR2.6 Prepare an item for delivery
  - FR2.7 Modify availability of an item (increase/decrease amount available)
  - FR2.8 Check space availability in the warehouse
  - FR2.9 Collect an item to be stocked
  
- FR3 Quality Tests Management
  - FR3.1 Schedule a quality test for an item
  - FR3.2 Insert in the system a new quality test
  - FR3.3 Insert outcome of a quality test in the system
  - FR3.4 Show outcome of a test
  - FR3.5 Modify parameters of a quality test (pass/reject rate)
  
- FR4 Shipment of an Item
  - FR4.1 Shipment to an internal OU
  - FR4.2 Shipment back to supplier in case of unsatisfied quality requirements (quality check failed, no need for an "order to supplier" since the item is returned back)
  
- FR5 Inventory Management
  - FR5.1 Add a new item to the inventory
  - FR5.2 Remove an item from the inventory
  - FR5.3 Edit info of an item 
  - FR5.4 Add supplier for an item
  - FR5.5 Remove supplier for an item
  - FR5.6 Edit supplier for an item

- FR6 Log internal orders (from OU within the company)
- FR7 Complete an internal order


## Non-functional Requirements

- NFR1 Usability: The software must be easy to use also for employees which have a limited amount of knowledge in the IT domain
  
- NFR2 Portability: In a company there might be different computers with different OS's, the software should be able to be correct in each of them.

- NFR3 Interoperability: The software should be able to cooperate with other software in order, for instance, to receive orders from suppliers

- NFR4 Easy to be maintained: In order to avoid expensive down times, the software should be able to be fixed in case of sudden bugs

- NFR5 Efficiency: The software must be efficient in managing the operations of space optimization, collection, shipment and stocking of a large number of items.

- NFR6 Scalability: If the company grows in dimensions (wrt the amount of sent and received orders), the software must be able to keep up and scale.

- NFR7 Robustness: The software must behave in a reasonable way also in case of unexpected scenarios (wrong inputs, bugs) in order to avoid economic damages 

- NFR8 Nationality of companies that will use this software (multi-language platform)

- NFR9 Use of different measurement metrics in case the software will be used in different continents (i.e. currencies, distance, space, speed...)

