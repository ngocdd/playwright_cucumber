# About
## Setup project
#### install playwight/cucumber/typescript/ts-node
Create a new, empty folder and run npm init to start a new npm project. Or use the -y option (shorthand for --yes) to skip the questions and just use the default config: npm init -y. This will create a package.json file.

Next up, install our dependencies from yarn:
```
yarn create playwright
```
```
yarn add @cucumber/cucumber
```
```
yarn add typescript
```
```
yarn add ts-node
```
```
yarn add @types/node
```
Note the -D is short hand for --save-dev. We don't need separate @types dependencies for Cucumber and Playwright as they both come bundled with TypeScript definitions.

Now we have our project scaffolded we can setup TypeScript and Cucumber.js. Then we'll write our features and step definitions. But first we need to setup TypeScript.

### Setup TypeScript

Run npx -p typescript tsc --init on the command line to generate a tsconfig.json. If you've never used npx, then no, it's not a spelling mistake. npx is a command that comes with npm 5.2 onwards that allows you to execute a command from an npm package, without having to install it globally first. The -p command is short for package and it's needed here because the command (tsc) is different from the package (typescript).

The generated tsconfig.json contains all the possible config options, with most of them commented out. It also contains a simple explanation of each one. So it's a good way to set up get started with TypeScript config.

Disable type checking and just do transpilation for ts-node. We can use a separate task just for type checking, so the transiplation is quicker when we're running the tests. Add the following to the tsconfig.json:
```json
{
  "ts-node": {
    "transpileOnly": true
  },
  "compilerOptions": {
  }
```
Now that we have TypeScript configured, we need to set up Cucumber.js.

### Setup Cucumber.js
We'll set up cucumber to:

load ts-node/register to allow us to write step definitions in TypeScript
load a setup file (test.setup.ts) to configure Playwright
load step definitions from a step-definitions directory
run feature files from a features directory.
Add the following command to your package.json. This will allow us to run npm test on the command line:
```json
{
  "scripts": {
    "test": "cucumber-js features/**/*.feature --require-module ts-node/register --require test.setup.ts --require step-definitions/**/*.ts"
  }
}
```
Before we can run the command, we need to add the test setup file, step definitions and feature files. Let's start with the test setup.

### Test setup file
We'll make use of two Cucumber.js features to set up our tests: Before, After, BeforeAll and AfterAll hooks and the 'World' instance. Scenario hooks allow you to run code before and after test runs and are a great place to intialise things. The World instance is, to quote the Cucumber.js docs:

an isolated context for each scenario, exposed to the hooks and steps as this.

In our case, the initialisation is the Playwright instances - the browser, context and page, the core concepts of Playwright. Browser instances in Playwright are expensive so we'll only create an instance once for all tests. We'll use a BeforeAll for this and an AfterAll to destory it. Contexts and pages in Playwright are cheap so we'll use a new one per test with a Before (and After) hook. We'll store the context and page on the World instance so they're available in each step definition as this.page and this.context.

But first, we need to create a TypeScript type that represents our World instance. We'll extend the built in World type from Cucumber. Create a types.ts file with the following:
```ts
import { World as CucumberWorld } from "@cucumber/cucumber";
import { BrowserContext, Page } from "playwright";
export interface OurWorld extends CucumberWorld {
  context: BrowserContext;
  page: Page;
}
```
Next, we need to setup Playwright. Create a test.setup.ts with the following. It's got comments throughout which should explain what it's doing:
```ts
// test.setup.ts
import { Before, BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import { devices, chromium } from "playwright";
import { OurWorld } from "./types";
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
  const pixel2 = devices["Pixel 2"];
  this.context = await global.browser.newContext({
    viewport: pixel2.viewport,
    userAgent: pixel2.userAgent,
  });
  this.page = await this.context.newPage();
});
// Cleanup after each scenario
After(async function (this: OurWorld) {
  await this.page.close();
  await this.context.close();
});
```
Step definitions can then access this.browser, this.context and this.page. This makes use of a TypeScript feature for defining the type of this in a function. But be warned: because we're using this in step definitions, we have to use proper functions rather than arrow functions. Arrow functions use what's known as 'lexical scoping', that is this uses normal variable rules to get the value for this based on where the function is defined.

Now that we've got a type definition for our World instance and have setup Playwright, we can write our step definitions.

### Write a step definition
A step definition is a an expression in combination with a JavaScript (or in our case, TypeScript) function. The expression forms the text that will go in the feature file, and the function is what is called when that step executes. We'll use the function to control the browser using Playwright.

Create a step-definitions folder, and a file called homepage.ts. This file can actually be called anything with a ts extension: our Cucumber command uses a glob to load all step definitions: --require step-definitions/**/*.ts.

We'll write a simple use case of 3 step definitions with given, when, then. We'll use a cucumber expression, a regular expression and a string to show the different types. Again the following is commented to explain what's going on.
```ts
// step-definitions/homepage.ts
import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { OurWorld } from "../types";
// Using a cucumber expression
Given("I view {string}", async function (this: OurWorld, url: string) {
  // Use the page instance from the World instance to navigate
  await this.page.goto(`https://${url}`);
});
// Using a regular expression
When(/^I click '([^']*)'$/, async function (this: OurWorld, text: string) {
  // Scroll to the link...
  await this.page.$eval(`"${text}"`, (element) => {
    element.scrollIntoView();
  });
  // ...then click it now it's within the viewport
  await this.page.click(`"${text}"`);
});
Then("I expect to be on the accessibility page", async function (
  this: OurWorld
) {
  const heading1Text = (await this.page.textContent("h1")) as string;
  assert.strictEqual(
    trimExcessWhiteSpace(heading1Text),
    "Accessibility statement"
  );
});
// textContent includes whitespace, so use this method to trim
// See https://stackoverflow.com/a/42921059
const trimExcessWhiteSpace = (s: string) =>
  s.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
```
Now we have our step definitions, we can now combine them into a feature file to write a test.

### Write a feature
Our feature file will use the step definitions we've just created. We'll run a test against the gov.uk homepage, to assert that you can click the link in the footer to the accessibiltiy statement.

Create a file called homepage.feature in the features directory, and paste the following:
```gherkin
Feature: Random
  A random feature using some Playwright stuff
Scenario: Govuk accessibility statement link
  Given I view 'www.gov.uk'
  When I click 'Accessibility statement'
  Then I expect to be on the accessibility page
```
That's not the most exciting test in the world but hopefully it shows enough of how to use Cucumber.js.

Now it's all hooked up, run npm test on the command line and you should see something like:

1 scenario (1 passed) 3 steps (3 passed)

And that's it - automated tests running in the browser!

