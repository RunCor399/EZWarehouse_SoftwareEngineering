const SKU = require("../data/sku");

class skuDAO {
    #dbManager;
    constructor(dbManager) {
        this.#dbManager = dbManager;
    }

    /** @returns skus */
    async getAllSKU() {
        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM SKU")
            .catch(error => { throw error });
        let skus = rows.map((row) => new SKU(row.id, row.description, row.weight, row.volume,
            row.notes, row.price, row.availableQuantity))
        
        if (!rows) {
            for (let i = 0; i < skus.length; i++) {
                skus[i].position = await this.getPositionForSKU(skus[i].id)
                    .catch(error => { throw error });
                skus[i].testDescriptors = await this.getTestDescriptorsForSKU(skus[i].id)
                    .catch(error => { throw error });

            }
        }

        return skus;
    }

    /** given sku id, this function returns position informations
     * @param rows the sku existing in the database
     * @throws 500 Internal Server Error (generic error).
      */
     async getPositionForSKU(id) {
        let positionID = "";

        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ?;`, id)
            .then(value => { positionID = (value[0] === undefined ? "" : value[0].positionID) })
            .catch(error => { throw error });


        return positionID;

     }
    
    /** given an sku id, this function returns the test descriptors informations
    *  @param rows the sku existing in the database
    * @throws 500 Internal Server Error (generic error).*/
     async getTestDescriptorsForSKU(id) {

        let testDescriptors
        await this.#dbManager.genericSqlGet(`SELECT id FROM TestDescriptor WHERE idSKU = ?;`, id)
            .then(value => { testDescriptors = value === undefined ? undefined : value.map(v => v.id) })
            .catch(error => { throw error });
        return testDescriptors;
     }
    
    
    async getSku(id) {

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch(error => { throw error })
        if (!row)
            throw new Exceptions(404);

        let sku = new SKU(row.id, row.description, row.weight,
            row.volume, row.notes, row.price, row.availableQuantity);


        sku.position = await this.getPositionForSKU(id)
            .catch(error => { throw error });

        sku.testDescriptors = await this.getTestDescriptorsForSKU(id)
            .catch(error => { throw error });

        return sku;
    }
}

module.exports = skuDAO;

