import { World } from '@cucumber/cucumber';
import { BrowserContext, Page } from 'playwright';
export interface OurWorld extends World {
  context: BrowserContext;
  page: Page;
}
