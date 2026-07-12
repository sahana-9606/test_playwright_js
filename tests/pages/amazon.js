import { expect } from '@playwright/test';
class Amazon {
    constructor(page){
        this.page = page;
        this.searchbar = this.page.locator('#twotabsearchtextbox');
        this.logo = this.page.locator('#nav-logo-sprites');
        this.productTiles = this.page.locator('[data-cy="asin-faceout-container"]');
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

    async searchResults(){
        await expect(this.page.getByText(/results for/i)).toBeVisible()
        await expect(this.productTiles.first()).toBeVisible()
    }

    async getAllProductTitles(){
        return await this.productTiles.locator('a:has(h2) h2').allInnerTexts()
    }

    async getAllProducts(){
        const tiles = await this.productTiles.all()
        const products = []
        for (const tile of tiles) {
            const title = await tile.locator('a:has(h2) h2').innerText().catch(() => null)
            const price = await tile.locator('.a-price .a-offscreen').first().innerText().catch(() => null)
            products.push({ title, price })
        }
        return products
    }

    async addFirstProductToCart(){
        const product = this.productTiles.first()
        const titleLink = product.locator('a:has(h2)').first()

        const popupPromise = this.page.waitForEvent('popup')
        await titleLink.click()
        const productPage = await popupPromise

        await productPage.getByRole('button', { name: 'Add to cart' }).click()
        await expect(productPage.getByRole('link', { name: /item.*in cart/i })).toBeVisible()

        return productPage
    }

}

exports.Amazon = Amazon;
