import {test, expect} from '@playwright/test';

test('Login and add item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.pause();
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const itemNames = await page.locator('#inventory_container').allTextContents();
    console.log('Available items:', itemNames);

    const product = page.locator('.inventory_item').first();
    const addedItemName = await product.locator('.inventory_item_name').textContent();
    console.log('Adding item to cart:', addedItemName);

    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const cartItemName = await page.locator('.cart_item .inventory_item_name').first().textContent();
    console.log('Item in cart:', cartItemName);
    expect(cartItemName).toBe(addedItemName);

    await page.close();
    
});