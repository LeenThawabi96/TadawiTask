Feature: Login Using Mobile number and OTP verification
  the user login using mobile number and OTP.

  Scenario: Login using a valid mobile number and valid OTP
    Given the user with the following detials
      | countryName  | Turkey        |
      | mobileNumber | +905526384478 |
    When the user login
    Then the OTP should be sent successfully
    Then this message "تم ارسال الرمز بنجاح" should be returned
    When the user enter this OTP "111111"
    Then the user should login successfully
    Then this data should be returned
      | name  | Ahmad                    |
      | email | ahmad_alhajh@hotmail.com |

  Scenario: Login using invalid mobile number
    Given the user login with "Turkey" as countryName and "+905" as mobileNumber
    When the user login with invalid number
    Then the OTP should not be sent successfully
    Then this message "The route / could not be found." should be returned

  Scenario: Login using a valid mobile number and invalid otp
    Given the user with the following detials
      | countryName  | Turkey          |
      | mobileNumber | "+905526384478" |
    When the user login
    Then the OTP should be sent successfully
    Then this message "تم ارسال الرمز بنجاح" should be returned
    When the user enter this OTP "222222"
    Then the user should not login successfully
    Then this message "الرمز غير صالح" should be returned for invalid otp