/// <reference types="cypress" />
import {Given, When, Then,} from "cypress-cucumber-preprocessor/steps"
import loginPage from "../Pages/LoginPage/LoginPage.cy";
import commonPage from "../Pages/CommonPage/CommonPage.cy";
let countryName
let mobileNumber,invalidNumber

//#region scenario 1
Given('the user with the following detials', async (table) => {
  let userDetails =  commonPage.readFromVerticalTable(table)
  countryName= userDetails.countryName
  mobileNumber=userDetails.mobileNumber
})
When("the user login", async() => {
  loginPage.sendLoginRequest(countryName,mobileNumber,"login")
});
Then("the OTP should be sent successfully", async() => {
  loginPage.validateLoginRequestStatusCode("@login",200)
});
Then("this message {string} should be returned", async(message) => {
  loginPage.validateLoginRequestResponseMessage("@login",message)
});
When("the user enter this OTP {string}", async(otp) => {
  loginPage.sendOTPVerificationRequest(otp,mobileNumber,"verifyOTP")
});
Then("the user should login successfully", async() => {
  loginPage.verifyOTPRequestStatusCode("@verifyOTP",200)
});
Then('this data should be returned', async (table) => {
  let userDetails = await commonPage.readFromVerticalTable(table)
  loginPage. validateUserDetails("@verifyOTP",userDetails.name,userDetails.email)
})
//#endregion

//#region scenario 2
  Given('the user login with {string} as countryName and {string} as mobileNumber', async (countryName,invalidNumber) => {
    countryName= countryName
    invalidNumber=invalidNumber    
});
When("the user login with invalid number", async() => {
  loginPage.sendLoginRequest(countryName,invalidNumber,"login")
});
Then("the OTP should not be sent successfully", async() => {
  loginPage.validateLoginRequestStatusCode("@login",404)
});
Then("this message {string} should be returned", async(message) => {
  loginPage.validateLoginRequestResponseMessage("@login",message)

});
//#endregion

//#region scenario 3
Given('the user with the following detials', async (table) => {
  let userDetails =  commonPage.readFromVerticalTable(table)
  countryName= userDetails.countryName
  mobileNumber=userDetails.mobileNumber
})
When("the user login", async() => {
  loginPage.sendLoginRequest(countryName,mobileNumber,"login")
});
Then("the OTP should be sent successfully", async() => {
  loginPage.validateLoginRequestStatusCode("@login",200)
});
Then("this message {string} should be returned", async(message) => {
  loginPage.validateLoginRequestResponseMessage("@login",message)
});
When("the user enter this OTP {string}", async(otp) => {
  loginPage.sendOTPVerificationRequest(otp,mobileNumber,"verifyOTP")
});
Then("the user should not login successfully", async() => {
  loginPage.verifyOTPRequestStatusCode("@verifyOTP",400)
});
Then("this message {string} should be returned for invalid otp", async(message) => {
  loginPage. validateInvalidOTPResponseMessage("@verifyOTP",message)
});
//#endregion
