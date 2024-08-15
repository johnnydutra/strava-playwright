import { expect, test } from '@playwright/test';
import CookieBanner from '../../page-objects/CookieBanner';

let  cookieBanner: CookieBanner;

test.describe('Cookie policy banner', () => {
  test.beforeEach(async ({ page }) => {
    cookieBanner = new CookieBanner(page)
    await page.goto('https://www.strava.com/login');
  })

  test('should see the banner when landing on the page', async ({ page }) => {
    await cookieBanner.assertVisibility(true);
  })

  test('should read the expected text in the banner', async ({ page }) => {
    await cookieBanner.assertTextContent()
  })

  test('should be able to accept cookies', async ({ page }) => {
    await cookieBanner.accept();
    await cookieBanner.assertVisibility(false);
    // check cookies
  })

  test('should be able to reject cookies', async ({ page }) => {
    await cookieBanner.reject();
    await cookieBanner.assertVisibility(false);
    // check cookies
  })

  test('should be able to access the cookies policy', async ({ page }) => {
    await cookieBanner.accessPolicy()
    await expect(page).toHaveURL('https://www.strava.com/legal/cookie_policy')
  })
})