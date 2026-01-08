import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { faker } from "@faker-js/faker";

test.describe("Pay button on review payment page", () => {

    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    test('Verify that the error message is displayed when the entered card number is invalid', async ({page}) => {
        await reviewPaymentPage.enterCardNumber(faker.string.numeric(16));
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText("Your card number is invalid.");
    });

    test('Verify that the error message is displayed when the entered card number is too short', async ({page}) => {
        await reviewPaymentPage.enterCardNumber(faker.string.numeric(10));
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText("Your card number is incomplete.");
    });

});