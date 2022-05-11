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
|   Sign of *weight*       |    *weight* is positive       |
|          |    *weight* is negative       |
|   Sign of *volume*       |    *volume* is positive       |
|          |    *volume* is negative       |
|   Sign of *availableQuantity*       |    *availableQuantity* is positive       |
|         |    *availableQuantity* is negative       |
|   Sign of *price*       |    *price* is positive       |
|          |    *price* is negative       |
|    Validity of *id*      |     There is no SKU with the specified *id* in the database      |
|         |     There is a SKU with the specified *id* in the database     |
|    Sign of *occupiedWeight-maxWeight*     |     *occupiedWeight-maxWeight* is negative      |
|          |     *occupiedWeight-maxWeight* is positive   |
|    Sign of *occupiedVolume-maxVolume*    |     *occupiedVolume-maxVolume*is negative      |
|        |     *occupiedVolume-maxVolume* is positive   |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|   Sign of *weight*       |    0      |
|   Sign of *volume*       |    0       |
|   Sign of *availableQuantity*       |    0      |
|   Sign of *price*       |    0       |
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
|    Validity of *position*      |     There is no SKU with the specified *position* in the database      |
|          |     There is a SKU with the specified *position* in the database     |
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
| Positive| Positive| Present | Present| Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume||
| Positive| Positive| Present | Absent | Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume, there is no position with such positionID in the database||
| Positive| Positive| Absent | Present| Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume, there is no SKU with such SKUID in the database||
| Positive| Positive| Absent | Absent | Invalid | The occupied weight exceeds the maxWeight, the occupied volume exceeds the maxVolume, there is no position with such positionID in the database, there is no SKU with such SKUID in the database||
| Positive| Negative| Present | Present| Invalid | The occupied weight exceeds the maxWeight||
| Positive| Negative| Present | Absent | Invalid | The occupied weight exceeds the maxWeight there is no position with such positionID in the database||
| Positive| Negative| Absent | Present| Invalid | The occupied weight exceeds the maxWeight, there is no SKU with such SKUID in the database||
| Positive| Negative| Absent | Absent | Invalid | The occupied weight exceeds the maxWeight, there is no position with such positionID in the database, there is no SKU with such SKUID in the database||


|  Negative| Positive| Present | Present| Invalid | The occupied volume exceeds the maxVolume||
|  Negative| Positive| Present | Absent | Invalid | The occupied volume exceeds the maxVolume, there is no position with such positionID in the database||
|  Negative| Positive| Absent | Present| Invalid | The occupied volume exceeds the maxVolume, there is no SKU with such SKUID in the database||
|  Negative| Positive| Absent | Absent | Invalid | The occupied volume exceeds the maxVolume, there is no position with such positionID in the database, there is no SKU with such SKUID in the database||
|  Negative| Negative| Present | Present| Valid | All the conditions are satisfied||
|  Negative| Negative| Present | Absent | Invalid |  There is no position with such positionID in the database||
|  Negative| Negative| Absent | Present| Invalid | There is no SKU with such SKUID in the database||
|  Negative| Negative| Absent | Absent | Invalid | There is no position with such positionID in the database, there is no SKU with such SKUID in the database||


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

The input value is the body of the HTTP POST Request, but also the old rfid

**Criteria for method *editSkuItem*:**
 - Validity of *oldrfid*	
 - Validity of *rfid*	
 - Sign of *availability*
 - Format of  *dateOfStock*
 




**Predicates for method *editSkuItem*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *oldrfid*     |     There is no SKU item with the specified *oldrfid* in the database      |
|          |     There is a SKU with the specified *oldrfid* in the database     |
|    Usage of *rfid*     |     There is no SKU item with the specified *rfid* in the database      |
|          |     There is a SKU Item with the specified *rfid* in the database     |
|Sign of *availability* | Sign is positive|
| | Sign is negative|
| Format of  *dateOfStock* | The date format is a valid one (NULL, "YYYY/MM/DD" or"YYYY/MM/DD HH:MM")  |
|  | The date format is an invalid one |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *oldrfid*     |      No boundary found      |
|    Usage of *rfid*     |      No boundary found      |
|Sign of *availability* | 0|
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
 /* NOT CONSIDERED AS POSSIBLE TESTS -> THE FRONTEND CHECKS THE FORMAT OF AISLE, ROW, COLUMN AS 4 DIGIT STRINGS
 - Format of *aisle*
 - Format of *row*
 - Format of *colummn*
 */




**Predicates for method *createPosition*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Usage of *positionid*      |     There is no position with the specified *positionid* in the database      |
|          |     There is a position with the specified *positionid* in the database     |
|     Sign of *maxWeight*     |     Sign is positive      |
|          |    Sign is negative     |
|     Sign of *maxVolume*     |     Sign is positive      |
|          |    Sign is negative     |





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Usage of *positionid*      |     No boundary found     |
|     Sign of *maxWeight*     |    0      |
|     Sign of *maxVolume*     |     0      |



**Combination of predicates**:


