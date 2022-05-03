'use strict'

class OrderController{
    constructor() {
        console.log("orderController started");
    }
    
    getAllRestockOrders(){
        return undefined;
    }

    getIssuedRestockOrders(){
        return undefined;
    }

    getRestockOrder(id){
        return undefined;
    }

    getRestockOrderToBeReturned(id){
        return undefined;
    }

    createRestockOrder(body){
        return undefined;
    }

    editRestockOrder(id){
        return undefined;
    }

    addSkuItemsToRestockOrder(id, body){
        return undefined;
    }
    
    addTransportNote(id, body){
        return undefined;
    }

    deleteRestockOrder(id){
        return undefined;
    }

    getAllReturnOrders(){
        return undefined;
    }

    getReturnOrder(id){
        return undefined;
    }

    createReturnOrder(body){
        return undefined;
    }
    
    deleteReturnOrder(id){
        return undefined;
    }

    getAllInternalOrders(){
        return undefined;
    }

    getIssuedInternalOrders(){
        return undefined;
    }

    getAcceptedInternalOrders(){
        return undefined;
    }
    
    getInternalOrder(id){
        return undefined;
    }

    createInternalOrder(body){
        return undefined;
    }

    editInternalOrder(id, body){
        return undefined;
    }

    deleteInternalOrder(id){
        return undefined;
    }


    
}

module.exports = OrderController;