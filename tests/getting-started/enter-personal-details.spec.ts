import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import {faker} from "@faker-js/faker";

test.describe("Enter Personal details", () => {
    let startAppPage: StartApplicationPage;

    test.beforeEach(async ({ page }) => {
        startAppPage = new StartApplicationPage(page);
    });

    test("The system should display default field type and value for First Name and Last name fields", async () => {
        const EXPECTED_FIRST_NAME = "First Name";
        const ACTUAL_FIRST_NAME = await startAppPage.firstNameDefaultValue.innerText()
        const EXPECTED_LAST_NAME = "Last Name";
        const ACTUAL_LAST_NAME = await startAppPage.lastNameDefaultValue.innerText();
        
        expect(ACTUAL_FIRST_NAME).toBe(EXPECTED_FIRST_NAME);
        expect(ACTUAL_LAST_NAME).toBe(EXPECTED_LAST_NAME);
    });

    test("Verify system  does not accept emails in incorrect format", async ( {page}) => {
        const ACTUAL_STEP_TITLE = await startAppPage.programNameOnInfoCard.innerText();
        const EXPECTED_STEP_TITLE = "Test Automation with Selenium";
        
        await startAppPage.enterFirstName(faker.person.firstName());
        await startAppPage.enterLastName(faker.person.lastName());
        await startAppPage.enterEmail("email");
        await startAppPage.enterPhoneNumber(faker.string.numeric(10));
        await startAppPage.clickNextButton();

        await page.waitForTimeout(5000);

        expect(ACTUAL_STEP_TITLE).toBe(EXPECTED_STEP_TITLE);        
        await expect(startAppPage.startApplicationStepCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
    });

    test("Verify phone field doesn't accept letters", async ( {page}) => {
        const ACTUAL_STEP_TITLE = await startAppPage.programNameOnInfoCard.innerText();
        const EXPECTED_STEP_TITLE = "Test Automation with Selenium";
        
        await startAppPage.enterFirstName(faker.person.firstName());
        await startAppPage.enterLastName(faker.person.lastName());
        await startAppPage.enterEmail(faker.internet.email());
        await startAppPage.enterPhoneNumber("abc");
        await startAppPage.clickNextButton();

        await page.waitForTimeout(5000);

        expect(ACTUAL_STEP_TITLE).toBe(EXPECTED_STEP_TITLE);        
        await expect(startAppPage.startApplicationStepCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
    });
});