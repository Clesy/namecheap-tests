import {BasePage} from "../base/BasePage";
import {By, WebDriver} from "selenium-webdriver";
import {BaseElement} from "../base/BaseElement";
import {BaseConfig} from "../configs/BaseConfig";
import {ProfilePage} from "./ProfilePage";

export class MySSLPage extends BasePage {
    // Xpath Selectors
    private profileBtn: By = By.xpath("//a[normalize-space()='Profile']")
    private logoutBtn: By = By.xpath("//button[normalize-space()='Log out']")

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async getProfileBtnText(email: string = new BaseConfig().getEmail()): Promise<string> {
        let profileToolbarBtn: string = `//span[normalize-space()="${email}"]`
        return await BaseElement.getText(this.driver, By.xpath(profileToolbarBtn))
    }

    public async clickProfileBtn(email: string = new BaseConfig().getEmail()) {
        let profileToolbarBtn: string = `//span[normalize-space()="${email}"]`
        await BaseElement.click(this.driver, By.xpath(profileToolbarBtn))
    }

    public async logOut() {
        await BaseElement.click(this.driver, this.logoutBtn)
    }

    public async goToProfile() {
        await BaseElement.click(this.driver, this.profileBtn)
        return new ProfilePage(this.driver)
    }
}