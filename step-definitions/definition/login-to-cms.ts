import { orgID, userName, passWord, submitButton } from '../selectors/login-page';
import { OurWorld } from '../../support/world';

export const login = async (driver: OurWorld, orgID: string, usrName: string, passWord: string) => {
  const page = driver.page;
  console.log('haha');
  await page.goto('');
  await page.fill(orgID, '');
  await page.fill(usrName, ');
  await page.fill(passWord, '');
  await page.click(submitButton);
};
