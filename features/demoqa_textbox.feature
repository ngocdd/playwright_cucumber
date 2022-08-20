Feature: test textbox in demoqa site

  Scenario Outline: user input validate information and submit
    Given Input "<user-name>"
    And Input "<email>"
    And Input "<current-address>"
    And Input "<permanent-address>"
    And User submit
    Then User sees submit is successfully

    Examples: 
      | user-name | email | current-address | permanent-address |
