
class TestDescriptor{
    #ID;
    #name;
    #description;

    constructor(ID, name, description){
        this.#ID = ID;
        this.#name = name;
        this.#description = description;
    }

    getID(){
        return this.#ID;
    }

    getName(){
        return this.#name;
    }

    getDescription(){
        return this.#description;
    }

    setID(ID) {
        this.#ID = ID;
    }

    setName(name) {  
        this.#name = name;
    }

    setDescription(description) {   
        this.#description = description;
    }
}

module.exports = TestDescriptor;