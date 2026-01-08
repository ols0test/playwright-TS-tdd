import { BasePage } from "./BasePage";
import { Locator } from 'playwright';

export class LeftMainPage extends BasePage {

  public readonly cydeoImageAtLeftWindow: Locator 
    = this.locator("(//img[@src = 'assets/images/logo.svg'])[2]");

  public readonly secureCheckout: Locator 
    = this.locator("//p[@class='checkout-title']");

  public readonly footerElements: Locator 
    = this.locator("//a[contains(@href, 'https://cydeo.com/')]");

  public readonly programName: Locator 
    = this.locator("//p[@class='course-name']/a");
    
  public readonly termsAndConditions: Locator 
    = this.locator("//a[contains(text(), 'Terms and conditions')]");

  public readonly privacyPolicy: Locator 
    = this.locator("//a[contains(text(), 'Privacy Policy')]");

  public readonly disclaimer: Locator 
    = this.locator("//a[contains(text(), 'Disclaimer')]");

  public readonly cookiePolicy: Locator 
    = this.locator("//a[contains(text(), 'Cookie Policy')]");
}