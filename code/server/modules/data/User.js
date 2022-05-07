
class User{
    #ID;
    #type;
    #name;
    #surname;
    //#privilegeLevel;

    constructor(ID, type, name, surname, privilegeLevel){
        this.#ID = ID;
        this.#type = type;
        this.#name = name;
        this.#surname = surname;
        this.#privilegeLevel = privilegeLevel;
    }

    getID(){
        return this.#ID;
    }

    getType(){
        return this.#type;
    }

    getName(){
        return this.#name;
    }

    getSurname(){
        return this.#surname;
    }

    /*getPrivilegeLevel(){
        return this.#privilegeLevel;
    }*/

    setID(ID){
        this.#ID = ID;
    }

    setType(role){
        this.#type = role;
    }

    setName(name){
        this.#name = name;
    }

    setSurname(surname){
        this.#surname = surname;
    }

    /*setPrivilegeLevel(privilegeLevel){
        this.#privilegeLevel = privilegeLevel;
    }*/

}

module.exports = User;