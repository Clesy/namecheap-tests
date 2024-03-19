import {By, until, WebDriver, WebElement} from 'selenium-webdriver';

export class BaseElement {

    public static async find(driver: WebDriver, selector: By, time: number = 10000): Promise<WebElement> {
        let element: WebElement = await driver.wait(until.elementLocated(selector), time);
        return driver.wait(until.elementIsVisible(element), time)
    }

    public static async waitForElementVisible(driver: WebDriver, element: WebElement, timeout: number = 10000) {
        const el = await driver.wait(async () => {
            return (await element.isEnabled()) ? element : false;
        }, timeout);

        if (el instanceof WebElement) return el
        else throw new Error("Element not found")
    }

    public static async finds(driver: WebDriver, selector: By, time: number = 10000): Promise<WebElement[]> {
        let elements: WebElement[] = await driver.wait(until.elementsLocated(selector), time);
        await this.find(driver, selector)
        return elements
    }

    public static async click(driver: WebDriver, selector: By): Promise<void> {
        const element: WebElement = await this.find(driver, selector);
        await element.click();
    }

    public static async sendKeys(driver: WebDriver, selector: By, keys: string): Promise<void> {
        const element: WebElement = await this.find(driver, selector);
        await element.sendKeys(keys);
    }

    public static async getText(driver: WebDriver, selector: By): Promise<string> {
        const element: WebElement = await this.find(driver, selector);
        return await element.getText()
    }
}
