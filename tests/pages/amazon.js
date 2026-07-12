import { expect } from '@playwright/test';
class Amazon {
    constructor(page){
        this.page = page;
        this.searchbar = this.page.locator('#twotabsearchtextbox');
        this.logo = this.page.locator('#nav-logo-sprites');
        this.resultsInfo = this.page.getByText(/results for/i);
        this.productTiles = this.page.locator('[data-cy="asin-faceout-container"]');
        this.cartCount = this.page.locator('#nav-cart-count');
    }

    async goto(){
        await this.page.goto('https://www.amazon.in/')
        await expect(this.page).toHaveTitle(/Amazon\.in/)
        await expect(this.logo).toBeVisible()
    }
    
    async search(text){
        await this.searchbar.fill(text)
        await this.searchbar.press('Enter')
        await expect(this.page.locator("#twotabsearchtextbox")).toBeVisible()
    }

    async searchResults(text){
        await expect(this.resultsInfo).toBeVisible()
        await expect(this.resultsInfo).toContainText(text, { ignoreCase: true })
        await expect(this.productTiles.first()).toBeVisible()
    }

    async validateFirstProduct(searchTerm){
        const product = this.productTiles.first();
        const title = product.locator('h2').last();
        const price = product.locator('.a-price .a-offscreen').first();

        await expect(title).toBeVisible();
        await expect(title).toContainText(searchTerm.split(' ')[0], { ignoreCase: true });
        await expect(price).toBeVisible();

        return { title: await title.textContent(), price: await price.textContent() };
    }

    async addFirstProductToCart(){
        const product = this.productTiles.first();
        await product.getByRole('button', { name: 'Add to cart' }).click();
        await expect(this.cartCount).not.toHaveText('0');
    }

}

exports.Amazon = Amazon;
