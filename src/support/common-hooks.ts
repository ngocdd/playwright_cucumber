// test.setup.ts
import { Before, BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import { OurWorld } from "../support/cucumber-world";
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
  request,
} from '@playwright/test';


var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;


BeforeAll(async function () {
  // Browsers are expensive in Playwright so only create 1
  global.browser = await chromium.launch({
    // Not headless so we can watch test runs
    headless: false,
    // Slow so we can see things happening
    slowMo: 50,
  });
});

AfterAll(async function () {
  await global.browser.close();
});

// Create a new test context and page per scenario
Before(async function (this: OurWorld) {
  this.context = await global.browser.newContext({
    viewport: { width: 1200, height: 800 },
  });
  this.page = await this.context.newPage();
});

// Cleanup after each scenario
After(async function (this: OurWorld) {
  await this.page.close();
  await this.context.close();
});