| Criteria 1 | Criteria 2| Criteria 3| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| Present | Positive| Positive| Invalid | There is a position with the chosen *positionid*||
| Present | Positive| Negative| Invalid | There is a position with the chosen *positionid*, the *maxVolume* has a negative value||
| Present | Negative| Positive| Invalid | There is a position with the chosen *positionid*, the *maxWeight* has a negative value||
| Present | Negative| Negative| Invalid | There is a position with the chosen *positionid*, the *maxVolume* has a negative value, the *maxWeight* has a negative value||
| Absent | Positive| Positive| Valid | There is no position with the chosen *positionid*, the signs of *maxVolume* and *maxWeight* are correct||
| Absent | Positive| Negative| Invalid | The *maxVolume* has a negative value||
| Absent | Negative| Positive| Invalid | The *maxWeight* has a negative value||
| Absent | Negative| Negative| Invalid | The *maxVolume* has a negative value, the *maxWeight* has a negative value||

## **Class *positionController* - method *editPosition***

The input value is the body of the HTTP PUT Request and the positionid.

**Criteria for method *editPosition*:**
	
 - Validity of *positionid*
 - Usage of *newpositionid*
 - Sign of *newmaxWeight*
 - Sign of *newmaxVolume*
 - Sign of *newoccupiedWeight*
 - Sign of *newoccupiedVolume*
 - Sign of *newmaxWeight-newoccupiedWeight*
 - Sign of *newmaxVolume-newoccupiedVolume*
 /* NOT CONSIDERED AS POSSIBLE TESTS -> THE FRONTEND CHECKS THE FORMAT OF AISLE, ROW, COLUMN AS 4 DIGIT STRINGS
 - Format of *aisle*
 - Format of *row*
 - Format of *colummn*
 */




**Predicates for method *editPosition*:**

| Criteria | Predicate |
| :--------: | :---------: |
|    Validity of *positionid*      |     There is no position with the specified *positionid* in the database      |
|          |     There is a position with the specified *positionid* in the database     |
|    Usage of *newpositionid*      |     There is no position with the specified *positionid* in the database      |
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





**Boundaries**:

| Criteria | Boundary values |
| :--------: | :---------------: |
|    Validity of *positionid*      |     No boundary found     |
|    Usage of *newpositionid*      |     No boundary found     |
|     Sign of *newmaxWeight*     |    0      |
|     Sign of *newmaxVolume*     |     0      |
|     Sign of *newoccupiedWeight*     |    0      |
|     Sign of *newoccupiedVolume*     |     0      |
|     Sign of *newmaxWeight-newoccupiedWeight*     |    0      |
|     Sign of *newmaxVolume-newoccupiedVolume*     |     0      |



**Combination of predicates**:


| Criteria 1 | Criteria 2| Criteria 3|  Criteria 4 | Criteria 5| Criteria 5| Criteria 7 | Criteria 8| Valid / Invalid | Description of the test case | Jest test case |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| Valid | Present| Positive| Positive| Positive| Positive| Positive| Positive | Invalid| There is already a position with *newpositionid*||
| Valid | Present| Positive| Positive| Positive| Positive| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*||
| Valid | Present| Positive| Positive| Positive| Positive| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*||
| Valid | Present| Positive| Positive| Positive| Positive| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*||
| Valid | Present| Positive| Positive| Positive| Negative| Positive| Positive | Invalid| There is already a position with *newpositionid*, there is at least one argument with a negative sign, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive| Positive| Negative| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive| Positive| Negative| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive| Positive| Negative| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive|  Negative| Positive| Positive| Positive | Invalid| There is already a position with *newpositionid*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive| Negative| Positive| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive|  Negative| Positive| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive|  Negative| Positive| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive|  Negative| Negative| Positive| Positive | Invalid| There is already a position with *newpositionid*, there is at least one argument with a negative sign, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive|  Negative| Negative| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive|  Negative| Negative| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Positive|  Negative| Negative| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Positive| Positive| Positive| Positive | Invalid| There is already a position with *newpositionid*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Positive| Positive| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Positive| Positive| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Positive| Positive| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive|Negative| Positive| Negative| Positive| Positive | Invalid| There is already a position with *newpositionid*, there is at least one argument with a negative sign, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Positive| Negative| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Positive| Negative| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Positive| Negative| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative|  Negative| Positive| Positive| Positive | Invalid| There is already a position with *newpositionid*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative| Negative| Positive| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative|  Negative| Positive| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative|  Negative| Positive| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative|  Negative| Negative| Positive| Positive | Invalid| There is already a position with *newpositionid*, there is at least one argument with a negative sign, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative|  Negative| Negative| Positive| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedVolume* is greater than the *newMaxVolume*, there is at least one argument with a negative sign||
| Valid | Present| Positive|Negative|  Negative| Negative| Negative| Positive | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
| Valid | Present| Positive| Negative|  Negative| Negative| Negative| Negative | Invalid| There is already a position with *newpositionid*, the *newOccupiedWeight* is greater than the *newMaxWeight*, there is at least one argument with a negative sign||
ALL THE OTHER COMBINATIONS ARE OMITTED BECAUSE OF THEIR HUGE NUMBER

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
|:-------:|:-------:|:-------:|:-------:|
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



