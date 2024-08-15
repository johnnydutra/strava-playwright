import { expect, Locator, Page } from '@playwright/test';

class CookieBanner {
  readonly page: Page;

  readonly bannerDiv: Locator;
  readonly bannerTextSpan: Locator;
  readonly cookiesPolicyLink: Locator;
  readonly acceptButton: Locator;
  readonly rejectButton: Locator;

  readonly bannerText = 'We use essential cookies to make our website work. We also set additional cookies that help us improve your experience, help keep you safe, perform analytics, and serve relevant ads. These additional cookies will be set only if you click ‘Accept’ below. For more information about the cookies we use, or to change your preferences, please visit our Cookies Policy.'

  constructor(page:Page) {
    this.page = page;

    this.bannerDiv = page.locator('#stravaCookieBanner');
    this.bannerTextSpan = page.locator('#stravaCookieBanner span');
    this.cookiesPolicyLink = page.locator('#stravaCookieBanner a');
    this.acceptButton = page.locator('.btn-accept-cookie-banner');
    this.rejectButton = page.locator('.btn-deny-cookie-banner');
  }

  async accessPolicy() {
    await this.cookiesPolicyLink.click();
  }

  async accept() {
    await this.acceptButton.click();
  }

  async reject() {
    await this.rejectButton.click();
  }

  async assertVisibility(isVisible: boolean) {
    await isVisible ? expect(this.bannerDiv).toBeVisible() : expect(this.bannerDiv).not.toBeVisible();
  }

  async assertTextContent() {
    await expect(this.bannerTextSpan).toHaveText(this.bannerText);
  }
}

export default CookieBanner;