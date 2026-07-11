class CheckboxPage {
  constructor(page) {
    this.page = page;  
    this.checkboxes = page.locator('#checkboxes input[type="checkbox"]'); //css #id input[attribute= 'value']
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
  }

  async checkCheckbox(index) {
    await this.checkboxes.nth(index).check();
  }

  async uncheckCheckbox(index) {
    await this.checkboxes.nth(index).uncheck();
  }

  async isChecked(index) {
    return await this.checkboxes.nth(index).isChecked();
  }
}

module.exports = { CheckboxPage };