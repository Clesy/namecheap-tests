import {Builder, WebDriver} from 'selenium-webdriver';

export class BaseDriver {
    private driver: WebDriver | undefined = undefined;

    public async initDriver(): Promise<WebDriver> {
        return new Builder().forBrowser('chrome').build();
    }

    public getDriver(): WebDriver {
        return <WebDriver>this.driver;
    }

    public async quitDriver(driver: WebDriver): Promise<void> {
        await driver.quit();
    }
}
