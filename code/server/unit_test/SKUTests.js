'use strict';
const axios = require('axios');

//NOT WORKING BECAUSE test of jest is not defined


class SKUTests {
    #baseURL;

    constructor(baseURL){
        this.#baseURL = baseURL;
    }

    executeTests(){
        this.addNewSKUItemTest();
    }

    addNewSKUItemTest(){
        const url = this.#baseURL + "/api/skuitem";

       /* const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }*/

        test("test sku", async () => {
        
            axios({
                method: 'post',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    RFID:"12345678901234567890123456789015", 
                    SKUId: "1",
                    DateOfStock: "2021/11/29 12:30"
                }
              }).then((response) => {
                expect(response).not.toBeNull();
              });




            /*const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        RFID:"12345678901234567890123456789015", 
                        SKUId: "1",
                        DateOfStock: "2021/11/29 12:30"
                    })
            });*/
            
            
        });
    }
}

module.exports = SKUTests;