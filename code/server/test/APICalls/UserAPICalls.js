'use strict'

const axios = require('axios');

class UserAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getUserInfo(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/userinfo",
        });
    } 

    async getSuppliers(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/suppliers" ,
        });
    }

    async getUsers(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/users" ,
        });
    }

    //POST
    async newUser(username, name, surname, password, type){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/newUser",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                name : name, 
                surname : surname, 
                password : password, 
                type : type
            }
        });
    }

    async managerSessions(username, password){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/managerSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        });
    }

    async customerSessions(username, password){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/customerSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        });
    }

    async supplierSessions(username, password){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/supplierSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        });
    }

    async clerkSessions(username, password){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/clerkSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        });
    }

    async qualityEmployeeSessions(username, password){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/qualityEmployeeSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        });
    }

    async deliveryEmployeeSessions(username, password){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/deliveryEmployeeSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        });
    }

    async logout(){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/logout",
        });
    } 

    //PUT
    async editUser(username, oldType, newType){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/users/" + username,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                oldType : oldType, 
                newType : newType
            }
        });
    }


    //DELETE
    async deleteUser(username, type){
        return axios({
            method: 'delete',
            url: this.#baseURL + "/api/users/" + username +"/"+ type,
        });
    }
}

module.exports = UserAPICalls;