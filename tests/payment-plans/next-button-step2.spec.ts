import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import {faker} from "@faker-js/faker";

test.describe("Next button on selecting payment page", () => {
    let paymentPlanPage: PaymentPlanPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        await CommonUI.completeStartApplicationForm(page, faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.string.numeric(10));
    });

    test('Verify that the next button is displayed', async ({page}) => {
        await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
    });

    test('Verify that the next button is disabled by default', async ({page}) => {
        await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
    });

    //TODO Complete the other remaining tests of this user story ...
   


});