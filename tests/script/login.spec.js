const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginpage');

test('Login with credential', async ({ page }) => {
  const loginpage = new LoginPage(page);

  await loginpage.goto();
  await loginpage.login('tomsmith', 'SuperSecretPassword!');

  const message = await loginpage.getFlashMessage();
  expect(message).toContain('You logged into a secure area');
});