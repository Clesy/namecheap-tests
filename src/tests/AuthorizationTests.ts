import {BaseDriver} from "../base/BaseDriver";
import {HomePage} from "../pages/HomePage";
import {AuthPage} from "../pages/AuthPage";
import {assert} from 'chai';
import {MySSLPage} from "../pages/MySSLPage";
import {WebDriver} from "selenium-webdriver";

describe('Welcome back test', function (): void {
    this.timeout(0)

    let driver: WebDriver

    before(async function () {
        const webDriver = new BaseDriver()
        driver = await webDriver.initDriver()
    });

    it('should login successfully ', async function () {
        const homePage: HomePage = new HomePage(driver)
        const actualHomeTitle: string = await homePage.homePageIsDisplayed()
        assert.strictEqual(actualHomeTitle, "SSL for everyday people")

        const authPage: AuthPage = await homePage.clickLoginBtn()
        const authTitle: string = await authPage.getAuthTitle()
        assert.strictEqual(authTitle, "Authorization")

        await authPage.fillEmailAndPasswordFields()
        const passwordTypeBeforeClickEyeBtn: string = await authPage.getPasswordType()
        await authPage.clickBtnEye()

        const passwordTypeAfterClickEyeBtn: string = await authPage.getPasswordType()
        assert.notEqual(passwordTypeBeforeClickEyeBtn, passwordTypeAfterClickEyeBtn)

        const loginHeaderText: string = await authPage.getLoginHeaderBtnText()

        const mySslPage: MySSLPage = await authPage.clickLoginBtn()
        const profileBtnText: string = await mySslPage.getProfileBtnText()

        assert.notEqual(loginHeaderText, profileBtnText)
    });

    after(async function (): Promise<void> {
        await driver.quit()
    });
});

describe('Invalid email test', function (): void {
    this.timeout(0)

    let driver: WebDriver

    before(async function () {
        const webDriver = new BaseDriver()
        driver = await webDriver.initDriver()
    });
    it('should display an error for invalid email format ', async function () {
        const homePage: HomePage = new HomePage(driver)
        const actualHomeTitle: string = await homePage.homePageIsDisplayed()

        assert.strictEqual(actualHomeTitle, "SSL for everyday people")

        const authPage: AuthPage = await homePage.clickLoginBtn()
        const authTitle: string = await authPage.getAuthTitle()
        assert.strictEqual(authTitle, "Authorization")

        await authPage.fillEmailAndPasswordFields("test@@test.com")
        const passwordTypeBeforeClickEyeBtn: string = await authPage.getPasswordType()
        await authPage.clickBtnEye()
        const passwordTypeAfterClickEyeBtn: string = await authPage.getPasswordType()
        assert.notEqual(passwordTypeBeforeClickEyeBtn, passwordTypeAfterClickEyeBtn)

        await authPage.clickLoginBtn()

        const errorAnEmailText: string = await authPage.getErrorAnEmailText()
        assert.strictEqual(errorAnEmailText, "Uh oh! This\nisn’t an email")
    });
    after(async function (): Promise<void> {
        await driver.quit()
    });
});


describe('Not registered user test', function (): void {
    this.timeout(0)

    let driver: WebDriver

    before(async function () {
        const webDriver = new BaseDriver()
        driver = await webDriver.initDriver()
    });

    it('should display an error for not registered user', async function () {
        const homePage: HomePage = new HomePage(driver)
        const actualHomeTitle: string = await homePage.homePageIsDisplayed()

        assert.strictEqual(actualHomeTitle, "SSL for everyday people")

        const authPage: AuthPage = await homePage.clickLoginBtn()
        const authTitle: string = await authPage.getAuthTitle()
        assert.strictEqual(authTitle, "Authorization")

        await authPage.fillEmailAndPasswordFields(
            "testetsetstest@gmail.com",
            "jfjfsfjsdfjskskfjnirw fnriugr4w"
        )
        const passwordTypeBeforeClickEyeBtn: string = await authPage.getPasswordType()
        await authPage.clickBtnEye()
        const passwordTypeAfterClickEyeBtn: string = await authPage.getPasswordType()
        assert.notEqual(passwordTypeBeforeClickEyeBtn, passwordTypeAfterClickEyeBtn)

        await authPage.clickLoginBtn()

        const notifyText = await authPage.getNotifyText()
        assert.strictEqual(notifyText, "Uh oh! Email or password is incorrect")
    });

    after(async function (): Promise<void> {
        await driver.quit()
    });
});