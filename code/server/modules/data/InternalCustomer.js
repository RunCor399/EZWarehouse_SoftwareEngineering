
class InternalCustomer{
    #ID;
    #name;
    #surname;

    constructor(ID, name, surname){
        this.#ID = ID;
        this.#name = name;
        this.#surname = surname;
    }

    getID(){
        return this.#ID;
    }

    getName(){
        return this.#name;
    }

    getSurname(){
        return this.#surname;
    }

    setID(ID){
        this.#ID = ID;
    }

    setName(name){
        this.#name = name;
    }

    setSurname(surname){
        this.#surname = surname;
    }
    
}