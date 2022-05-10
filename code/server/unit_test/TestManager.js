'use strict'

const SKUTests = require("./SKUTests");



const skuTests = new SKUTests("http://localhost:3001");


console.log("Start testing");

skuTests.executeTests();

console.log("Finished testing");