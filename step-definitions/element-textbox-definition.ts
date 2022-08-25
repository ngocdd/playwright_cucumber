import { elementPage } from './selectors/element-textbox-locators';
import { OurWorld } from '../support/world';

async function inputFullName(this: OurWorld, name: string) {
  const page = this.page;
  await page.fill(elementPage.fullName, name);
}

export {};
