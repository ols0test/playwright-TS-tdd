import { test, expect } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import {faker} from "@faker-js/faker";

test.describe("Next button on selecting payment page", () => {
    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;
    let startAppPage: StartApplicationPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        startAppPage = new StartApplicationPage(page);
    });

    test("The product name should be displayed on the information card.", async () => {
        const ACTUAL_PROGRAM_NAME_ON_INFO_CARD = await startAppPage.programNameOnInfoCard.innerText();
        const EXPECTED_PROGRAM_NAME_ON_INFO_CARD = "Test Automation with Selenium";
        expect(ACTUAL_PROGRAM_NAME_ON_INFO_CARD).toBe(EXPECTED_PROGRAM_NAME_ON_INFO_CARD);
    });

    test("The price of the product should be displayed.", async () => {
        await expect(startAppPage.programBasePrice).toHaveText("$500");
        await expect(startAppPage.discountedPrice).toHaveText("$400");
    });
   
    test("The text indicating a flexible payment plan should be available and displayed.", async ({page}) => {
        const ACTUAL_TEXT_ABOUT_FLEXIBLE_PLAN = await startAppPage.flexiblePaymentsPlanAvailableText.innerText();
        const EXPECTED_TEXT_ABOUT_FLEXIBLE_PLAN = "Flexible payments plan available";
        
        expect(ACTUAL_TEXT_ABOUT_FLEXIBLE_PLAN).toBe(EXPECTED_TEXT_ABOUT_FLEXIBLE_PLAN);
        expect(await startAppPage.flexiblePaymentsPlanAvailableText.isVisible()).toBe(true);   
    });

    test("The program start date should be displayed.", async ({page}) => {
        expect(await startAppPage.programStartDate.isVisible());
    });

    test("The return policy and the final date for returns should be displayed.", async ({page}) => {
        const ACTUAL_RETURN_POLICY_TEXT = await startAppPage.refundPolicyText.innerText();
        const EXPECTED_RETURN_POLICY_TEXT = "100% refund policy until\nMay 10, 2025";
        expect(ACTUAL_RETURN_POLICY_TEXT).toBe(EXPECTED_RETURN_POLICY_TEXT);
        expect(await startAppPage.refundPolicyText.isVisible()).toBe(true);
    });
});