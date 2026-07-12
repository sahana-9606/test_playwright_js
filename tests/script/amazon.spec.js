const{test, expect} = require('@playwright/test');
const {Amazon} = require('../pages/amazon');

test("Search a product in amazon", async({page})=>{
    console.log("Test started");
    const amazon = new Amazon(page);
    const searchTerm = "samsung s25";
    await amazon.goto();
    await amazon.search(searchTerm);
    await amazon.searchResults(searchTerm);
    await amazon.validateFirstProduct(searchTerm);
    await amazon.addFirstProductToCart();

    console.log("Test completed successfully");
});