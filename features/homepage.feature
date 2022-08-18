Feature: Random
  A random feature using some Playwright stuff
  
  #TCID: lm-mapped-id-required-when-creating-quiz-001
  Scenario: test home page
    Given go to google page
    When search ngocdd
    Then see ngocdd in result page