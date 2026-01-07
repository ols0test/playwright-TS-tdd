import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import {faker} from "@faker-js/faker";

test.describe("Next button on selecting payment page", () => {
    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;
    let startApplicationPage: StartApplicationPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        reviewPaymentPage = new ReviewPaymentPage(page);
        startApplicationPage = new StartApplicationPage(page);
        await CommonUI.completeStartApplicationForm(page, faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.string.numeric(10));
    });

    test("Verify that the next button is displayed", async () => {
        await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
    });

    test("Verify that the next button is disabled by default", async () => {
        await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
    });

    test("The back button should be displayed", async () => {
        await expect(paymentPlanPage.backButton).toBeVisible();
    });
   
    test("Payment component for Upfront should be displayed on Step 3 Review page", async ({page}) => {
        await paymentPlanPage.selectPaymentPlan('upfront');
        await paymentPlanPage.clickNextButton();
        await expect(reviewPaymentPage.productPriceText).toBeVisible();
        await expect(reviewPaymentPage.productPriceAmount).toHaveText("$500");
        await expect(reviewPaymentPage.totalAmount).toHaveText("$412");        
    });

    test("Payment component for 5 installments should be displayed on Step 3 Review page", async ({page}) => {
        await paymentPlanPage.selectPaymentPlan('5 installments');
        await paymentPlanPage.clickNextButton();
    
        await expect(reviewPaymentPage.installmentPriceText).toBeVisible();
        await expect(reviewPaymentPage.installmentPriceAmount).toHaveText("$100");
        await expect(reviewPaymentPage.subtotalText).toBeVisible();
        await expect(reviewPaymentPage.subtotalAmount).toHaveText("$100");
        await expect(reviewPaymentPage.totalAmount).toHaveText("$103");
    });

    test("Clicking next button after selecting a plan will take the user to the Step 3 Review page", async ({page}) => {
        const paymentPlans = ['upfront', 'installments'];
        const randomPlan = paymentPlans[Math.floor(Math.random() * paymentPlans.length)];
        await paymentPlanPage.selectPaymentPlan(randomPlan);
        await paymentPlanPage.clickNextButton();
        
        await expect(reviewPaymentPage.paymentForm).toBeVisible();
    });

    test("When user proceeds to the Review page - steps 1 and 2 should be green, and step 3 should be blue.", async ({page}) => {
        const paymentPlans = ['upfront', 'installments'];
        const randomPlan = paymentPlans[Math.floor(Math.random() * paymentPlans.length)];
        await paymentPlanPage.selectPaymentPlan(randomPlan);
        await paymentPlanPage.clickNextButton();

        await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");
        await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");       
        await expect(startApplicationPage.reviewStepCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
    });
});