import { test, expect } from '@playwright/test';
const UI_URL = `http://localhost:5173/`
test('should allow user to login', async ({ page }) => {
  await page.goto(UI_URL);

  // get Sign in button
  await page.getByRole('link', {name:'Sign In'}).click();

  await expect(page.getByRole('heading', {name: "Sign In"})).toBeVisible();

  await page.locator(`input[name=email]`).fill(`1@1.com`);
  await page.locator(`input[name=password]`).fill(`password`);

  await page.getByRole('button', {name:'Log In'}).click();

  await expect(page.getByText('Sign in successful')).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible();
});

test('should allow user to register', async ({page}) => {

  const testEmail = `test_register_${Math.floor(Math.random()*90000) + 10000}@test.com`

    await page.goto(UI_URL);

    await page.getByRole('link', {name:'Sign In'}).click();
    await page.getByRole('link', {name: 'Create an account here'}).click();

    await expect(page.getByRole('heading', {name: 'Create an Account'})).toBeVisible();

    await page.locator(`input[name=firstName]`).fill(`testF`);
    await page.locator(`input[name=lastName]`).fill(`testL`);
    await page.locator(`input[name=email]`).fill(`${testEmail}`);
    await page.locator(`input[name=password]`).fill(`testpassword`);
    await page.locator(`input[name=confirmPassword]`).fill(`testpassword`);

    await page.getByRole('button', {name: "Create Account"}).click();

    await expect(page.getByText('Registration Successful')).toBeVisible();
})

