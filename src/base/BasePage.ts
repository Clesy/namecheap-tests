import {WebDriver} from 'selenium-webdriver';
import {BaseConfig} from "../configs/BaseConfig";

export class BasePage {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async navigate(): Promise<void> {
        await this.driver.get(new BaseConfig().getBaseUrl());
    }
}
