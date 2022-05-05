'use strict'

class OrderController{
    constructor(controller) {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
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

    createRestockOrder(issueDate, products, supplierId){
        return undefined;
    }

    editRestockOrder(id, newState){
        return undefined;
    }

    addSkuItemsToRestockOrder(id, skuItems){
        return undefined;
    }
    
    addTransportNote(id, transportNote){
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

    createReturnOrder(returnDate, products, restockOrderId){
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

    createInternalOrder(issueDate, products, customerId){
        return undefined;
    }

    editInternalOrder(id, newState){
        return undefined;
    }

    editInternalOrder(id, newState, products){
        return undefined;
    }

    deleteInternalOrder(id){
        return undefined;
    }


    
}

module.exports = OrderController;