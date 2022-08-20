import {Given, When, Then} from "@cucumber/cucumber"
import { expect } from "@playwright/test";
import { OurWorld } from "../support/cucumber-world";


Given('go to google page', async function (this:OurWorld) {
    // Write code here that turns the phrase above into concrete actions
    const page = this.page;
    await page.goto('https:\\google.com')
    await page.once('load', () => console.log('Page loaded!'));
    await page.screenshot({ path: 'screenshots/1.png', fullPage: true });
});

When('search ngocdd', async function (this:OurWorld) {
    const page = this.page;
    await page.fill("input[name='q']","ngocdd");
    await page.keyboard.press('Enter');
    await page.once('load', () => console.log('Page loaded!'));
    await page.screenshot({ path: 'screenshots/2.png', fullPage: true });
});

Then('see ngocdd in result page', async function (this:OurWorld) {
    const page = this.page;
    const a = await page.textContent("input.gLFyf.gsfi");
    page.once('load', () => console.log('Page loaded!'));
    await page.screenshot({ path: 'screenshots/3.png', fullPage: true });
    console.log(a);
});
