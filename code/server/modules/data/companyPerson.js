
class CompanyPerson{
    #ID;
    #role;
    #name;
    #surname;
    #privilegeLevel;

    constructor(ID, role, name, surname, privilegeLevel){
        this.#ID = ID;
        this.#role = role;
        this.#name = name;
        this.#surname = surname;
        this.#privilegeLevel = privilegeLevel;
    }

    getID(){
        return this.#ID;
    }

    getRole(){
        return this.#role;
    }

    getName(){
        return this.#name;
    }

    getSurname(){
        return this.#surname;
    }

    getPrivilegeLevel(){
        return this.#privilegeLevel;
    }

    setID(ID){
        this.#ID = ID;
    }

    setRole(role){
        this.#role = role;
    }

    setName(name){
        this.#name = name;
    }

    setSurname(surname){
        this.#surname = surname;
    }

    setPrivilegeLevel(privilegeLevel){
        this.#privilegeLevel = privilegeLevel;
    }

}

module.exports = CompanyPerson;