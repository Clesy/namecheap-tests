import {BasePage} from "../base/BasePage";
import {By, WebDriver} from "selenium-webdriver";
import {BaseElement} from "../base/BaseElement";
import {BaseConfig} from "../configs/BaseConfig";
import {MySSLPage} from "./MySSLPage";

export class AuthPage extends BasePage {
    // Xpath Selectors
    private authTitle: By = By.xpath("//h1[normalize-space()='Authorization']")
    private loginBtn: By = By.xpath("//button[normalize-space()='Login']")
    private errorAnEmailText: By = By.xpath("//div[@class='left-tooltip-box']//span[@class='tooltip-text']")

    // Css Selectors
    private emailField: By = By.css("input[placeholder='Email']")
    private passwordField: By = By.css("input[placeholder='Enter password']")
    private iconEyeBtn: By = By.css(".btn-input.btn-input-block")
    private loginHeaderBtn: By = By.css("span[class='ssls-toolbar__btn-text']")
    private notifyText: By = By.css(".noty_text")

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async fillEmailField(email: string = new BaseConfig().getEmail()): Promise<void> {
        await BaseElement.sendKeys(
            this.driver,
            this.emailField,
            email
        );
    }

    public async fillPasswordField(password: string = new BaseConfig().getPassword()): Promise<void> {
        await BaseElement.sendKeys(
            this.driver,
            this.passwordField,
            password
        );
    }

    public async fillEmailAndPasswordFields(email: string = new BaseConfig().getEmail(),
                                            password: string = new BaseConfig().getPassword()) {
        await this.fillEmailField(email)
        await this.fillPasswordField(password)
    }

    public async clickLoginBtn() {
        await BaseElement.click(this.driver, this.loginBtn)
        return new MySSLPage(this.driver)
    }

    public async clickBtnEye() {
        await BaseElement.click(this.driver, this.iconEyeBtn)
    }

    public async getLoginHeaderBtnText() {
        return await BaseElement.getText(this.driver, this.loginHeaderBtn)
    }

    public async getAuthTitle() {
        return await BaseElement.getText(this.driver, this.authTitle)
    }

    public async getPasswordType() {
        return await BaseElement.find(this.driver, this.passwordField).then(
            fun => fun.getAttribute("type")
        )
    }

    public async getNotifyText() {
        return await BaseElement.getText(this.driver, this.notifyText)
    }

    public async getErrorAnEmailText() {
        return await BaseElement.getText(this.driver, this.errorAnEmailText)
    }
}
