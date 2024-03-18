import {BasePage} from "../base/BasePage";
import {By, WebDriver} from "selenium-webdriver";
import {BaseElement} from "../base/BaseElement";
import {AuthPage} from "./AuthPage";

export class HomePage extends BasePage {
    // CSS Selectors
    private loginBtnSelector: By = By.css("span[class='ssls-toolbar__btn-text']");

    // Xpath Selectors
    private homeTitle: By = By.css("h1[class='ssls-home-page-h1']");

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async clickLoginBtn(): Promise<AuthPage> {
        await BaseElement.click(this.driver, this.loginBtnSelector);
        return new AuthPage(this.driver);
    }

    public async getHomeTitleText(): Promise<string> {
        return await BaseElement.getText(this.driver, this.homeTitle);
    }

    public async homePageIsDisplayed() {
        await this.navigate()
        return await this.getHomeTitleText()
    }
}