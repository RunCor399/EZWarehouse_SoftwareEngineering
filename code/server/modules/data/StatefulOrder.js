const Order = require("./Order");

class StatefulOrder extends Order {
    #state;

    constructor(ID, products, state){
        super(ID, products);
        this.#state = state;
    }

    getState(){
        return this.#state;
    }

    setState(state){
        this.#state = state;
    }
}

module.exports = StatefulOrder;