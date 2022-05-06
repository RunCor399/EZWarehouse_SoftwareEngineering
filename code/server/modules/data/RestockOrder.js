import StatefulOrder from "./StatefulOrder";

class RestockOrder extends StatefulOrder {
    #issueDate;
    #shipmentDate;

    constructor(ID, products, state, issueDate, shipmentDate){
        super(ID, products, state);

        this.#issueDate = issueDate;
        this.#shipmentDate = shipmentDate;
    }

    getIssueDate(){
        return this.#issueDate;
    }

    getShipmentDate(){
        return this.#shipmentDate;
    }

    setIssueDate(issueDate){
        //js Date received as dd/mm/yyyy
        const [day, month, year] = issueDate.split('/');
        
        this.#issueDate = new Date(+year, month-1, +day);
    }

    setShipmentDate(shipmentDate){
        //js Date received as dd/mm/yyyy
        const [day, month, year] = shipmentDate.split('/');
        
        this.#shipmentDate = new Date(+year, month-1, +day);
    }
}