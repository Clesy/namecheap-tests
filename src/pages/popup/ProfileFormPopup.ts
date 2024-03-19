import {By} from "selenium-webdriver";
import {BasePage} from "../../base/BasePage";
import {BaseElement} from "../../base/BaseElement";
import {BaseConfig} from "../../configs/BaseConfig";

export class ProfileFormPopup extends BasePage {
    private currentPassword = By.css("input[placeholder='Current password']")
    private newPassword = By.css("input[placeholder='New password']")
    private confirmPassword = By.css("input[placeholder='Confirm password']")
    private saveBtn = By.xpath("//div[@class='edit-box']//button[@type='submit'][normalize-space()='Save']")

    public async fillPasswordFields(oldPassword: string = new BaseConfig().getPassword(),
                                    newPassword: string = new BaseConfig().getPassword()
    ) {
        await BaseElement.sendKeys(this.driver, this.currentPassword, oldPassword)
        await BaseElement.sendKeys(this.driver, this.newPassword, newPassword)
        await BaseElement.click(this.driver, this.saveBtn)
    }

    public async fillEmailField(confirmPassword: string = new BaseConfig().getPassword()) {
        await BaseElement.sendKeys(this.driver, this.confirmPassword, confirmPassword)
        await BaseElement.click(this.driver, this.saveBtn)
    }

    public async clickSaveBtn() {
        await BaseElement.click(this.driver, this.saveBtn)
    }
}