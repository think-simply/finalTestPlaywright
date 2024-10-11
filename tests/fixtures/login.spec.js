const { test } = require('@playwright/test');
import { PageFactory } from "../pages/pageFactory"

import {
    LOGINURL,
    INVALID_USERNAME,
    INVALID_PASSWORD,
    USERNAME,
    PASSWORD,
    NO_USERNAME,
    NO_PASSWORD
} from "../object_repository/data"

import {
    INVALID_LOGIN_MESS,
    USERNAME_LOGIN_MESS,
    PASS_LOGIN_MESS
} from "../application-content/loginMess"
// FINAL TEST 
test.describe('Login feature', () => {
    //testcase1: should display correct error message when user input invalid credential
    test('1. should display correct error message when user input invalid credential', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.LoginPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(INVALID_USERNAME, INVALID_PASSWORD);
        await pageFactory.LoginPage().validateMessage(INVALID_LOGIN_MESS)
        await page.pause();
    });

    // testcase2: should navigate to dashboard page when login with valid credential
    test('2. should navigate to dashboard page when login with valid credential', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.LoginPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, PASSWORD);
        await pageFactory.InventoryPage().validateInventoryPageExist();
        await page.pause();
    });

    //testcase3: Check message leave username null
    test('3.1 should display correct error message when leave username null', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.LoginPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(NO_USERNAME, PASSWORD);
        await pageFactory.LoginPage().validateMessage(USERNAME_LOGIN_MESS)
        await page.pause();
    });
    test('3.2 should display correct error message when leave password null', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.LoginPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, NO_PASSWORD);
        await pageFactory.LoginPage().validateMessage(PASS_LOGIN_MESS)
        await page.pause();
    });
})