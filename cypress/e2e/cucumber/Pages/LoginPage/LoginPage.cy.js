import commonPage from "../CommonPage/CommonPage.cy";
import urls from "../../urls.js";

class LoginPage {

  /**
   * this function to send login request
   * @param {*} countryName 
   * @param {*} mobilreNumber 
   * @param {*} aliasResponse 
   */
  async sendLoginRequest(countryName, mobilreNumber, aliasResponse) {
    let countryId = commonPage.mapCountryWithCountryId(countryName)
    let payload = { "country_id": countryId, "application_type": "patient", "mobile": mobilreNumber }
    commonPage.sendRequest('POST', urls.sendOTP, payload, aliasResponse)
  }

  /**
   * this function to  OTP verification request
   * @param {*} otp 
   * @param {*} mobilreNumber 
   * @param {*} aliasResponse 
   */
  async sendOTPVerificationRequest(otp, mobilreNumber, aliasResponse) {
    let payload = { "code": otp, "mobile": mobilreNumber, "application_type": "patient", "id_token": "" }
    commonPage.sendRequest('POST', urls.verifyOTP, payload, aliasResponse)
  }

  /**
   * this function to validation login request status code
   * @param {*} responseBody 
   * @param {*} statusCode 
   */
  validateLoginRequestStatusCode(responseBody, statusCode) {
    cy.get(responseBody).should((response) => {
      expect(response.status).to.equal(statusCode)
    })
  }

  /**
   * this function to  validate OTP verification request status code
   * @param {*} responseBody 
   * @param {*} statusCode 
   */
  verifyOTPRequestStatusCode(responseBody, statusCode) {
    cy.get(responseBody).should((response) => {
      expect(response.status).to.equal(statusCode)
    })
  }

  /**
   * this function to validation login request response message
   * @param {*} responseBody 
   * @param {*} message 
   */
  validateLoginRequestResponseMessage(responseBody, message) {
    cy.get(responseBody).should((response) => {
      expect(response.body.message).to.equal(message)
    })
  }

  /**
   * this function to  validate OTP verification response message
   * @param {*} responseBody 
   * @param {*} message 
   */
  validateInvalidOTPResponseMessage(responseBody, message) {
    cy.get(responseBody).should((response) => {
      expect(response.body.message).to.equal(message)
    })
  }

  /**
   * this function to validate user details after succeffuly login
   * @param {*} responseBody 
   * @param {*} name 
   * @param {*} email 
   */
  validateUserDetails(responseBody, name, email) {
    cy.get(responseBody).should((response) => {
      expect(response.body.data.name).to.equal(name)
      expect(response.body.data.email).to.equal(email)
    })
  }

}


const login = new LoginPage();
export default login;