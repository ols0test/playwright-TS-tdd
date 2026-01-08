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

    test("The Next button is disabled by default", async () => {
        await expect(paymentPlanPage.activeNextButton).toBeHidden();
        await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
        await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
    });

    test("The Upfront payment plan is highlighted when the user selects it", async () => {
        await paymentPlanPage.selectPaymentPlan('upfront');
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveCSS("border", "2px solid rgb(40, 201, 251)")
        await expect(paymentPlanPage.installmentsPaymentFrame).toHaveCSS("border", "0px none rgba(0, 0, 0, 0.87)")
    });

    test("The 5 Installments payment plan is highlighted when the user selects it", async () => {
        await paymentPlanPage.selectPaymentPlan('5 installments');
        await expect(paymentPlanPage.installmentsPaymentFrame).toHaveCSS("border", "2px solid rgb(40, 201, 251)")
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveCSS("border", "0px none rgba(0, 0, 0, 0.87)")
    });
   
});