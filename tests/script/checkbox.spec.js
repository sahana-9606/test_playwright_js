const { test, expect } = require("@playwright/test");
const { CheckboxPage } = require("../pages/checkbox");

test("Checkbox toggle test", async ({ page }) => {
  const checkboxpage = new CheckboxPage(page);

  await checkboxpage.goto();

  // Checkbox 1 is unchecked by default
  expect(await checkboxpage.isChecked(0)).toBe(false);
  await checkboxpage.checkCheckbox(0);
  expect(await checkboxpage.isChecked(0)).toBe(true);

  // Checkbox 2 is checked by default
  expect(await checkboxpage.isChecked(1)).toBe(true);
  await checkboxpage.uncheckCheckbox(1);
  expect(await checkboxpage.isChecked(1)).toBe(false);

  await page.close();
});