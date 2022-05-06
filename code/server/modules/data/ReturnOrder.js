import Order from "./Order";

class ReturnOrder extends Order {
    #date;

    constructor(ID, products){
        super(ID, products);
    }

    getReturnDate(){
        return this.#date;
    }

    setReturnDate(date){
        //js Date received as dd/mm/yyyy
        const [day, month, year] = date.split('/');
        
        this.#date = new Date(+year, month-1, +day);
    }
}