import { test, expect } from '@playwright/test';

//AAA Pattern

// [Arrange]
// [Act]
// [Assert]

const password = process.env.PASSWORD;

test.beforeAll(async ({ playwright }) => {
    test.skip(
      !!process.env.PROD,
      'Test intentionally skipped in production due to data dependency.'
    );
    // start a server
    // create a db connection
    // reuse a sign in state
});
  
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    // open a URL
    // clean up the DB
    // create a page object
    // dismiss a modal
    // load params
});



test.describe('Test Case', () => {
// test.describe.only('Test Case', () => {
// test.describe.skip('Test Case', () => {
    test('Test Scenario One', async ({ page }) => {
        await test.step('Step One', async () => {
            // ...
        });

        await test.step('Step Two', async () => {
            // ...
        });

        // ...
    });
  
    test('Test Scenario Two', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
/**
    test.only('Test Scenario Three', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */  
/**
    test.skip('Test Scenario Four', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */

  });
  

test.describe('Test Case Two', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        // open a URL
        // clean up the DB
        // create a page object
        // dismiss a modal
        // load params
    });
// test.describe.only('Test Case', () => {
// test.describe.skip('Test Case', () => {
    test('Test Scenario One', async ({ page }) => {
        await test.step('Step One', async () => {
            // ...
        });

        await test.step('Step Two', async () => {
            // ...
        });

        // ...
    });
    
    test('Test Scenario Two', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
/**
    test.only('Test Scenario Three', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
    */  
/**
    test.skip('Test Scenario Four', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
    */

    });
      

    