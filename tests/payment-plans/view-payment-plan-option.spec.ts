import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import {faker} from "@faker-js/faker";

test.describe("Next button on selecting payment page", () => {
    let paymentPlanPage: PaymentPlanPage;
    let startApplicationPage: StartApplicationPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        startApplicationPage = new StartApplicationPage(page);
        await CommonUI.completeStartApplicationForm(page, faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.string.numeric(10));
    });

    test("The system should display upfront plan correctly.", async () => {
        const ACTUAL_UPFRONT_TEXT_1_ROW = await paymentPlanPage.upfrontPaymentOption.innerText();
        const EXPECTED_UPFRONT_TEXT_1_ROW = " Upfront ";

        const ACTUAL_TEXT_2_ROW = await paymentPlanPage.upfrontPaymentAmount.innerText();
        const EXPECTED_TEXT_2_ROW = "$400  pay once";
    
        expect(ACTUAL_UPFRONT_TEXT_1_ROW).toBe(EXPECTED_UPFRONT_TEXT_1_ROW);
        expect(ACTUAL_TEXT_2_ROW).toBe(EXPECTED_TEXT_2_ROW);
    });

    test("The system should display installment plan correctly.", async () => {
        const ACTUAL_TEXT_1_ROW = await paymentPlanPage.installmentsPaymentOption.innerText();
        const EXPECTED_TEXT_1_ROW = " 5 Installments";

        const ACTUAL_TEXT_2_ROW = await paymentPlanPage.installmentsPaymentAmount.innerText();
        const EXPECTED_TEXT_2_ROW = " $100 per month";

        expect(ACTUAL_TEXT_1_ROW).toBe(EXPECTED_TEXT_1_ROW);
        expect(ACTUAL_TEXT_2_ROW).toBe(EXPECTED_TEXT_2_ROW);

    });

    test("The system should show only 2 payments plans.", async () => {
        const PAYMENT_PLANS_COUNT = await paymentPlanPage.paymentPlanButtons.all()
        expect(PAYMENT_PLANS_COUNT.length).toBe(2);
    });
   
});