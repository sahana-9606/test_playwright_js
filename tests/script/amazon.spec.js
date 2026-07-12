const{test, expect} = require('@playwright/test');
const {Amazon} = require('../pages/amazon');

test("Search a product in amazon", async({page})=>{
    console.log("Test started");
    const amazon = new Amazon(page);
    await amazon.goto();
    await amazon.search("samsung s25");
    await amazon.searchResults();
    const products = await amazon.getAllProducts();
    console.log(products);

    console.log("Test completed successfully");
});