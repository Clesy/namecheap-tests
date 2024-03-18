import {By, WebDriver} from "selenium-webdriver";
import {BaseElement} from "../base/BaseElement";
import {BasePage} from "../base/BasePage";
import {ProfileFormPopup} from "./popup/ProfileFormPopup";

export class ProfilePage extends BasePage {
    // Xpath Selectors
    private profileItemsTerms: By = By.xpath("//div[contains(@class, 'item')]//div[contains(@class,'terms')]")
    private profileItemsDescription: By = By.xpath("./parent::div[contains(@class, 'item')]//div[contains(@class,'description')]")
    private editProfileItem: By = By.xpath("./parent::div[contains(@class, 'item')]//button[contains(@class,'flat-dark') and not(@name='supportPin')]")
    private supportPinBtn: By = By.xpath("//button[@name='supportPin']")
    private toggleBtn: By = By.xpath("//button[contains(@class,'toggle-btn')]")
    private profileTitle: By = By.xpath("//h1[normalize-space()='Profile']")

    constructor(driver: WebDriver) {
        super(driver);
    }


    public async getProfileDescription() {
        const items = await BaseElement.finds(this.driver, this.profileItemsTerms);
        let data: Array<any> = [];

        for (const item of items) {
            let parentElement = await item.getText()

            if (parentElement == "Newsletter") {
                let item = await this.isToggleButtonEnabled()
                data.push(item)
            }

            const descriptionData = await BaseElement
                .waitForElementVisible(this.driver, await item.findElement(this.profileItemsDescription))

            let description = await descriptionData.getText()
            if (description)
            data.push(await descriptionData.getText())
        }

        return data
    }

    public async getProfileItems() {
        const profileFormPopup: ProfileFormPopup = new ProfileFormPopup(this.driver);
        const items = await BaseElement.finds(this.driver, this.profileItemsTerms);

        for (const item of items) {
            let parentElement = await item.getText()

            if (parentElement != "Support pin" && parentElement != "Newsletter") {
                const editProfile = await BaseElement
                    .waitForElementVisible(this.driver, await item.findElement(this.editProfileItem))
                await editProfile.click()

                if (parentElement == "Email") {
                    await profileFormPopup.fillEmailField()
                } else if (parentElement == "Password") {
                    await profileFormPopup.fillPasswordFields()
                } else {
                    await profileFormPopup.clickSaveBtn()
                }
            }

            if (parentElement == "Support pin") {
                await this.clickSupportPinBtn()
            } else if (parentElement == "Newsletter") {
                await this.clickToggleBtn()
            }
        }
    }

    public async getProfileTitle() {
        return await BaseElement.getText(this.driver, this.profileTitle)
    }

    public async clickSupportPinBtn() {
        await BaseElement.click(this.driver, this.supportPinBtn)
    }

    public async clickToggleBtn() {
        await BaseElement.click(this.driver, this.toggleBtn)
    }

    private async isToggleButtonEnabled() {
        const el = await BaseElement.find(this.driver, this.toggleBtn)
        return await el.getAttribute("class")
    }
}