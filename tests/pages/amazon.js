import { expect } from '@playwright/test';
class Amazon {
    constructor(page){
        this.page = page;
        this.searchbar = this.page.locator('#twotabsearchtextbox');
        this.logo = this.page.locator('#nav-logo-sprites');
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
    }

    async searchResultsCount(){
        const count = await this.page.locator('.s-result-item').count()
        console.log(`Total search results: ${count}`)
    }

}

exports.Amazon = Amazon;
