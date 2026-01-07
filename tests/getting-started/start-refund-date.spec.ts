import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";

// create an empty test group.
test.describe("Program start date and refund date", () => {

  let startAppPage: StartApplicationPage;

  test.beforeEach(async ({ page }) => {
    startAppPage = new StartApplicationPage(page);
  });

  test("Verify program start date and refund date are displayed", async ({page}) => {
    await expect(startAppPage.programStartDate).toBeVisible();
    await expect(startAppPage.refundEndDate).toBeVisible();
  });

  test("Verify the displayed start date and refund date are correct", async ({page}) => {
    const startAppPage = new StartApplicationPage(page);

    const ACTUAL_START_DATE = await startAppPage.programStartDate.innerText();
    const EXPECTED_START_DATE = productInfo.startDate;

    const ACTUAL_REFUND_DATE = await startAppPage.refundEndDate.innerText();
    const EXPECTED_REFUND_DATE = productInfo.refundDate;

    expect(ACTUAL_START_DATE).toBe(EXPECTED_START_DATE);
    expect(ACTUAL_REFUND_DATE).toBe(EXPECTED_REFUND_DATE);
  });


  //TODO Complete the other remaining tests of this user story ...

  
});
