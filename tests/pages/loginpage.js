
class LoginPage {
  constructor(page) {

    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginbutton = page.getByRole('button', { name: 'Login' });
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginbutton.click();
  }

  async getFlashMessage() {
    return await this.flashMessage.textContent();
  }
}
module.exports = { LoginPage };