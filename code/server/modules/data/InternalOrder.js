const StatefulOrder = require("./StatefulOrder");

class InternalOrder extends StatefulOrder {
    #customerID;
    #issueDate;

    constructor(ID, products, state, customerID, issueDate){
        super(ID, products, state);

        this.#customerID = customerID;
        this.#issueDate = issueDate;
    }

    getCustomerID(){
        return this.#customerID;
    }

    getIssueDate(){
        return this.#issueDate;
    }

    setCustomerID(customerID){
        this.#customerID = customerID;
    }

    setIssueDate(issueDate){
        //js Date received as dd/mm/yyyy
        const [day, month, year] = issueDate.split('/');
        
        this.#issueDate = new Date(+year, month-1, +day);
    }
}