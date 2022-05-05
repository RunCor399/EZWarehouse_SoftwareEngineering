'use strict'

let session = { username: "", type: "" };


class UserController{
    constructor(controller) {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
        
        console.log("testController started");
     
        
    }
    
    getUser(){
        return session;
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
    
    
    loginManager(username, password) {
        session.username = username;
        session.type = "manager"
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