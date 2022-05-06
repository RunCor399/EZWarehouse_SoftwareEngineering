
class SKU{
    #ID;
    #description;
    #weight;
    #volume;
    #price;
    #notes;

    /* Checks on float values? */
    constructor(ID, description, weight, volume, price, notes){
        this.#ID = ID;
        this.#description = description;
        this.#weight = weight;
        this.#volume = volume;
        this.#price = price;
        this.#notes = notes;
    }

    getID() {
        return this.#ID;
    }

    getDescription() {
        return this.#description;
    }

    getWeight() {
        return this.#weight;
    }

    getVolume() {
        return this.#volume;
    }

    getPrice() {
        return this.#price;
    }

    getNotes() {
        return this.#notes;
    }

    setID(ID) {
        this.#ID = ID;
    }

    setDescription(description) {
        this.#description = description;
    }

    setWeight(weight) {
        this.#weight = weight;
    }

    setVolume(volume) {
        this.#volume = volume;
    }

    setPrice(price) {
        this.#price = price;
    }

    setNotes( notes) {
        this.#notes = notes;
    }
}

module.exports = SKU;