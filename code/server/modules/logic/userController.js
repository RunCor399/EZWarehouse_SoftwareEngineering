'use strict'

const CompanyPerson = require("../data/companyPerson");



class UserController{
    #controller;
    #dbManager;
    #id = 1;
    #session = { username: "", type: "" };

    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("testController started");
     
    }
    
    getUser(){
        return this.#session;
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

        if(true){
            this.#session.username = username;
            this.#session.type = "manager"
        }
        else{
            throw new Error("Invalid Login");
        }
       
    }
    
    loginCustomer(username, password){
        if(true){
            session.username = username;
            session.type = "customer"
        }
        else{
            throw new Error("Invalid Login");
        }
    }
    
    loginSupplier(username, password){
        if(true){
            session.username = username;
            session.type = "supplier"
        }
        else{
            throw new Error("Invalid Login");
        }
    }

    loginClerk(username, password){
        if(true){
            session.username = username;
            session.type = "clerk"
        }
        else{
            throw new Error("Invalid Login");
        }
    }
    
    loginQualityEmployee(username, password){
        if(true){
            session.username = username;
            session.type = "qualityEmployee"
        }
        else{
            throw new Error("Invalid Login");
        }
    }

    loginDeliveryEmployee(username, password){
        if(true){
            session.username = username;
            session.type = "deliveryEmployee"
        }
        else{
            throw new Error("Invalid Login");
        }
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