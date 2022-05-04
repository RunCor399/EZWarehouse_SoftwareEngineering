class Item {
    #ID;

    constructor(ID){
        this.#ID = ID;
    }

    getID(){
        return this.#ID;
    }
}

module.exports = Item;