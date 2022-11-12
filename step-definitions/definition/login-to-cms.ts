import { orgID, userName, passWord, submitButton } from '../selectors/login-page';
import { OurWorld } from '../../support/world';

export const login = async (driver: OurWorld, orgID: string, usrName: string, passWord: string) => {
  const page = driver.page;
  console.log('haha');
  await page.goto('https://administration.manabie.net/');
  await page.fill(orgID, 'synersia');
  await page.fill(usrName, 'phuc.chau+e2etokyoschooladmin@manabie.com');
  await page.fill(passWord, 'Manabie123');
  await page.click(submitButton);
};
