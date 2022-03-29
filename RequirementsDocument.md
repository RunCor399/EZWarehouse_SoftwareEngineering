doawnbaoiw
 #Requirements Document 

Date: 22 march 2022

Version: 0.0


 
| Version number | Change |
| -------------- | :----- |
|                |        |


# Contents

- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
	+ [Context Diagram](#context-diagram)
	+ [Interfaces](#interfaces) 
	
- [Contents](#contents)
- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
	- [Context Diagram](#context-diagram)
	- [Interfaces](#interfaces)
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
	- [Functional Requirements](#functional-requirements)
	- [Non Functional Requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
	- [Use case diagram](#use-case-diagram)
		- [Use case 1, UC1](#use-case-1-uc1)
				- [Scenario 1.1](#scenario-11)
				- [Scenario 1.2](#scenario-12)
				- [Scenario 1.x](#scenario-1x)
		- [Use case 2, UC2](#use-case-2-uc2)
		- [Use case x, UCx](#use-case-x-ucx)
- [Glossary](#glossary)
- [System Design](#system-design)
- [Deployment Diagram](#deployment-diagram)

# Informal description
Medium companies and retailers need a simple application to manage the relationship with suppliers and the inventory of physical items stocked in a physical warehouse. 
The warehouse is supervised by a manager, who supervises the availability of items. When a certain item is in short supply, the manager issues an order to a supplier. In general the same item can be purchased by many suppliers. The warehouse keeps a list of possible suppliers per item. 

After some time the items ordered to a supplier are received. The items must be quality checked and stored in specific positions in the warehouse. The quality check is performed by specific roles (quality office), who apply specific tests for item (different items are tested differently). Possibly the tests are not made at all, or made randomly on some of the items received. If an item does not pass a quality test it may be rejected and sent back to the supplier. 

Storage of items in the warehouse must take into account the availability of physical space in the warehouse. Further the position of items must be traced to guide later recollection of them.

The warehouse is part of a company. Other organizational units (OU) of the company may ask for items in the warehouse. This is implemented via internal orders, received by the warehouse. Upon reception of an internal order the warehouse must collect the requested item(s), prepare them and deliver them to a pick up area. When the item is collected by the other OU the internal order is completed. 

EZWH (EaSy WareHouse) is a software application to support the management of a warehouse.



# Stakeholders


| Stakeholder name                   |                                        Description                                        |
| ---------------------------------- | :---------------------------------------------------------------------------------------: |
| Medium Companies / Retailers       |                                                                                           |
| System Administrator               |                                                                                           |
| User Management System             |                                                                                           |
| Suppliers                          |   companies that supply items to the warehouse, hence to the warehouse's owner company    |
| Physical Warehouse                 |                                  items stocking facility                                  |
| Warehouse Items                    |                               items stocked in a warehouse                                |
| Warehouse Manager                  |                        person in charge of managing the warehouse                         |
| Items Ordering system              |                            system that manages incoming orders                            |
| Items Availability Checking System |                         system that checks availability of items                          |
| Items Collection System            |                        system that collects items to be delivered                         |
| Items Delivery System              |                 system that manages the delivery of items within an order                 |
| Warehouse worker                   |                                                                                           |
| Courier                            |                                                                                           |
| Quality Office                     |                            office that performs tests on items                            |
| Quality Checking System            |                    system that schedules tests and logs their outcomes                    |
| Quality Tests                      |                          tests for the different items)     !!!                           |
| Items Stocking System              |              system that manages the stocking in the warehouse of new items               |
| Items Returning System             | system that manages the returning of items that haven't passed one or more quality checks |
| Warehouse Space Management System  |             system that optimizes the space occupied by items in a warehouse              |
| Items Location Tracking System     |                    system that tracks items that have to be dispatched                    |
| Company Organizational Units       |                    sub-parts of the same company owning the warehouse                     |
| Internal Ordering System           |                   system that manages company-internal incoming orders                    |

#Context Diagram and interfaces

## Context Diagram
\<Define here Context diagram using UML use case diagram>

\<actors are a subset of stakeholders>

## Interfaces
\<describe here each interface in the context diagram>

\<GUIs will be described graphically in a separate document>

| Actor     | Logical Interface | Physical Interface |
| --------- | :---------------: | -----------------: |
| Actor x.. |                   |                    |

# Stories and personas
\<A Persona is a realistic impersonation of an actor. Define here a few personas and describe in plain text how a persona interacts with the system>

\<Persona is-an-instance-of actor>

\<stories will be formalized later as scenarios in use cases>


# Functional and non functional requirements

## Functional Requirements

\<In the form DO SOMETHING, or VERB NOUN, describe high level capabilities of the system>

\<they match to high level use cases> 

| ID  |        |         |                                |                             Description                              |
| --- | ------ | ------- | ------------------------------ | :------------------------------------------------------------------: |
| FR1 |        |         |                                |                        Placement of an Order                         |
|     | FR1.1  |         | Placement of an internal order |
|     |        | FR1.1.1 |                                |                      Choice of the wanted item                       |
|     |        | FR1.1.2 |                                |      Choice of the attributes for an item (quantity, color...)       |
|     |        | FR1.1.3 |                                |                       Issue Order to warehouse                       |
|     |        | FR1.1.4 |                                |                      Complete an internal order                      |
|     |        |         | FR1.1.4.1                      |                           Log placed order                           |
|     | FR1.2  |         |                                |                 Placement of an order to a supplier                  |
|     |        | FR1.2.1 |                                |    Record info of a supplier (in case not already in the system)     |
|     |        | FR1.2.2 |                                |        Choice of the supplier (in case already in the system)        |
|     |        | FR1.2.3 |                                |                Fill information needed for the order                 |
|     |        | FR1.2.4 |                                |               Check Availability of the requested item               |
|     |        | FR1.2.5 |                                |        Handle payment of the items (external payment system)         |
|     |        | FR1.2.6 |                                |                              Send order                              |
|     |        | FR1.2.7 |                                |                      Complete an internal order                      |
|     |        |         | FR1.2.7.1                      |                           Log placed order                           |
| FR2 |        |         |                                |                 Management of the physical warehouse                 |
|     | FR2.1  |         |                                |                    Check availability of an item                     |
|     | FR2.2  |         |                                |                   Collect an item to be delivered                    |
|     | FR2.3  |         |                                |         Select a free position in which to stock a new item          |
|     | FR2.4  |         |                                |               Issue a position replacement for an item               |
|     | FR2.5  |         |                                |                   Track an item by it's properties                   |
|     | FR2.6  |         |                                |                     Prepare an item for delivery                     |
|     | FR2.7  |         |                                |              Check space availability in the warehouse               |
|     | FR2.8  |         |                                |                    Collect an item to be stocked                     |
|     | FR2.9  |         |                                |              Elimination of an item from the warehouse               |
|     | FR2.10 |         |                                |               Placement of an item in the pick-up area               |
| FR3 |        |         |                                |                       Quality Tests Management                       |
|     | FR3.1  |         |                                |                 Schedule a quality test for an item                  |
|     | FR3.2  |         |                                |               Insert in the system a new quality test                |
|     | FR3.3  |         |                                |            Insert outcome of a quality test in the system            |
|     | FR3.4  |         |                                |                        Show outcome of a test                        |
|     | FR3.5  |         |                                |        Modify parameters of a quality test (pass/reject rate)        |
|     | FR3.6  |         |                                | Schedule return of an item in case of unfullfilled test requirements |
| FR4 |        |         |                                |                         Inventory Management                         |
|     | FR4.1  |         |                                |                   Add a new item to the inventory                    |
|     | FR4.2  |         |                                |                  Remove an item from the inventory                   |
|     | FR4.3  |         |                                |                         Edit info of an item                         |
|     | FR4.4  |         |                                |                       Add supplier for an item                       |
|     | FR4.5  |         |                                |                     Remove supplier for an item                      |
|     | FR4.6  |         |                                |                      Edit supplier for an item                       |
|     | FR4.7  |         |                                |             Track items to be placed in the pick-up area             |
| FR5 |        |         |                                |                           Users Management                           |
|     | FR5.1  |         |                                |                              Add a user                              |
|     | FR5.2  |         |                                |                            Remove a user                             |
|     | FR5.3  |         |                                |                     Manage permissions of a user                     |
|     | FR5.4  |         |                                |                 Edit personal information of a user                  |
|     | FR5.5  |         |                                |                      Show information of users                       |

## Non Functional Requirements

\<Describe constraints on functional requirements>

| ID      | Type (efficiency, reliability, ..) | Description | Refers to |
| ------- | :--------------------------------: | :---------: | --------: |
| NFR1    |                                    |             |           |
| NFR2    |                                    |             |           |
| NFR3    |                                    |             |           |
| NFRx .. |                                    |             |           |


# Use case diagram and use cases


## Use case diagram
\<define here UML Use case diagram UCD summarizing all use cases, and their relationships>


\<next describe here each use case in the UCD>
### Use case 1, UC1
| Actors Involved  |                                                                      |
| ---------------- | :------------------------------------------------------------------: |
| Precondition     | \<Boolean expression, must evaluate to true before the UC can start> |
| Post condition   |  \<Boolean expression, must evaluate to true after UC is finished>   |
| Nominal Scenario |         \<Textual description of actions executed by the UC>         |
| Variants         |                      \<other normal executions>                      |
| Exceptions       |                        \<exceptions, errors >                        |

##### Scenario 1.1 

\<describe here scenarios instances of UC1>

\<a scenario is a sequence of steps that corresponds to a particular execution of one use case>

\<a scenario is a more formal description of a story>

\<only relevant scenarios should be described>

| Scenario 1.1   |                                                                            |
| -------------- | :------------------------------------------------------------------------: |
| Precondition   | \<Boolean expression, must evaluate to true before the scenario can start> |
| Post condition |  \<Boolean expression, must evaluate to true after scenario is finished>   |
| Step#          |                                Description                                 |
| 1              |                                                                            |
| 2              |                                                                            |
| ...            |                                                                            |

##### Scenario 1.2

##### Scenario 1.x

### Use case 2, UC2
..

### Use case x, UCx
..



# Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the system, and their relationships> 

\<concepts are used consistently all over the document, ex in use cases, requirements etc>

# System Design
\<describe here system design>

\<must be consistent with Context diagram>

# Deployment Diagram 

\<describe here deployment diagram >




