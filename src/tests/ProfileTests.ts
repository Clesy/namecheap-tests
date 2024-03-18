import {BaseDriver} from "../base/BaseDriver";
import {HomePage} from "../pages/HomePage";
import {AuthPage} from "../pages/AuthPage";
import {MySSLPage} from "../pages/MySSLPage";
import {ProfilePage} from "../pages/ProfilePage";
import {assert} from "chai";
import {WebDriver} from "selenium-webdriver";

describe('Invalid email test', function (): void {
    this.timeout(0);

    let beforeProfileDescription: any[];
    let driver: WebDriver;

    before(async function () {
        const webDriver = new BaseDriver();
        driver = await webDriver.initDriver()

        const homePage: HomePage = new HomePage(driver)
        await homePage.homePageIsDisplayed()
        const authPage: AuthPage = await homePage.clickLoginBtn()
        await authPage.fillEmailAndPasswordFields()
        const mySslPage: MySSLPage = await authPage.clickLoginBtn()

        await mySslPage.clickProfileBtn()
        const profilePage: ProfilePage = await mySslPage.goToProfile()

        await profilePage.getProfileItems()
        beforeProfileDescription = await profilePage.getProfileDescription()

        await mySslPage.clickProfileBtn()
        await mySslPage.logOut()
    });

    it('should display an error for invalid email format ', async function () {
        const authPage = new AuthPage(driver)
        await authPage.getAuthTitle()
        await authPage.fillEmailAndPasswordFields()
        const mySslPage: MySSLPage = await authPage.clickLoginBtn()

        await mySslPage.clickProfileBtn()
        const profilePage: ProfilePage = await mySslPage.goToProfile()

        assert.strictEqual(await profilePage.getProfileTitle(), "Profile")

        const afterProfileDescription: any[] = await profilePage.getProfileDescription()

        assert.equal(beforeProfileDescription, afterProfileDescription)


    });
    after(async function (): Promise<void> {
        await driver.quit()
    });
});
