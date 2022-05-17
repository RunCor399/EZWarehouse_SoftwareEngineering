class SKU{
    skuid;
    description;
    weight;
    volume;
    notes;
    position;
    availableQuantity;
    price;
    testDescriptors;
    constructor(skuid,description, weight, volume, notes, price, availableQuantity)
    {
        this.skuid = skuid;
        this.description = description;
        this.weight = weight;
        this.volume = volume;
        this.notes = notes;
        this.price = price;
        this.availableQuantity = availableQuantity;
   }
}

module.exports = SKU;