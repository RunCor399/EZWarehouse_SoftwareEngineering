'use strict'
const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class ReturnOrderController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        console.log("returnOrderController started");
    }


    /**TO BE CHECKED - getter function to retreive all the return orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAllReturnOrders() {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        let orders = await this.#dbManager.genericSqlGet("SELECT * FROM ReturnOrder;")
            //.then(value => orders = value)
            .catch(error => { throw error });

        for (let i = 0; i < orders.length; i++) {
            orders[i].products = await this.getProductsPerReturnOrder(rows[i].id)
                //.then(value => rows[i].products = value)
                .catch(error => { throw error });
        }

        console.log(orders[0].products)


        return orders;
    }

    /**TO BE CHECKED - getter function to retreive a single return order, given its ID
    * @throws 401 Unauthorized (not logged in or wrong permissions)
    * @throws 404 Not Found (no return order associated to id)
    * @throws 422 Unprocessable Entity (validation of id failed)
    * @throws 500 Internal Server Error (generic error).
    */
    async getReturnOrder(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422)

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM ReturnOrder WHERE id=?;`, id)
            .then((value) => row = value[0])
            .catch((error) => { throw error });

        /*check if the internal order exists*/
        if (!row)
            throw new Exceptions(404);


        row.products = await this.getProductsPerReturnOrder(row.id)
            //.then(value => row.products = value)
            .catch(error => { throw error });


        return row;
    }

    /** @throws 500 */
    async getProductsPerReturnOrder(id) {
        let products = await this.#dbManager.genericSqlGet(`SELECT SKUID, description, price, RFID
        FROM SKUItemsPerReturnOrder WHERE id = ? `, id)
            //.then(value => products = value)
            .catch(error => { throw error })

        return products;

    }

    /**TO BE CHECKED - function to create a return order
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to restockOrderId)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async createReturnOrder(body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        const returnDate = body["returnDate"];
        const products = body["products"];
        const restockOrderId = body["restockOrderId"];

        /*check if the body is valid */
        if (this.#controller.areUndefined(returnDate, products, restockOrderId)
            || isNaN(Number(restockOrderId))
            || !this.#controller.areAllPositive(restockOrderId))
            throw new Exceptions(422)

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, restockOrderId)
            .then((value) => row = value[0])
            .catch((error) => { throw new Exceptions(503) });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404);

        for (let i = 0; i < products.length; i++) {
            await this.#controller.getSkuItemController().getSkuItem(products[i].RFID)
                .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); throw error })
        }

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM ReturnOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Exceptions(503) });

        const sqlInstruction = `INSERT INTO ReturnOrder (id, returnDate, restockOrderId) 
                                VALUES (?,?,?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, id + 1, returnDate, restockOrderId)
            .catch(error => { throw new Exceptions(503) })

        const sqlInsert = `INSERT INTO SKUItemsPerReturnOrder (id, SKUId, description, price,  RFID) VALUES (?,?,?);`;
        for (let i = 0; i < products.length; i++) {
            await this.#dbManager.genericSqlRun(sqlInsert, id + 1, products[i].SKUId, products[i].description, products[i].price, products[i].RFID)
                .catch(error => { throw new Exceptions(503); })
        }


    }

    /**COMPLETED - delete function to remove a return order from the table, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 503 Service Unavailable (generic error)
    */
    async deleteReturnOrder(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM ReturnOrder WHERE ID=?;`, id)
            .catch(error => { throw new Exceptions(503) });
    }
}

module.exports = ReturnOrderController;