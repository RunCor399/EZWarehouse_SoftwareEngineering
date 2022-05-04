'use strict'


class UserController{
    constructor() {
        console.log("testController started");
     
        
    }
    
    getUser(){
        return undefined;
    }

    getAllSuppliers(){
        return undefined;
    }

    getAllUsers(){
        return undefined;
    }

    

    createUser(username, name, surname, password, type){
        return undefined;
    }
    
    
    loginManager(username, password){
        return undefined;
    }
    
    loginCustomer(username, password){
        return undefined;
    }
    
    loginSupplier(username, password){
        return undefined;
    }

    loginClerk(username, password){
        return undefined;
    }
    
    loginQualityEmployee(username, password){
        return undefined;
    }

    loginDeliveryEmployee(username, password){
        return undefined;
    }

    logout(){
        return undefined;
    }

    editUser(username, oldType, newType){
        return undefined;
    }

    deleteUser(username, type){
        return undefined;
    }

}

module.exports = UserController;