# Unit Testing Report

Date:

Version:

# Contents

- [Black Box Unit Tests](#black-box-unit-tests)
    + [createSku](#createSKU)




- [White Box Unit Tests](#white-box-unit-tests)


# Black Box Unit Tests

    <Define here criteria, predicates and the combination of predicates for each function of each class.
    Define test cases to cover all equivalence classes and boundary conditions.
    In the table, report the description of the black box test case and (traceability) the correspondence with the Jest test case writing the 
    class and method name that contains the test case>
    <Jest tests  must be in code/server/unit_test  >

## **Class *skuController* - method *getSKU***

The input value is the id.

**Criteria for method *getSKU*:**
	
 - Validity of *id*




**Predicates for method *getSKU*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*      |     There is no SKU with the specified *id* in the database      |
|          |     There is a SKU with the specified *id* in the database     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Validity of *id*      |     No boundary found      |

| Criteria 1 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Present |  Valid | There is a SKU with the chosen *id*||
| Absent  | Invalid | There is no SKU with the chosen *id*|| 


 ## **Class *skuController* - method *createSKU***

The values used for criteria are not the input of the function, they are taken from the body of the HTTP POST Request.



**Criteria for method *createSKU*:**
	

 - Sign of *weight*
 - Sign of *volume*
 - Sign of *availableQuantity*
  - Sign of *price*
 - Absence of array of *testDescriptors*




**Predicates for method *createSKU*:**

| Criteria | Predicate |
| :--------: | :---------: |
|   Sign of *weight*       |    *weight* is positive       |
|   |    *weight* is negative       |
|   Sign of *volume*       |    *volume* is positive       |
|   |    *volume* is negative       |
|   Sign of *availableQuantity*       |    *availableQuantity* is positive       |
|   |    *availableQuantity* is negative       |
|   Sign of *price*       |    *price* is positive       |
|   |    *price* is negative       |
|    Absence of array of *testDescriptors*      |     There is no array *testDescriptor* in the body of the POST      |
|   |     There is the array *testDescriptor* in the body of the POST     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Sign of *weight*       |    0      |
|   Sign of *volume*       |    0       |
|   Sign of *availableQuantity*       |    0      |
|   Sign of *price*       |    0       |
|    Absence of array of *testDescriptors*      |     No boundary found      |



**Combination of predicates**:


| Criteria 1 | Criteria 2 |  Criteria 3 | Criteria 4 |Criteria 5 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| Positive |  Positive | Positive | Positive | Present | Invalid | The test case considers all the correct signs, but it has an unrequested array of *testDescriptors*| |
| Positive |  Positive | Positive | Positive | Absent | Valid | The test case considers all the correct signs and it doesn't have the array of *testDescriptors*| |
| Positive |  Positive | Positive | Negative | Present | Invalid | The test case considers one incorrect sign and it has an unrequested array of *testDescriptors*| |
| Positive |  Positive | Positive | Negative | Absent | Invalid | The test case considers one incorrect sign | |
| Positive |  Positive | Negative | Positive | Present | Invalid | The test case considers one incorrect sign and it has an unrequested array of *testDescriptors*| |
| Positive |  Positive | Negative | Positive | Absent | Invalid | The test case considers one incorrect sign| |
| Positive |  Positive | Negative | Negative | Present | Invalid | The test case considers two incorrect signs and it has an unrequested array of *testDescriptors*| |
| Positive |  Positive | Negative | Negative | Absent | Invalid | The test case considers two incorrect signs | |
| Positive |  Negative | Positive | Positive | Present | Invalid | The test case considers one incorrect sign and it has an unrequested array of *testDescriptors*| |
| Positive |  Negative | Positive | Positive | Absent | Invalid | The test case considers one incorrect sign| |
| Positive |  Negative | Positive | Negative | Present | Invalid | The test case considers two incorrect signs and it has an unrequested array of *testDescriptors*| |
| Positive |  Negative | Positive | Negative | Absent | Invalid | The test case considers two incorrect signs | |
| Positive |  Negative | Negative | Positive | Present | Invalid | The test case considers two incorrect signs and it has an unrequested array of *testDescriptors*| |
| Positive |  Negative| Negative | Positive | Absent | Invalid | The test case considers two incorrect signs| |
| Positive |  Negative | Negative | Negative | Present | Invalid | The test case considers three incorrect signs and it has an unrequested array of *testDescriptors*| |
| Positive |  Negative | Negative | Negative | Absent | Invalid | The test case considers three incorrect signs | |
| Negative |  Positive | Positive | Positive | Present | Invalid | The test case considers one incorrect sign and it has an unrequested array of *testDescriptors*| |
| Negative |  Positive | Positive | Positive | Absent | Invalid | The test case considers one incorrect sign| |
| Negative |  Positive | Positive | Negative | Present | Invalid | The test case considers two incorrect signs and it has an unrequested array of *testDescriptors*| |
| Negative |  Positive | Positive | Negative | Absent | Invalid | The test case considers two incorrect signs | |
| Negative |  Positive | Negative | Positive | Present | Invalid | The test case considers two incorrect signs and it has an unrequested array of *testDescriptors*| |
| Negative |  Positive | Negative | Positive | Absent | Invalid | The test case considers two incorrect signs| |
| Negative |  Positive | Negative | Negative | Present | Invalid | The test case considers three incorrect signs and it has an unrequested array of *testDescriptors*| |
| Negative |  Positive | Negative | Negative | Absent | Invalid | The test case considers three incorrect signs | |
| Negative |  Negative | Positive | Positive | Present | Invalid | The test case considers two incorrect signs and it has an unrequested array of *testDescriptors*| |
| Negative |  Negative | Positive | Positive | Absent | Invalid | The test case considers two incorrect signs| |
| Negative |  Negative | Positive | Negative | Present | Invalid | The test case considers three incorrect signs and it has an unrequested array of *testDescriptors*| |
| Negative |  Negative | Positive | Negative | Absent | Invalid | The test case considers three incorrect signs | |
| Negative |  Negative | Negative | Positive | Present | Invalid | The test case considers three incorrect signs and it has an unrequested array of *testDescriptors*| |
| Negative |  Negative| Negative | Positive | Absent | Invalid | The test case considers three incorrect signs| |
| Negative |  Negative | Negative | Negative | Present | Invalid | The test case considers four incorrect signs and it has an unrequested array of *testDescriptors*| |
| Negative |  Negative | Negative | Negative | Absent | Invalid | The test case considers four incorrect signs | |


## **Class *skuController* - method *editSKU***

The input values the id and they are also taken from the body of the HTTP PUT Request.

**Criteria for method *editSKU*:**
	

 - Sign of *newWeight*
 - Sign of *newVolume*
 - Sign of *newAvailableQuantity*
 - Sign of *newPrice*
 - Validity of *id*
 - Value of *occupiedWeight-maxWeight*
 - Value of *occupiedVolume-maxVolume*




**Predicates for method *editSKU*:**

| Criteria | Predicate |
| :--------: | :---------: |
|   Sign of *newWeight*       |    *newWeight* is positive       |
|          |    *newWeight* is negative       |
|   Sign of *newVolume*       |    *newVolume* is positive       |
|          |    *newVolume* is negative       |
|   Sign of *newAvailableQuantity*       |    *newAvailableQuantity* is positive       |
|         |    *newAvailableQuantity* is negative       |
|   Sign of *newPrice*       |    *newPrice* is positive       |
|          |    *newPrice* is negative       |
|    Validity of *id*      |     There is no SKU with the specified *id* in the database      |
|         |     There is a SKU with the specified *id* in the database     |
|    Sign of *occupiedWeight-maxWeight*     |     *occupiedWeight-maxWeight* is negative      |
|          |     *occupiedWeight-maxWeight* is positive   |
|    Sign of *occupiedVolume-maxVolume*    |     *occupiedVolume-maxVolume*is negative      |
|        |     *occupiedVolume-maxVolume* is positive   |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Sign of *newWeight*       |    0      |
|   Sign of *newVolume*       |    0       |
|   Sign of *newAvailableQuantity*       |    0      |
|   Sign of *newPrice*       |    0       |
|   Validity of *id*      |     No boundary found      |
|   Sign of *occupiedVolume-maxVolume*       |    0      |
|   Sign of *occupiedWeight-maxWeight*      |    0       |



**Combination of predicates**:


| Criteria 1 | Criteria 2 |  Criteria 3 | Criteria 4 |Criteria 5 | Criteria 6 |Criteria 7 |Valid / Invalid | Description of the test case | Jest test case |
| :-------: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: |
| Positive |  Positive | Positive | Positive | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume| |
| Positive |  Positive | Positive | Positive | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight| |
| Positive |  Positive | Positive | Positive | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume| |
| Positive |  Positive | Positive | Positive | Present |Negative| Negative| Valid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value| |
| Positive |  Positive | Positive | Positive | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database| |
| Positive |  Positive | Positive | Positive | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database| |
| Positive |  Positive | Positive | Positive | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database| |
| Positive |  Positive | Positive | Positive | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database| |
| Positive |  Positive | Positive | Negative | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, there is one wrong sign| |
| Positive |  Positive | Positive | Negative | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, there is one wrong sign| |
| Positive |  Positive | Positive | Negative | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, there is one wrong sign| |
| Positive |  Positive | Positive | Negative | Present |Negative| Negative| Invalid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value, there is one wrong sign| |
| Positive |  Positive | Positive | Negative | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Positive | Negative | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Positive | Negative | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Positive | Negative | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Present |Negative| Negative| Invalid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Negative | Positive | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Positive | Negative | Negative | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, there are two wrong signs| |
| Positive |  Positive | Negative | Negative | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, there are two wrong signs| |
| Positive |  Positive | Negative | Negative | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, there are two wrong signs| |
| Positive |  Positive | Negative | Negative | Present |Negative| Negative| Invalid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value, there are two wrong signs| |
| Positive |  Positive | Negative | Negative | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Positive | Negative | Negative | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Positive | Negative | Negative | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Positive | Negative | Negative | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Positive | Positive | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, there is one wrong sign| |
| Positive |  Negative | Positive | Positive | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, there is one wrong sign| |
| Positive |  Negative | Positive | Positive | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, there is one wrong sign| |
| Positive |  Negative | Positive | Positive | Present |Negative| Negative| Invalid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value, there is one wrong sign| |
| Positive |  Negative | Positive | Positive | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive | Negative | Positive | Positive | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Negative | Positive | Positive | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database| |
| Positive |  Negative | Positive | Positive | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there is one wrong sign| |
| Positive |  Negative | Positive | Negative | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, there are two wrong signs| |
| Positive |  Negative | Positive | Negative | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, there are two wrong signs| |
| Positive |  Negative | Positive | Negative | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, there are two wrong signs| |
| Positive |  Negative | Positive | Negative | Present |Negative| Negative| Invalid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value, there are two wrong signs| |
| Positive |  Negative | Positive | Negative | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Positive | Negative | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Positive | Negative | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Positive | Negative | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Negative | Positive | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, there are two wrong signs| |
| Positive |  Negative | Negative | Positive | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, there are two wrong signs| |
| Positive |  Negative | Negative | Positive | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, there are two wrong signs| |
| Positive |  Negative| Negative | Positive | Present |Negative| Negative| Invalid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value, there are two wrong signs| |
| Positive |  Negative | Negative | Positive | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Negative | Positive | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Negative | Positive | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Negative | Positive | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are two wrong signs| |
| Positive |  Negative | Negative | Negative | Present |Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, there are three wrong signs| |
| Positive |  Negative | Negative | Negative | Present |Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, there are three wrong signs| |
| Positive |  Negative | Negative | Negative | Present |Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, there are three wrong signs| |
| Positive |  Negative | Negative | Negative | Present |Negative| Negative| Invalid | The test case considers all the correct signs, there is a SKU with the chosen *id* in the database, the occupied volume and weight don't exceed their maximum value, there are three wrong signs| |
| Positive |  Negative | Negative | Negative | Absent | Positive| Positive| Invalid | The new occupied weight exceeds the maxWeight, the new occupied volume exceeds the maxVolume, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are three wrong signs| |
| Positive |  Negative | Negative | Negative | Absent | Positive| Negative| Invalid | The new occupied weight exceeds the maxWeight, the test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are three wrong signs| |
| Positive |  Negative | Negative | Negative | Absent | Negative| Positive| Invalid | The new occupied volume exceeds the maxVolume, he test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are three wrong signs| |
| Positive |  Negative | Negative | Negative | Absent | Negative| Negative| Invalid | The test case considers all the correct signs, but there is no SKU with the chosen *id* in the database, there are three wrong signs| |
|.......|



## **Class *skuController* - method *setPosition***

The input values the id and they are also taken from the body of the HTTP PUT Request.

**Criteria for method *setPosition*:**
	
 - Value of *occupiedWeight-maxWeight*
 - Value of *occupiedVolume-maxVolume*
 - Validity of *id*
 - Validity of *position*



**Predicates for method *setPosition*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*      |     There is no SKU with the specified *id* in the database      |
|          |     There is a SKU with the specified *id* in the database     |
|    Validity of *position*      |     There is no SKU with the specified *position* in the database and the position exists    |
|          |     There is a SKU with the specified *position* in the database or the *position* doesn't exist   |
|    Sign of *occupiedWeight-maxWeight*     |     *occupiedWeight-maxWeight* is negative      |
|          |     *occupiedWeight-maxWeight* is positive   |
|    Sign of *occupiedVolume-maxVolume*    |     *occupiedVolume-maxVolume*is negative      |
|       |     *occupiedVolume-maxVolume* is positive   |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Sign of *occupiedVolume-maxVolume*       |    0      |
|   Sign of *occupiedWeight-maxWeight*      |    0       |
|   Validity of *id*      |     No boundary found      |
|   Validity of *position*      |     No boundary found      |



**Combination of predicates**:


| Criteria 1 | Criteria 2 |  Criteria 3 | Criteria 4 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| Positive| Positive| Present | Valid| Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume||
| Positive| Positive| Present | Invalid| Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume, there is no position with such positionID in the database or the poitionID is already associated to a SKU||
| Positive| Positive| Absent | Valid| Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume, there is no SKU with such SKUID in the database||
| Positive| Positive| Absent | Invalid | Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume, there is no position with such positionID in the database, there is no SKU with such SKUID in the database or the poitionID is already associated to a SKU||
| Positive| Negative| Present | Valid| Invalid | The occupied weight exceeds the maxWeight||
| Positive| Negative| Present | Invalid | Invalid | The occupied weight exceeds the maxWeight, there is no position with such positionID in the database or the poitionID is already associated to a SKU||
| Positive| Negative| Absent | Valid| Invalid | The occupied weight exceeds the maxWeight, there is no SKU with such SKUID in the database||
| Positive| Negative| Absent | Invalid | Invalid | The occupied weight exceeds the maxWeight, there is no position with such positionID in the database or the poitionID is already associated to a SKU, there is no SKU with such SKUID in the database||
|  Negative| Positive| Present | Valid| Invalid | The occupied volume exceeds the maxVolume||
|  Negative| Positive| Present | Invalid | Invalid | The occupied volume exceeds the maxVolume, there is no position with such positionID in the database or the poitionID is already associated to a SKU||
|  Negative| Positive| Absent | Valid| Invalid | The occupied volume exceeds the maxVolume, there is no SKU with such SKUID in the database||
|  Negative| Positive| Absent | Invalid | Invalid | The occupied volume exceeds the maxVolume, there is no position with such positionID in the database or the poitionID is already associated to a SKU, there is no SKU with such SKUID in the database||
|  Negative| Negative| Present | Valid| Valid | All the conditions are satisfied||
|  Negative| Negative| Present | Invalid | Invalid |  There is no position with such positionID in the database or the poitionID is already associated to a SKU||
|  Negative| Negative| Absent | Valid| Invalid | There is no SKU with such SKUID in the database||
|  Negative| Negative| Absent | Invalid | Invalid | There is no position with such positionID in the database or the poitionID is already associated to a SKU, there is no SKU with such SKUID in the database||


## **Class *skuController* - method *deleteSKU***

The input value is the id.

**Criteria for method *deleteSKU*:**
	
 - Validity of *id*




**Predicates for method *deleteSKU*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*      |     There is no SKU with the specified *id* in the database      |
|          |     There is a SKU with the specified *id* in the database     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Validity of *id*      |     No boundary found      |



**Combination of predicates**:


| Criteria 1 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Present |  Valid | There is a SKU with the chosen *id*||
| Absent  | Invalid | There is no SKU with the chosen *id*|| 

## **Class *skuItemController* - method *getSkuItems***

The input value is the Skuid.

**Criteria for method *getSkuItems*:**
	
 - Validity of *SKUid*




**Predicates for method *getSkuItems*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *SKUid*      |     There is no SKU with the specified *SKUid* in the database      |
|          |     There is a SKU with the specified *SKUid* in the database     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Validity of *SKUid*      |     No boundary found      |



**Combination of predicates**:


| Criteria 1 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Present |  Valid | There is a SKU with the chosen *SKUid*||
| Absent  | Invalid | There is no SKU with the chosen *SKUid*|| 

## **Class *skuItemController* - method *getSkuItem***

The input value is the SkuItemid.

**Criteria for method *getSkuItem*:**
	
 - Validity of *SKUItemid*




**Predicates for method *getSkuItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *SKUItemid*      |     There is no SKU Item with the specified *SKUItemid* in the database      |
|          |     There is a SKU Item with the specified *SKUItemid* in the database     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Validity of *SKUItemid*      |     No boundary found      |



**Combination of predicates**:


| Criteria 1 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Present |  Valid | There is a SKU Item with the chosen *SKUItemid*||
| Absent  | Invalid | There is no SKU Item with the chosen *SKUItemid*|| 

## **Class *skuItemController* - method *createSkuItem***

The input value is the body of the HTTP POST Request.

**Criteria for method *getSkuItem*:**
 - Validity of *skuid*	
 - Format of  *dateOfStock*
 - Usage of *rfid*




**Predicates for method *getSkuItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *skuid*     |     There is no SKU with the specified *skuid* in the database      |
|          |     There is a SKU with the specified *skuid* in the database     |
|    Usage of *rfid*     |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU Item with the specified *rfid* in the database     |
| Format of  *dateOfStock* | The date format is a valid one (NULL, "YYYY/MM/DD" or"YYYY/MM/DD HH:MM")  |
|  | The date format is an invalid one |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *skuid*     |      No boundary found      |
|    Usage of *rfid*     |      No boundary found      |
| Format of  *dateOfStock* |  No boundary found  |


**Combination of predicates**:


| Criteria 1 | Criteria 2 | Criteria 3| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|Present| Valid| In use| Invalid | The rfid is already used by another SKUItem||
|Present| Valid| Not in use| Valid | The rfid is not used by another SKUItem, the date format is valid and the sku id is associated to an existing sku ||
|Present| Invalid| In use| Invalid | The rfid is already used by another SKUItem, the date format is not valid||
|Present| Invalid| Not in use| Invalid | The date format is not valid||
|Absent| Valid| In use| Invalid | The rfid is already used by another SKUItem, there is no SKU with the specified id||
|Absent| Valid| Not in use| Invalid | The rfid is not used by another SKUItem, the date format is valid and the sku id is associated to an existing sku, there is no SKU with the specified id ||
|Absent| Invalid| In use| Invalid | The rfid is already used by another SKUItem, the date format is not valid, there is no SKU with the specified id||
|Absent| Invalid| Not in use| Invalid | The date format is not valid, there is no SKU with the specified id||


## **Class *skuItemController* - method *editSkuItem***

The input value is the body of the HTTP PUT Request, but also the old rfid.

**Criteria for method *editSkuItem*:**
 - Validity of *oldrfid*	
 - Validity of *rfid*	
 - Sign of *newAvailable*
 - Format of  *dateOfStock*
 




**Predicates for method *editSkuItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *oldrfid*     |     There is no SKU item with the specified *oldrfid* in the database      |
|          |     There is a SKU with the specified *oldrfid* in the database     |
|    Usage of *rfid*     |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU Item with the specified *rfid* in the database     |
|Sign of *newAvailable* | Sign is positive|
| | Sign is negative|
| Format of  *dateOfStock* | The date format is a valid one (NULL, "YYYY/MM/DD" or"YYYY/MM/DD HH:MM")  |
|  | The date format is an invalid one |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *oldrfid*     |      No boundary found      |
|    Usage of *rfid*     |      No boundary found      |
|Sign of *newAvailable* | 0|
| Format of  *dateOfStock* |  No boundary found  |


**Combination of predicates**:


| Criteria 1 | Criteria 2 | Criteria 3| Criteria 4| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|Present|In use | Positive| Valid |Invalid| The rfid is already used by another SKUItem||
|Present|In use | Positive| Invalid |Invalid| The rfid is already used by another SKUItem, the date format is not valid||
|Present|In use | Negative| Valid |Invalid| The rfid is already used by another SKUItem, the availability is negative||
|Present|In use | Negative| Invalid |Invalid| The rfid is already used by another SKUItem, the date format is not valid, the availability is negative||
|Present|Not use | Positive| Valid |Valid| The rfid is not already used by another SKUItem, it is a valid modification||
|Present|Not in use | Positive| Invalid |Invalid| The date format is not valid||
|Present|Not in use | Negative| Valid |Invalid| The availability is negative||
|Present|Not in use | Negative| Invalid |Invalid| The date format is not valid, the availability is negative||
|Absent|In use | Positive| Valid |Invalid| The rfid is already used by another SKUItem, there is no SKUItem with rfid=*oldrfid*||
|Absent|In use | Positive| Invalid |Invalid| The rfid is already used by another SKUItem, the date format is not valid, there is no SKUItem with rfid=*oldrfid*||
|Absent|In use | Negative| Valid |Invalid| The rfid is already used by another SKUItem, the availability is negative, there is no SKUItem with rfid=*oldrfid*||
|Absent|In use | Negative| Invalid |Invalid| The rfid is already used by another SKUItem, the date format is not valid, the availability is negative, there is no SKUItem with rfid=*oldrfid*||
|Absent|Not use | Positive| Valid |Invalid| The rfid is not already used by another SKUItem, it is a valid modification, there is no SKUItem with rfid=*oldrfid*||
|Absent|Not in use | Positive| Invalid |Invalid| The date format is not valid, there is no SKUItem with rfid=*oldrfid*||
|Absent|Not in use | Negative| Valid |Invalid| The availability is negative, there is no SKUItem with rfid=*oldrfid*||
|Absent|Not in use | Negative| Invalid |Invalid| The date format is not valid, the availability is negative, there is no SKUItem with rfid=*oldrfid*||

## **Class *skuItemController* - method *deleteSkuItem***

The input value is the SkuItemid.

**Criteria for method *deleteSkuItem*:**
	
 - Validity of *SKUItemid*




**Predicates for method *deleteSkuItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *SKUItemid*      |     There is no SKU Item with the specified *SKUItemid* in the database      |
|          |     There is a SKU Item with the specified *SKUItemid* in the database     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Validity of *SKUItemid*      |     No boundary found      |



**Combination of predicates**:


| Criteria 1 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Present |  Valid | There is a SKU Item with the chosen *SKUItemid*||
| Absent  | Invalid | There is no SKU Item with the chosen *SKUItemid*|| 


## **Class *positionController* - method *createPosition***

The input value is the body of the HTTP POST Request.

**Criteria for method *createPosition*:**
	
 - Usage of *positionid*
 - Sign of *maxWeight*
 - Sign of *maxVolume*
 - Format of *aisle*
 - Format of *row*
 - Format of *colummn*





**Predicates for method *createPosition*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Usage of *positionid*      |     There is no position with the specified *positionid* in the database      |
|          |     There is a position with the specified *positionid* in the database     |
|     Sign of *maxWeight*     |     Sign is positive      |
|          |    Sign is negative     |
|     Sign of *maxVolume*     |     Sign is positive      |
|          |    Sign is negative     |
|     Format of *row*     |     It is a string of 4 digits      |
|          |    It is not a string of 4 digits     |
|     Format of *aisle*     |     It is a string of 4 digits      |
|          |    It is not a string of 4 digits     |
|     Format of *column*     |     It is a string of 4 digits      |
|          |    It is not a string of 4 digits     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Usage of *positionid*      |     No boundary found     |
|     Sign of *maxWeight*     |    0      |
|     Sign of *maxVolume*     |     0      |
|     Format of *row*     |     No boundary found       |
|     Format of *aisle*     |     No boundary found      |
|     Format of *column*     |     No boundary found       |



**Combination of predicates**:


| Criteria 1 | Criteria 2| Criteria 3| Criteria 4 | Criteria 5| Criteria 6| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| Present | Positive| Positive| Valid | Valid| Valid| Invalid | There is a position with the chosen *positionid*||
| Present | Positive| Positive| Valid | Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong||
| Present | Positive| Positive| Valid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong||
| Present | Positive| Positive| Valid | Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong||
| Present | Positive| Positive| Invalid | Valid| Valid| Invalid | There is a position with the chosen *positionid*, the format of row is wrong||
| Present | Positive| Positive| Invalid| Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of row is wrong||
| Present | Positive| Positive| Invalid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong, the format of row is wrong||
| Present | Positive| Positive| Invalid| Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong, the format of row is wrong||
| Present | Positive| Negative| Valid | Valid| Valid| Invalid | There is a position with the chosen *positionid*, the sign of *maxVolume* is negative||
| Present | Positive| Negative| Valid | Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the sign of *maxVolume* is negative||
| Present | Positive| Negative| Valid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong, the sign of *maxVolume* is negative||
| Present | Positive| Negative| Valid | Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong, the sign of *maxVolume* is negative||
| Present | Positive| Negative| Invalid | Valid| Valid| Invalid | There is a position with the chosen *positionid*, the format of row is wrong, the sign of *maxVolume* is negative||
| Present | Positive| Negative| Invalid| Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of row is wrong, the sign of *maxVolume* is negative||
| Present | Positive| Negative| Invalid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative||
| Present | Positive| Negative| Invalid| Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative||
| Present | Negative| Positive| Valid | Valid| Valid| Invalid | There is a position with the chosen *positionid*, the sign of *maxWeight* is negative||
| Present | Negative| Positive| Valid | Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the sign of *maxWeight* is negative||
| Present | Negative| Positive| Valid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong, the sign of *maxWeight* is negative||
| Present | Negative| Positive| Valid | Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong, the sign of *maxWeight* is negative||
| Present | Negative| Positive| Invalid | Valid| Valid| Invalid | There is a position with the chosen *positionid*, the format of row is wrong, the sign of *maxWeight* is negative||
| Present | Negative| Positive| Invalid| Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of row is wrong, the sign of *maxWeight* is negative||
| Present | Negative| Positive| Invalid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong, the format of row is wrong, the sign of *maxWeight* is negative||
| Present | Negative| Positive| Invalid| Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong, the format of row is wrong, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Valid | Valid| Valid| Invalid | There is a position with the chosen *positionid*, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Valid | Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Valid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Valid | Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Invalid | Valid| Valid| Invalid | There is a position with the chosen *positionid*, the format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Invalid| Valid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Invalid | Invalid| Valid| Invalid | There is a position with the chosen *positionid*, the format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Present | Negative| Negative| Invalid| Invalid| Invalid| Invalid | There is a position with the chosen *positionid*, the format of column is wrong, the format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent | Positive| Positive| Valid | Valid| Valid| Valid | This is the only valid combination||
| Absent  | Positive| Positive| Valid | Valid| Invalid| Invalid | The format of column is wrong||
| Absent  | Positive| Positive| Valid | Invalid| Valid| Invalid | The format of aisle is wrong||
| Absent | Positive| Positive| Valid | Invalid| Invalid| Invalid | The format of column is wrong, the format of aisle is wrong||
| Absent  | Positive| Positive| Invalid | Valid| Valid| Invalid | The format of row is wrong||
| Absent  | Positive| Positive| Invalid| Valid| Invalid| Invalid | The format of column is wrong, the format of row is wrong||
| Absent  | Positive| Positive| Invalid | Invalid| Valid| Invalid | The format of aisle is wrong, the format of row is wrong||
| Absent  | Positive| Positive| Invalid| Invalid| Invalid| Invalid | The format of column is wrong, the format of aisle is wrong, the format of row is wrong||
| Absent  | Positive| Negative| Valid | Valid| Valid| Invalid | The sign of *maxVolume* is negative||
| Absent  | Positive| Negative| Valid | Valid| Invalid| Invalid | The format of column is wrong, the sign of *maxVolume* is negative||
| Absent  | Positive| Negative| Valid | Invalid| Valid| Invalid | The format of aisle is wrong, the sign of *maxVolume* is negative||
| Absent  | Positive| Negative| Valid | Invalid| Invalid| Invalid | The format of aisle is wrong, the sign of *maxVolume* is negative||
| Absent  | Positive| Negative| Invalid | Valid| Valid| Invalid | The format of row is wrong, the sign of *maxVolume* is negative||
| Absent  | Positive| Negative| Invalid| Valid| Invalid| Invalid | The format of column is wrong, the format of row is wrong, the sign of *maxVolume* is negative||
| Absent  | Positive| Negative| Invalid | Invalid| Valid| Invalid | The format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative||
| Absent  | Positive| Negative| Invalid| Invalid| Invalid| Invalid | The format of column is wrong, the format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative||
| Absent  | Negative| Positive| Valid | Valid| Valid| Invalid | The sign of *maxWeight* is negative||
| Absent  | Negative| Positive| Valid | Valid| Invalid| Invalid | The format of column is wrong, the sign of *maxWeight* is negative||
| Absent  | Negative| Positive| Valid | Invalid| Valid| Invalid | The format of aisle is wrong, the sign of *maxWeight* is negative||
| Absent  | Negative| Positive| Valid | Invalid| Invalid| Invalid | The format of column is wrong, the format of aisle is wrong, the sign of *maxWeight* is negative||
| Absent  | Negative| Positive| Invalid | Valid| Valid| Invalid | The format of row is wrong, the sign of *maxWeight* is negative||
| Absent  | Negative| Positive| Invalid| Valid| Invalid| Invalid | The format of column is wrong, the format of row is wrong, the sign of *maxWeight* is negative||
| Absent  | Negative| Positive| Invalid | Invalid| Valid| Invalid | The format of aisle is wrong, the format of row is wrong, the sign of *maxWeight* is negative||
| Absent | Negative| Positive| Invalid| Invalid| Invalid| Invalid | The format of column is wrong, the format of aisle is wrong, the format of row is wrong, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Valid | Valid| Valid| Invalid | The sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Valid | Valid| Invalid| Invalid | The format of column is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Valid | Invalid| Valid| Invalid | The format of aisle is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Valid | Invalid| Invalid| Invalid | The format of column is wrong, the format of aisle is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Invalid | Valid| Valid| Invalid | The format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Invalid| Valid| Invalid| Invalid | The format of column is wrong, the format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Invalid | Invalid| Valid| Invalid | The format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||
| Absent  | Negative| Negative| Invalid| Invalid| Invalid| Invalid | The format of column is wrong, the format of aisle is wrong, the format of row is wrong, the sign of *maxVolume* is negative, the sign of *maxWeight* is negative||


## **Class *positionController* - method *editPosition***

The input value is the body of the HTTP PUT Request and the positionid.

**Criteria for method *editPosition*:**
	
 - Validity of *positionid*
 - Sign of *newmaxWeight*
 - Sign of *newmaxVolume*
 - Sign of *newoccupiedWeight*
 - Sign of *newoccupiedVolume*
 - Sign of *newmaxWeight-newoccupiedWeight*
 - Sign of *newmaxVolume-newoccupiedVolume*
 - Format of *newaisle*
 - Format of *newrow*
 - Format of *newcolummn*





**Predicates for method *editPosition*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *positionid*      |     There is no position with the specified *positionid* in the database      |
|          |     There is a position with the specified *positionid* in the database     |
|     Sign of *newmaxWeight*     |     Sign is positive      |
|          |    Sign is negative     |
|     Sign of *newmaxVolume*     |     Sign is positive      |
|          |    Sign is negative     |
|     Sign of *newoccupiedWeight*     |     Sign is positive      |
|          |    Sign is negative     |
|     Sign of *newoccupiedVolume*     |     Sign is positive      |
|          |    Sign is negative     |
|     Sign of *newmaxWeight-newoccupiedWeight*     |     Sign is positive      |
|          |    Sign is negative     |
|     Sign of *newmaxVolume-newoccupiedVolume*     |     Sign is positive      |
|          |    Sign is negative     |
|     Format of *newrow*     |     It is a string of 4 digits      |
|          |    It is not a string of 4 digits     |
|     Format of *newaisle*     |     It is a string of 4 digits      |
|          |    It is not a string of 4 digits     |
|     Format of *newcolumn*     |     It is a string of 4 digits      |
|          |    It is not a string of 4 digits     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *positionid*      |     No boundary found     |
|     Sign of *newmaxWeight*     |    0      |
|     Sign of *newmaxVolume*     |     0      |
|     Sign of *newoccupiedWeight*     |    0      |
|     Sign of *newoccupiedVolume*     |     0      |
|     Sign of *newmaxWeight-newoccupiedWeight*     |    0      |
|     Sign of *newmaxVolume-newoccupiedVolume*     |     0      |
|     Format of *newrow*     |     No boundary found       |
|     Format of *newaisle*     |    No boundary found       |
|     Format of *newcolumn*     |     No boundary found       |




**Combination of predicates**:


| Criteria 1 | Criteria 2| Criteria 3|  Criteria 4 | Criteria 5| Criteria 5| Criteria 7 | Criteria 8|Criteria 9 | Criteria 10| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|

THE COMBINATIONS ARE OMITTED BECAUSE OF THEIR HUGE NUMBER

## **Class *positionController* - method *editPositionId***

The input value is the body of the HTTP PUT Request and the positionid.

**Criteria for method *editPositionId*:**
	
 - Validity of *positionid*
 - Usage of *newpositionid*





**Predicates for method *editPositionId*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *positionid*      |     There is no position with the specified *positionid* in the database      |
|          |     There is a position with the specified *positionid* in the database     |
|    Usage of *newpositionid*      |     There is no position with the specified *positionid* in the database      |
|          |     There is a position with the specified *positionid* in the database     |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *positionid*      |     No boundary found     |
|    Usage of *newpositionid*      |     No boundary found     |




**Combination of predicates**:


| Criteria 1 | Criteria 2|  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Present| Invalid| There is already a position with *newpositionid*||
| Valid| Absent| Valid| There is no position with *newpositionid*, we can change the id||
| Invalid| Present| Invalid| There is already a position with *newpositionid*, there is no position with such *positionid*||
| Invalid| Absent| Invalid| There is no position with such *positionid*||


## **Class *positionController* - method *deletePosition***

The input value is the positionid.

**Criteria for method *deletePosition*:**
	
 - Validity of *positionid*





**Predicates for method *deletePosition*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *positionid*      |     There is no position with the specified *positionid* in the database      |
|          |     There is a position with the specified *positionid* in the database     |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *positionid*      |     No boundary found     |



**Combination of predicates**:


| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no position with *positionid*||
| Valid| Valid| There is a position with *positionid*||

## **Class *TestDescriptorController* - method *getTestDescriptor***

The input value is the test id.

**Criteria for method *getTestDescriptor*:**
	
 - Validity of *id*





**Predicates for method *getTestDescriptor*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*      |     There is no test descriptor with the specified *id* in the database      |
|          |     There is a test descriptor with the specified *id* in the database     |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id*      |     No boundary found     |



**Combination of predicates**:


| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no test descriptor with *id*||
| Valid| Valid| There is a test descriptor with *id*||

## **Class *TestDescriptorController* - method *createTestDescriptor***

The input value is the body of the HTTP POST request.

**Criteria for method *createTestDescriptor*:**
	
 - Validity of *idSKU*





**Predicates for method *createTestDescriptor*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *idSKU*      |     There is a SKU with the specified *idSKU* in the database      |
|          |     There is a SKU with the specified *idSKU* in the database     |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *idSKU*      |     No boundary found     |



**Combination of predicates**:


| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no SKU with *idSKU*||
| Valid| Valid| There is a SKU with *idSKU*||

## **Class *TestDescriptorController* - method *editTestDescriptor***

The input value is the body of the HTTP PUT request and the test id.

**Criteria for method *createTestDescriptor*:**
	
 - Validity of *newidSKU*
- Validity of *id*





**Predicates for method *createTestDescriptor*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *newidSKU*      |     There is a SKU with the specified *newidSKU* in the database      |
|          |     There is a SKU with the specified *newidSKU* in the database     |
|    Validity of *id*      |     There is no test descriptor with the specified *id* in the database      |
|          |     There is a test descriptor with the specified *id* in the database     |



**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *idSKU*      |     No boundary found     |
|    Validity of *id*      |     No boundary found     |


**Combination of predicates**:


| Criteria 1 | Criteria 2|  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid|  Valid| There is a SKU with *idSKU*, the test id is valid||
| Valid| Invalid|  Invalid| There is no SKU with *idSKU*||
| Invalid| Valid|  Invalid| There is no test with such id||
| Invalid| Invalid|  Invalid| There is no SKU with *idSKU*, there is no test with such id||

## **Class *TestDescriptorController* - method *deleteTestDescriptor***

The input value is the id.

**Criteria for method *deleteTestDescriptor*:**
	
 - Validity of *id*





**Predicates for method *deleteTestDescriptor*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*      |     There is no test descriptor with the specified *id* in the database      |
|          |     There is a test descriptor with the specified *id* in the database     |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id*      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no test descriptor with *id*||
| Valid| Valid| There is a test descriptor with *id||

## **Class *TestResultController* - method *getTestResults***

The input value is the rfid.

**Criteria for method *getTestResults*:**
	
 - Validity of *rfid*





**Predicates for method *getTestResults*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *rfid*      |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU item with the specified *rfid* in the database     |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *rfid*      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no SKU item with *rfid*||
| Valid| Valid| There is a SKU item with *rfid*||

## **Class *TestResultController* - method *getTestResult***

The input value is the rfid and the id of a test result.

**Criteria for method *getTestResult*:**
	
 - Validity of *rfid*
 - - Validity of *id*



**Predicates for method *getTestResult*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *rfid*      |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU item with the specified *rfid* in the database     |
|    Validity of *id*      |     There is no test result with the chosen *id* for the SKU item with the specified *rfid* in the database      |
|          |     There is a test result with the chosen *id* for the SKU item with the specified *rfid* in the database     |


**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *rfid*      |     No boundary found     |
|    Validity of *id*      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid| Valid| There is a SKU item with *rfid* and there is a test result with the specified *id*||
| Valid| Invalid| Invalid| There is no test result with the specified *id*||
| Invalid| Valid| Invalid| There is no SKU item with *rfid* ||
| Invalid| Invalid| Invalid| There is no test result with the specified *id*, there is no SKU item with *rfid*||

## **Class *TestResultController* - method *createTestResult***

The input value is the body of the HTTP POST Request.

**Criteria for method *createTestResult*:**
	
 - Validity of *rfid*
 - - Validity of *descriptorid*



**Predicates for method *createTestResult*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *rfid*      |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU item with the specified *rfid* in the database     |
|    Validity of *descriptorid*     |     There is no test descriptor with the chosen *descriptorid* |
|          |     There is a test descriptor with the chosen *descriptorid*|


**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *rfid*      |     No boundary found     |
|    Validity of *descriptorid*      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid| Valid| There is a SKU item with *rfid* and there is a test descriptor with the specified *descriptorid*||
| Valid| Invalid| Invalid| There is no test descriptor with the specified *descriptorid*||
| Invalid| Valid| Invalid| There is no SKU item with *rfid* ||
| Invalid| Invalid| Invalid| There is no test descriptor with the specified *descriptorid*, there is no SKU item with *rfid*||

## **Class *TestResultController* - method *editTestResult***

The input value is the rfid, the id of the test descriptor and the body of the HTTP PUT Request.

**Criteria for method *editTestResult*:**
	
 - Validity of *rfid*
-  Validity of *newdescriptorid*
 - Validity of *id*




**Predicates for method *editTestResult*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *rfid*      |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU item with the specified *rfid* in the database     |
|    Validity of *newdescriptorid*     |     There is no test descriptor with the chosen *newdescriptorid*|
|          |     There is a test descriptor with the chosen *newdescriptorid*|
|    Validity of *id*     |     There is no test result with the chosen *id* for the SKU item with the specified *rfid* in the database      |
|          |     There is a test result with the chosen *id* for the SKU item with the specified *rfid* in the database     |

**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *rfid*      |     No boundary found     |
|    Validity of *descriptorid*      |     No boundary found     |
|    Validity of *id*      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2 | Criteria 3| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid| Valid| Valid| There is a SKU item with *rfid*,there is a test descriptor with the specified *newdescriptorid* and there is a test result with the chosen *id*||
| Valid| Valid| Invalid| Invalid| There is no test result with the chosen *id* for the chosen SKUItem||
| Valid| Invalid| Valid| Invalid| There is no test descrptor with the chosen *newdescriptorid*||
| Valid| Invalid| Invalid| Invalid| There is no test result with the chosen *id* for the chosen SKUItem, there is no test descrptor with the chosen *newdescriptorid* ||
| Invalid| Valid| Valid| Invalid| There is no SKU item with *rfid*||
| Invalid| Valid| Invalid| Invalid| There is no SKU item with *rfid*||
| Invalid| Invalid| Valid| Invalid| There is no SKU item with *rfid*, there is no test descrptor with the chosen *newdescriptorid*||
| Invalid| Invalid| Invalid| Invalid| There is no SKU item with *rfid*, there is no test descrptor with the chosen *newdescriptorid* ||

## **Class *TestResultController* - method *deleteTestResult***

The input value is the rfid and the id of a test result.

**Criteria for method *deleteTestResult*:**
	
 - Validity of *rfid*
 - - Validity of *id*



**Predicates for method *deleteTestResult*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *rfid*      |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU item with the specified *rfid* in the database     |
|    Validity of *id*      |     There is no test result with the chosen *id* for the SKU item with the specified *rfid* in the database      |
|          |     There is a test result with the chosen *id* for the SKU item with the specified *rfid* in the database     |


**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *rfid*      |     No boundary found     |
|    Validity of *id*      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid| Valid| There is a SKU item with *rfid* and there is a test result with the specified *id*||
| Valid| Invalid| Invalid| There is no test result with the specified *id*||
| Invalid| Valid| Invalid| There is no SKU item with *rfid* ||
| Invalid| Invalid| Invalid| There is no test result with the specified *id*, there is no SKU item with *rfid*||

## **Class *UserController* - method *createUser***

The input value is the body of the HTTP POST Request

**Criteria for method *createUser*:**
	
 - Combination of *type* and *username*
 - Length of *password*
 - Username format
 - Type validity


**Predicates for method *createUser*:**

| Criteria | Predicate |
| :--------: | :---------: |
|  Combination of *type* and *username* |     No user with the same *type* and *username* exists     |
|          |     There is an user with the same *type* and *username* |
|    Length of *password*     |     Password is less then 8 char long      |
|          |     Password is longer or equal to 8 char     |
| Username format | The username is an email|
|| The username is not an email|
|Type validity| The type is one of them: customer, qualityEmployee, clerk, deliveryEmployee, supplier|
|| The type is not a valid one|


**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Combination of *type* and *username*      |     No boundary found     |
|    Length of *password*     |     8     |
| Username format |No boundary found  |
|Type validity| No boundary found |


**Combination of predicates**:

| Criteria 1 | Criteria 2 |Criteria 3 | Criteria 4 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|-------:|:-------:|
| Present| Valid| Valid| Valid| Invalid| There is an user with the same *type* and *username*||
| Present| Valid| Valid|Invalid| Invalid| There is an user with the same *type* and *username*, the type format is invalid ||
| Present| Valid| Invalid| Valid| Invalid| There is an user with the same *type* and *username*, the email format is invalid||
| Present| Valid| Invalid|Invalid| Invalid| There is an user with the same *type* and *username*, the type format is invalid, the email format is invalid ||
| Present| Invalid| Valid| Valid| Invalid| There is an user with the same *type* and *username*, the password is shorter than 8 char||
| Present| Invalid| Valid|Invalid| Invalid| There is an user with the same *type* and *username*, the type format is invalid, the password is shorter than 8 char ||
| Present| Invalid| Invalid| Valid| Invalid| There is an user with the same *type* and *username*, the email format is invalid, the password is shorter than 8 char||
| Present| Invalid| Invalid|Invalid| Invalid| There is an user with the same *type* and *username*, the type format is invalid, the email format is invalid, , the password is shorter than 8 char||
| Absent| Valid| Valid| Valid| Valid| All the inserted values are ok, there is no user with the same *type* and *username*||
| Absent| Valid| Valid|Invalid| Invalid| The type format is invalid ||
| Absent| Valid| Invalid| Valid| Invalid| The email format is invalid||
| Absent| Valid| Invalid|Invalid| Invalid| The type format is invalid, the email format is invalid ||
| Absent| Invalid| Valid| Valid| Invalid| The password is shorter than 8 char||
| Absent| Invalid| Valid|Invalid| Invalid| The type format is invalid, the password is shorter than 8 char ||
| Absent| Invalid| Invalid| Valid| Invalid| The email format is invalid, the password is shorter than 8 char||
| Absent| Invalid| Invalid|Invalid| Invalid| The type format is invalid, the email format is invalid, , the password is shorter than 8 char||

## **Class *UserController* - method *login***

The input value is the body of the HTTP POST Request and the type

**Criteria for method *login*:**
	
 - Validity of *password* and *username*
 /* IF THE USERNAME EXISTS, IT ALREADY IS A VALID ONE
 - Format of *username*
*/

**Predicates for method *login*:**

| Criteria | Predicate |
| :--------: | :---------: |
|  Validity of *password* and *username* |     The username with *username* exists, the password is valid for the chosen username      |
|          |     The username with *username* doesn't exist, if he exists the password is not valid for the chosen username|


**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *password* and *username*      |     No boundary found     |



**Combination of predicates**:

| Criteria 1 |Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid| The combination of *username and password* is valid||
| Valid| Invalid| The combination of *username and password* is not valid||

## **Class *UserController* - method *editUser***

The input value is the body of the HTTP POST Request and the username

**Criteria for method *editUser*:**
	
 - Validity of *username* and consistence of *oldType*
 - Validity of *newType*
 /* IF THE USERNAME EXISTS, IT ALREADY IS A VALID ONE
 - Format of *username*
*/

**Predicates for method *editUser*:**

| Criteria | Predicate |
| :--------: | :---------: |
|  Validity *username* and consistence of *oldType* |     The user with *username* exists and the *oldType* corresponds to the type of the user before the API execution   |
|          |     The user with *username* doesn't exist, or the user with *username* exists but the *oldType* doesn't correspond to the type of the user before the API execution |
|  Validity of *newType* || The type is one of them: customer, qualityEmployee, clerk, deliveryEmployee, supplier|
|| The type is not a valid one|


**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *username* and consistence of *oldType*     |     No boundary found     |
|    Validity of *newType*      |     No boundary found     |


**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid |Valid| The user with *username* exists and the *oldType* corresponds to the type of the user before the API execution, the *newType* is a valid one||
| Valid| Invalid |Invalid| The *newType* is an invalid one||
| Invalid| Valid |Invalid| The user with *username* doesn't exist, or the user with *username* exists but the *oldType* doesn't correspond to the type of the user before the API execution ||
| Invalid| Invalid |Invalid| The *newType* is an invalid one, the user with *username* doesn't exist, or the user with *username* exists but the *oldType* doesn't correspond to the type of the user before the API execution ||

## **Class *UserController* - method *deleteUser***

The input value the username and the type

**Criteria for method *deleteUser*:**
	
 - Validity of *username* 
 - Validity of *type*
 /* IF THE USERNAME EXISTS, IT ALREADY IS A VALID ONE
 - Format of *username*
*/

**Predicates for method *deleteUser*:**

| Criteria | Predicate |
| :--------: | :---------: |
|  Validity *username* and consistence of *oldType* | The user with *username* exists and the *type* corresponds to the type of the user before the API execution   |
|          |     The user with *username* doesn't exist, or the user with *username* exists but the *type* doesn't correspond to the type of the user before the API execution |  |
|  Validity of *type* || The type is one of them: customer, qualityEmployee, clerk, deliveryEmployee|
|| The type is not a valid one|


**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *username* and consistence of *type*   |     No boundary found     |
|    Validity of *type*      |     No boundary found     |


**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Valid |Valid| The user with *username* exists and the *type* corresponds to the type of the user before the API execution, the *type* is a valid one||
| Valid| Invalid |Invalid| The *type* is an invalid one||
| Invalid| Valid |Invalid| The user with *username* doesn't exist, or the user with *username* exists but the *type* doesn't correspond to the type of the user before the API execution ||
| Invalid| Invalid |Invalid| The *type* is an invalid one, the user with *username* doesn't exist, or the user with *username* exists but the *type* doesn't correspond to the type of the user before the API execution ||

## **Class *RestockOrderController* - method *getRestockOrder***

The input value is the order id.

**Criteria for method *getRestockOrder*:**
	
 - Validity of *id*





**Predicates for method *getRestockOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*      |     There is no restock order with the given *id* in the database    |
|          |     There is a restock order with the given *id* in the database     |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id*      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no restock order with the given *id* in the database||
| Valid| Valid| There is a restock order with the given *id* in the database||

## **Class *RestockOrderController* - method *getRestockOrderToBeReturned***

The input value is the order id.

**Criteria for method *getRestockOrderToBeReturned*:**
	
 - Validity of *id* and of the order status





**Predicates for method *getRestockOrderToBeReturned*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id* and of the order status    |     There is no restock order with the given *id* in the database, if there is the restock order its status is COMPLETEDRETURN    |
|          |     There is a restock order with the given *id* in the database and the status is different from COMPLETEDRETURN    |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* and of the order status      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no restock order with the given *id* in the database, if there is the restock order its status is COMPLETEDRETURN    ||
| Valid| Valid|  There is a restock order with the given *id* in the database and the status is different from COMPLETEDRETURN||

## **Class *RestockOrderController* - method *createRestockOrder***

The input value is the body of the HTTP POST Request

**Criteria for method *createRestockOrder*:**
	
 - Validity of *supplierid*
 - Validity of product list 





**Predicates for method *createRestockOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *supplierid* |     There is no supplier order with the given *supplierid* in the database|
|          |    There is a supplier order with the given *supplierid* in the database|
|    Validity of product list |     All the products are associated to a SKU with and existing SKUID in the database|
|          |    At least one of the products is not associated to a SKU with and existing SKUID in the database|




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *supplierid* |     No boundary found     |
|    Validity of product list |     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid|Valid| Valid| There is a supplier order with the given *supplierid* in the database and all the products are associated to a SKU with and existing SKUID in the database  ||
| Valid|Invalid| Invalid| At least one of the products is not associated to a SKU with and existing SKUID in the database ||
| Invalid|Valid| Invalid| There is no supplier order with the given *supplierid* in the database ||
| Invalid|Invalid| Invalid| At least one of the products is not associated to a SKU with and existing SKUID in the database, there is no supplier order with the given *supplierid* in the database ||

## **Class *RestockOrderController* - method *editRestockOrder***

The input value is the order id and the body of the HTTP PUT Request.

**Criteria for method *editRestockOrder*:**
	
 - Validity of *id* and of the order status





**Predicates for method *editRestockOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id* and of the order status    |     There is no restock order with the given *id* in the database, if there is the restock order its status is not a valid one |
|          |     There is a restock order with the given *id* in the database and the status is a valid one   |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* and of the order status      |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no restock order with the given *id* in the database, if there is the restock order its status is not a valid one   ||
| Valid| Valid|  There is a restock order with the given *id* in the database and the status is a valid one||

## **Class *RestockOrderController* - method *addSkuItemsToRestockOrder***

The input value is the body of the HTTP PUT Request and the order id.

**Criteria for method *addSkuItemsToRestockOrder*:**
	
 - Validity of *id* and of the order status 
 - Validity of product list 





**Predicates for method *addSkuItemsToRestockOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id* and of the order status    |     There is no restock order with the given *id* in the database, if there is the restock order its status is different from DELIVERED    |
|          |     There is a restock order with the given *id* in the database and the status is equal to DELIVERED    |
|    Validity of product list |     All the products are associated to a SKUItem with and existing RFID in the database|
|          |    At least one of the products is not associated to a SKUItem with and existing RFID in the database|




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* and of the order status  |     No boundary found     |
|    Validity of product list |     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid|Valid| Valid| There is a restock order with the given *id* in the database, the status is equal to DELIVERED and all the products are associated to a SKUItem with and existing RFID in the database  ||
| Valid|Invalid| Invalid|  At least one of the products is not associated to a SKUItem with and existing RFID in the database||
| Invalid|Valid| Invalid| There is no restock order with the given *id* in the database, if there is the restock order its status is different from DELIVERED ||
| Invalid|Invalid| Invalid|  At least one of the products is not associated to a SKUItem with and existing RFID in the database, There is no restock order with the given *id* in the database, if there is the restock order its status is different from DELIVERED||

## **Class *RestockOrderController* - method * addTransportNote***

The input value is the body of the HTTP PUT Request and the order id.

**Criteria for method * addTransportNote*:**
	
 - Validity of *id* and of the order status 
 - Relationship between deliveryDate and issueDate





**Predicates for method * addTransportNote*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id* and of the order status    |     There is no restock order with the given *id* in the database, if there is the restock order its status is different from DELIVERY    |
|          |     There is a restock order with the given *id* in the database and the status is equal to DELIVERY    |
|   Relationship between deliveryDate and issueDate |     issueDate is before deliveryDate|
|          |    issueDate is after deliveryDate|




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* and of the order status  |     No boundary found     |
|   Relationship between deliveryDate and issueDate|     deliveryDate=issueDate     |

**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid|Valid| Valid| There is a restock order with the given *id* in the database, the status is equal to DELIVERY and issueDate is before deliveryDate||
| Valid|Invalid| Invalid| issueDate is after deliveryDate||
| Invalid|Valid| Invalid| There is no restock order with the given *id* in the database, if there is the restock order its status is different from DELIVERY ||
| Invalid|Invalid| Invalid| issueDate is after deliveryDate, There is no restock order with the given *id* in the database, if there is the restock order its status is different from DELIVERY||

## **Class *RestockOrderController* - method *deleteRestockOrder***

The input value is the order id.

**Criteria for method *deleteRestockOrder*:**
	
 - Validity of *id*





**Predicates for method *deleteRestockOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no restock order with the given *id* in the database|
|          |     There is a restock order with the given *id* |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no restock order with the given *id* in the database||
| Valid| Valid|  There is a restock order with the given *id* in the database ||

## **Class *ReturnOrderController* - method *getReturnOrder***

The input value is the order id.

**Criteria for method *getReturnOrder*:**
	
 - Validity of *id*





**Predicates for method *getReturnOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no return order with the given *id* in the database|
|          |     There is a return order with the given *id* |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no return order with the given *id* in the database||
| Valid| Valid|  There is a return order with the given *id* in the database ||

## **Class *ReturnOrderController* - method *createReturnOrder***

The input value is the body of the HTTP POST Request

**Criteria for method *createReturnOrder*:**
	
 - Validity of *restockOrderid*
 - Validity of product list 





**Predicates for method *createReturnOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *restockOrderid* |     There is no restock order with the given *restockOrderid* in the database|
|          |    There is a restock order with the given *restockOrderid* in the database|
|    Validity of product list |     All the products are associated to a SKU with and existing SKUID in the database|
|          |    At least one of the products is not associated to a SKU with and existing SKUID in the database|

**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *restockOrderid* |     No boundary found     |
|    Validity of product list|     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|-------:|
| Valid|Valid| Valid| There is a restock order with the given *restockOrderid* in the database and all the products are associated to a SKU with and existing SKUID in the database  ||
| Valid|Invalid| Invalid| At least one of the products is not associated to a SKU with and existing SKUID in the database ||
| Invalid|Valid| Invalid| There is no restock order with the given *restockOrderid* in the database ||
| Invalid|Invalid| Invalid| At least one of the products is not associated to a SKU with and existing SKUID in the database, there is no restock order with the given *restockOrderid* in the database ||

## **Class *ReturnOrderController* - method *deleteReturnOrder***

The input value is the order id.

**Criteria for method *deleteReturnOrder*:**
	
 - Validity of *id*



**Predicates for method *deleteReturnOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no return order with the given *id* in the database|
|          |     There is a return order with the given *id* |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no return order with the given *id* in the database||
| Valid| Valid|  There is a return order with the given *id* in the database ||


## **Class *InternalOrderController* - method *getInternalOrder***

The input value is the order id.

**Criteria for method *getInternalOrder*:**
	
 - Validity of *id*





**Predicates for method *getInternalOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no internal order with the given *id* in the database|
|          |     There is a internal order with the given *id* |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no internal order with the given *id* in the database||
| Valid| Valid|  There is a internal order with the given *id* in the database ||

## **Class *InternalOrderController* - method *createInternalOrder***

The input value is the body of the HTTP POST Request

**Criteria for method *createInternalOrder*:**
	
 - Validity of *customerid*
 - Validity of product list 





**Predicates for method *createInternalOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *customerid* |     There is no customer with the given *customerid* in the database|
|          |    There is a customer with the given *customerid* in the database|
|    Validity of product list |     All the products are associated to a SKU with an existing SKUID in the database|
|          |    At least one of the products is not associated to a SKU with an existing SKUID in the database|

**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *customerid* |     No boundary found     |
|    Validity of product list|     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|-------:|
| Valid|Valid| Valid| There is a customer with the given *customerid* in the database and all the products are associated to a SKU with and existing SKUID in the database  ||
| Valid|Invalid| Invalid| At least one of the products is not associated to a SKU with and existing SKUID in the database ||
| Invalid|Valid| Invalid| There is no customer with the given *customerid* in the database ||
| Invalid|Invalid| Invalid| At least one of the products is not associated to a SKU with and existing SKUID in the database, there is no customer with the given *customerid* in the database ||

## **Class *InternalOrderController* - method *editInternalOrder***

The input value is the body of the HTTP PUT Request and the order id

**Criteria for method *editInternalOrder*:**
	
 - Validity of *id*
 - Validity and consistency of product list 





**Predicates for method *editInternalOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id* |     There is no order with the given *id* in the database|
|          |    There is a order with the given *id* in the database|
|    Validity and consistency of product list |     All the products are associated to a SKUItem with and existing RFID in the database, the new state must be COMPLETED|
|          |    At least one of the products is not associated to a SKUItem with and existing RFID in the database and/or the new state is not COMPLETED|

**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |
|    Validity and consistency of product list|     No boundary found     |

**Combination of predicates**:

| Criteria 1 | Criteria 2| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|-------:|
| Valid|Valid| Valid| There is a order with the given *id* in the database,All the products are associated to a SKUItem with and existing RFID in the database and the new state must be COMPLETED ||
| Valid|Invalid| Invalid| At least one of the products is not associated to a SKUItem with and existing RFID in the database and/or the new state is not COMPLETED ||
| Invalid|Valid| Invalid| There is no order with the given *id* in the database ||
| Invalid|Invalid| Invalid| At least one of the products is not associated to a SKUItem with and existing RFID in the database and/or the new state is not COMPLETED, there is no order with the given *id* in the database ||

## **Class *InternalOrderController* - method *deleteInternalOrder***

The input value is the order id.

**Criteria for method *deleteInternalOrder*:**
	
 - Validity of *id*



**Predicates for method *deleteInternalOrder*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no internal order with the given *id* in the database|
|          |     There is an internal order with the given *id* |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no internal order with the given *id* in the database||
| Valid| Valid|  There is an internal order with the given *id* in the database ||

## **Class *Item* - method *getItem***

The input value is the item id.

**Criteria for method *getItem*:**
	
 - Validity of *id*



**Predicates for method *getItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no item with the given *id* in the database|
|          |     There is an itemr with the given *id* |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no item with the given *id* in the database||
| Valid| Valid|  There is an item order with the given *id* in the database ||


## **Class *Item* - method *createItem***

The input value is the body of the HTTP POST Request.

**Criteria for method *createItem*:**
	
 - Price sign
 - Validity of SKUid per supplierId
 - Validity of id per supplierId
 - Validity of SKUid
 - Validity of supplierId



**Predicates for method *createItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Price sign |     Price is positive|
|          |     Price is negative |
|   Validity of SKUid per supplierId |     The supplier with the chosen supplierId already has an item with the same SKUid|
|          |     The supplier with the chosen supplierId doesn't have an item with the same SKUid|
|   Validity of id per supplierId |     The supplier with the chosen supplierId already has an item with the same id|
|          |     The supplier with the chosen supplierId doesn't have an item with the same id|
|   Validity of SKUid |     There is a SKU with the chosen SKUid in the database|
|          |     There is no SKU with the chosen SKUid in the database|
|   Validity of supplierId|     There is a supplier with the chosen supplierid in the database|
|          |     There is no supplier with the chosen supplierid in the database|



**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Price sign |     0|
|   Validity of SKUid per supplierId |     No boundary found |
|   Validity of id per supplierId |    No boundary found |
|   Validity of SKUid |      No boundary found |
|   Validity of supplierId|      No boundary found |


**Combination of predicates**:

| Criteria 1 | Criteria 2 | Criteria 3 | Criteria 4 | Criteria 5 |Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| Positive|  Valid|Valid|Valid|Valid|Valid| This is the only valid combination of predicates||
| Positive|  Valid|Valid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the database||
| Positive|  Valid|Valid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database||
| Positive|  Valid|Valid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database||
| Positive|  Valid|Invalid|Valid|Valid|Invalid| The supplier with the chosen supplierId already has an item with the same ids||
| Positive|  Valid|Invalid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the database||
| Positive|  Valid|Invalid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database, the supplier with the chosen supplierId already has an item with the same id||
| Positive|  Valid|Invalid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database||
| Positive|  Invalid|Valid|Valid|Valid|Invalid| The supplier with the chosen supplierId already has an item with the same SKUid||
| Positive| Invalid|Valid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the databased||
| Positive|  Invalid|Valid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database||
| Positive|  Invalid|Valid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database||
| Positive|Invalid|Invalid|Valid|Valid|Invalid| The supplier with the chosen supplierId already has an item with the same id, the supplier with the chosen supplierId already has an item with the same SKUid||
| Positive|Invalid|Invalid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the database||
| Positive|Invalid|Invalid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database, the supplier with the chosen supplierId already has an item with the same id||
| Positive|Invalid|Invalid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database||
| Negative|  Valid|Valid|Valid|Valid|Invalid| The price is negative||
| Negative|  Valid|Valid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the database, the price is negative||
| Negative|  Valid|Valid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database, the price is negative||
| Negative|  Valid|Valid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database, the price is negative||
| Negative|  Valid|Invalid|Valid|Valid|Invalid| The supplier with the chosen supplierId already has an item with the same id, the price is negative||
| Negative|  Valid|Invalid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the database, the price is negative||
| Negative|  Valid|Invalid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database, the supplier with the chosen supplierId already has an item with the same id, the price is negative||
| Negative|  Valid|Invalid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database, the price is negative||
| Negative|  Invalid|Valid|Valid|Valid|Invalid| The supplier with the chosen supplierId already has an item with the same SKUid, the price is negative||
| Negative| Invalid|Valid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the database, the price is negative||
| Negative|  Invalid|Valid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database, the price is negative||
| Negative|  Invalid|Valid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database, the price is negative||
| Negative|Invalid|Invalid|Valid|Valid|Invalid| The supplier with the chosen supplierId already has an item with the same id, the supplier with the chosen supplierId already has an item with the same SKUid, the price is negative||
| Negative|Invalid|Invalid|Valid|Invalid|Invalid| There is no supplier with the chosen supplierid in the database, the price is negative||
| Negative|Invalid|Invalid|Invalid|Valid|Invalid| There is no SKU with the chosen SKUid in the database, the supplier with the chosen supplierId already has an item with the same id, the price is negative||
| Negative|Invalid|Invalid|Invalid|Invalid|Invalid| There is no SKU with the chosen SKUid in the database, there is no supplier with the chosen supplierid in the database, the price is negative||

## **Class *Item* - method *editItem***

The input value is the item id and the body of the HTTP PUT Request

**Criteria for method *editItem*:**
	
 - Validity of *id*
 - Sign of price



**Predicates for method *editItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no item with the given *id* in the database|
|          |     There is an item with the given *id* |
|    Sign of price  |     Sign is positive|
|          |     Sign is negative |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |
|    Sign of price  |     0|

**Combination of predicates**:

| Criteria 1 |  Criteria 2 | Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid| Positive|Valid|  There is an item order with the given *id* in the database and the sign is positive ||
| Valid| Negative|Invalid|  The sign is negative ||
| Invalid| Positive|Invalid|  There is no item with the given *id* in the database ||
| Invalid| Negative|Invalid|  The sign is negative, there is no item with the given *id* in the database ||

## **Class *Item* - method *deleteItem***

The input value is the item id.

**Criteria for method *deleteItem*:**
	
 - Validity of *id*



**Predicates for method *deleteItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *id*  |     There is no item with the given *id* in the database|
|          |     There is an item with the given *id* |




**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *id* |     No boundary found     |

**Combination of predicates**:

| Criteria 1 |  Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|
| Invalid|  Invalid| There is no item with the given *id* in the database||
| Valid| Valid|  There is an item order with the given *id* in the database ||



# White Box Unit Tests

### Test cases definition
    
    
    <Report here all the created Jest test cases, and the units/classes under test >
    <For traceability write the class and method name that contains the test case>


| Unit name | Jest test case |
|--|--|
|||
|||
||||

### Code coverage report

    <Add here the screenshot report of the statement and branch coverage obtained using
    the coverage tool. >


### Loop coverage analysis

    <Identify significant loops in the units and reports the test cases
    developed to cover zero, one or multiple iterations >

|Unit name | Loop rows | Number of iterations | Jest test case |
|---|---|---|---|
|||||
|||||
||||||
