import { test, expect } from '@playwright/test';

test('contact form submission', async ({ page }) => {
  await page.goto('/contact');

  // Fill in the form
  await page.fill('#firstName', 'Synthetic');
  await page.fill('#lastName', 'Test');
  await page.fill('#email', 'synthetic-test@compagnia.org');
  await page.fill('#message', 'This is an automated synthetic test to verify form health.');

  // Submit the form
  await page.click('button[type="submit"]');

  // Verify success message (we use a 1s delay in our code for Google Forms)
  const successHeading = page.locator('.success-notification h2');
  await expect(successHeading).toBeVisible({ timeout: 10000 });
  await expect(successHeading).toHaveText('Thank You!');
});

test('newsletter signup submission', async ({ page }) => {
  await page.goto('/');

  // Open the newsletter form if it's not open (assuming it's in footer)
  const trigger = page.locator('.newsletter-trigger');
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  // Fill in the fields
  await page.fill('input[name="firstName"]', 'Synthetic');
  await page.fill('input[name="lastName"]', 'Newsletter');
  await page.fill('input[name="email"]', 'newsletter-test@compagnia.org');

  // Submit
  await page.click('.newsletter-submit');

  // Verify success (we assume success after 1s in our code)
  const successMsg = page.locator('.newsletter-success');
  await expect(successMsg).toBeVisible({ timeout: 10000 });
  await expect(successMsg).toHaveText("You're on the list!");
});
