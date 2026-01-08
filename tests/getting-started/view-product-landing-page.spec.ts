import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { LeftMainPage } from "../../pages/LeftMainPage";


test.describe("Product landing page", () => {
    let startAppPage: StartApplicationPage;
    let leftMainPage: LeftMainPage;

    test.beforeEach(async ({ page }) => {
        startAppPage = new StartApplicationPage(page);
        leftMainPage = new LeftMainPage(page);
    });

    test("The system should display the text 'Secure Checkout'.", async () => {
        const ACTUAL_CHECKOUT_TEXT = await leftMainPage.secureCheckout.innerText();
        const EXPECTED_CHECKOUT_TEXT = "Secure checkout ";
        expect(ACTUAL_CHECKOUT_TEXT).toBe(EXPECTED_CHECKOUT_TEXT);
    });

    test("The system should display the program name 'Test Automation with Selenium.'", async () => {
        const ACTUAL_PROGRAM_NAME_FROM_LEFT_SIDE = await leftMainPage.programName.innerText();
        const EXPECTED_PROGRAM_NAME = "Test Automation with Selenium";
        expect(ACTUAL_PROGRAM_NAME_FROM_LEFT_SIDE).toBe(EXPECTED_PROGRAM_NAME);  
    });

    test("Users should see a footer on the left side of the page: logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy", async () => {
        await expect(leftMainPage.cydeoImageAtLeftWindow).toBeVisible();

        await expect(leftMainPage.termsAndConditions).toBeVisible();
        await expect (leftMainPage.termsAndConditions).toHaveText("Terms and conditions");
        await expect(leftMainPage.termsAndConditions).toHaveAttribute("href", "https://cydeo.com/terms-conditions/");

        await expect(leftMainPage.privacyPolicy).toBeVisible();
        await expect(leftMainPage.privacyPolicy).toHaveText("Privacy Policy");
        await expect(leftMainPage.privacyPolicy).toHaveAttribute("href", "https://cydeo.com/privacy-policy/");

        await expect(leftMainPage.disclaimer).toBeVisible();
        await expect(leftMainPage.disclaimer).toHaveText("Disclaimer");
        await expect(leftMainPage.disclaimer).toHaveAttribute("href", "https://cydeo.com/disclaimer/");

        await expect(leftMainPage.cookiePolicy).toBeVisible();
        await expect(leftMainPage.cookiePolicy).toHaveText("Cookie Policy");
        await expect(leftMainPage.cookiePolicy).toHaveAttribute("href", "https://cydeo.com/cookie-policy/");
    });
        
    test("The system displays 'Need help? Contact us at enrollment@cydeo.com' in the footer on the right.", async () => {
        const ACTUAL_NEED_HELP_TEXT = await startAppPage.footer.innerText();
        const EXPECTED_NEED_HELP_TEXT = "Need help? Contact us at enrollment@cydeo.com";
        expect(ACTUAL_NEED_HELP_TEXT).toBe(EXPECTED_NEED_HELP_TEXT);  
    });
});