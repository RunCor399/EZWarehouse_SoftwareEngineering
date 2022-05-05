
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
        if(this.#products.has(item)){
            this.#products.delete(item);
            return 0;
        }
        else{
            return -1;
        }
        
    }

    changeProductQuantity(item, quantity){
        if(this.#products.has(item)){
            this.#products.set(item, quantity);
            return 0;
        }
        else{
            return -1;
        }
    }
}

module.exports = Order;