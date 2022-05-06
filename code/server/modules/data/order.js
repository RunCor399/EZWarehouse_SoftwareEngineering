
class Order{
    #ID;
    #products = new Map();

    constructor(ID, products){
        this.#ID = ID;
        this.#products = products;
    }

    getID(){
        return this.#ID;
    }

    setID(ID){
        this.#ID = ID;
    }

    getProducts(){
        return this.#products;
    }

    /* (SKUItem, Integer) */
    addProduct(item, quantity){
        if(!this.#products.has(item)){
            this.#products.set(item, quantity);
        } 
    }

    /* (SKUItem) */
    removeProduct(item){
        //search for id;
        for (const [key, value] of Object.entries(object)) {
            if(key.getRFID() === item.getRFID()){
                return this.#products.delete(key)
            }
        }

        return -1;        
    }

    changeProductQuantity(item, quantity){
        //search for id
        for (const [key, value] of Object.entries(object)) {
            if(key.getRFID() === item.getRFID()){
                return this.#products.set(key, value);
            }
        }

        return -1;
    }
}

module.exports = Order;