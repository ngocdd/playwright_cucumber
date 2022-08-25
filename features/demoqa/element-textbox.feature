Feature: test textbox in demoqa site

  Background: 
    Given Go to demoqa site
    And Go to element page
    And Go to textbox page

  Scenario Outline: User input validate information and submit
    Given Input "<user_name>"
    And Input "<email>"
    And Input "<current_address>"
    And Input "<permanent_address>"
    When User submit
    Then User sees submit is successfully

    Examples: 
      | user_name | email            | current_address | permanent_address |
      | dang ngoc | ngocdd@gmail.com | Ha Noi          | Ha Noi            |
