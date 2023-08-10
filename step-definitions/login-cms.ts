import { Given, When, Then } from '@cucumber/cucumber';
import { OurWorld } from '../support/world';
import { login } from './definition/login-to-cms';
import { orgID, userName, passWord, submitButton } from './selectors/login-page';

Given('go to CMD page', async function (driver: OurWorld) {
  const page = driver.page;
  console.log('haha');
  await page.goto('https://administration.manabie.net/');
  await page.fill(orgID, 'synersia');
  await page.fill(userName, ');
  await page.fill(passWord, '');
  await page.click(submitButton);
});
