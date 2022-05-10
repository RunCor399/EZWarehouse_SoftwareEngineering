import fetch from "node-fetch";

async function get_items_test() {
    const response = await fetch("/api/items");
    console.log(response);
}



get_items_test();
