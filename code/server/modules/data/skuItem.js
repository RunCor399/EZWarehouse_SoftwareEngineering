

class SKUItem {
    #RFID;

    constructor(ID, description, weight, volume, price, notes, RFID){
        super(ID, description, weight, volume, price, notes);
        this.#RFID = RFID;
    }

    getRFID(){
        return this.#RFID;
    }

    setRFID(RFID){
        this.#RFID = RFID;
    }
}

module.exports = SKUItem;