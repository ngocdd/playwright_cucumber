Feature: test textbox in demoqa site

  Background: 
    Given go to demoqa site
    And Go to element page
    And go to textbox pages

  Scenario Outline: user input validate information and submit
    Given Input "<user-name>"
    And Input "<email>"
    And Input "<current-address>"
    And Input "<permanent-address>"
    When User submit
    Then User sees submit is successfully

    Examples: 
      | user-name | email            | current-address | permanent-address |
      | dang ngoc | ngocdd@gmail.com | Ha Noi          | Ha Noi            |
