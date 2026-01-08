import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";

test.describe("Checkout process steps", () => {
    let startAppPage: StartApplicationPage;

    test.beforeEach(async ({ page }) => {
        startAppPage = new StartApplicationPage(page);
    });

    test("The system should display the steps of the checkout process as '1-Start Application', '2-Payment Plan', and '3-Review'.", async () => {
        const ACTUAL_STEPPER_1_TEXT = await startAppPage.startApplicationText.innerText();
        const EXPECTED_STEPPER_1_TEXT = "Start Application";
        const ACTUAL_STEPPER_2_TEXT = await startAppPage.paymentPlanText.innerText();
        const EXPECTED_STEPPER_2_TEXT = "Payment plan";
        const ACTUAL_STEPPER_3_TEXT = await startAppPage.reviewText.innerText();
        const EXPECTED_STEPPER_3_TEXT = "Review";

        expect(ACTUAL_STEPPER_1_TEXT).toBe(EXPECTED_STEPPER_1_TEXT);
        expect(ACTUAL_STEPPER_2_TEXT).toBe(EXPECTED_STEPPER_2_TEXT);    
        expect(ACTUAL_STEPPER_3_TEXT).toBe(EXPECTED_STEPPER_3_TEXT);
    });

    test("The system should highlight 'Start Application' in blue.", async () => {
        await expect(startAppPage.startApplicationStepCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");        
    });

    test("The system should display 'Payment Plan' and 'Review' in transparent.", async () => {    
        await expect(startAppPage.paymentPlanStepCircle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
        await expect(startAppPage.reviewStepCircle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    });
});
