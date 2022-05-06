
class Supplier {
    #ID;
    #name;
    #itemsList = []; //list of Items

    constructor(ID, name, itemsList){
        this.#ID = ID;
        this.#name = name;
        //List
        this.#itemsList = itemsList;
    }

    getID(){
        return this.#ID;
    }

    getName(){
        return this.#name;
    }

    getItemsList(){
        return this.#itemsList;
    }

    addItemToList(item){
        this.#itemsList.push(item);
    }

    removeItemFromList(ID){
        const oldListSize = this.#itemsList.length;
        this.#itemsList = this.#itemsList.filter((item) => (item.getID !== ID));

        return oldListSize === this.#itemsList.length ? -1 : 0;
    }
}