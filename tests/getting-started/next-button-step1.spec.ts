import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import {faker} from "@faker-js/faker";

test.describe("Next button on start application page", () => {
    let startAppPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage; 

    test.beforeEach(async ({ page }) => {
        startAppPage = new StartApplicationPage(page);
        paymentPlanPage = new PaymentPlanPage(page); 
    });

    test("Clicking next button after providing all the personal details will take the user to the payment plan step", async () => {
        await startAppPage.enterFirstName(faker.person.firstName());
        await startAppPage.enterLastName(faker.person.lastName());
        await startAppPage.enterEmail(faker.internet.email());
        await startAppPage.enterPhoneNumber(faker.string.numeric(10));
        await startAppPage.selectHowDidYouHearAboutUs("Google");
        await startAppPage.clickNextButton();

        const ACTUAL_CHOOSE_PAYMENT_TEXT = await paymentPlanPage.chooseAPaymentPlanText.innerText();
        const EXPECTED_CHOOSE_PAYMENT_TEXT = "Choose a payment plan";
        expect(ACTUAL_CHOOSE_PAYMENT_TEXT).toBe(EXPECTED_CHOOSE_PAYMENT_TEXT);
    });

    test("Clicking next button after providing only the required personal details will take the user to the payment plan step", async () => {
        await startAppPage.enterFirstName(faker.person.firstName());
        await startAppPage.enterLastName(faker.person.lastName());
        await startAppPage.enterEmail(faker.internet.email());
        await startAppPage.enterPhoneNumber(faker.string.numeric(10));
        await startAppPage.clickNextButton();

        const ACTUAL_CHOOSE_PAYMENT_TEXT = await paymentPlanPage.chooseAPaymentPlanText.innerText();
        const EXPECTED_CHOOSE_PAYMENT_TEXT = "Choose a payment plan";
        expect(ACTUAL_CHOOSE_PAYMENT_TEXT).toBe(EXPECTED_CHOOSE_PAYMENT_TEXT);        
    });
});