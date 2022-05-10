const fetch = require("./node-fetch");

async function get_items_test() {
    const response = await fetch("http://localhost:3001/api/items");
    console.log(response);
}



get_items_test();
