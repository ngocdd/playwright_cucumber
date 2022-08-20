# Gherkin lints

```
Available rules
Name	Functionality
no-tags-on-backgrounds *	Disallows tags on Background
one-feature-per-file *	Disallows multiple Feature definitions in the same file
up-to-one-background-per-file *	Disallows multiple Background definition in the same file
no-multiline-steps *	Disallows mutiline Steps
allowed-tags	Just the listed tags are allowed
file-name	Restrict feature file names to a commmon style
indentation	Allows the user to specify indentation rules
max-scenarios-per-file	Allows the user to specify the max number of scenarios per feature file
name-length	Allows restricting length of Feature/Scenario/Step names
new-line-at-eof	Disallows/enforces new line at EOF
no-background-only-scenario	Disallows background when there is just one scenario
no-dupe-feature-names	Disallows duplicate Feature names
no-dupe-scenario-names	Disallows duplicate Scenario names
no-duplicate-tags	Disallows duplicate tags on the same Feature or Scenario
no-empty-background	Disallows features with backgrounds without steps
no-empty-file	Disallows empty feature files
no-examples-in-scenarios	Disallow the use of "Examples" in Scenarios, only allowed in Scenario Outlines
no-files-without-scenarios	Disallows files with no scenarios
no-homogenous-tags	Disallows tags present on every Scenario in a Feature, rather than on the Feature itself
no-multiple-empty-lines	Disallows multiple empty lines
no-partially-commented-tag-lines	Disallows partially commented tag lines
no-restricted-patterns	A list of patterns to disallow globally, or specifically in features, backgrounds, scenarios, or scenario outlines
no-restricted-tags	Disallow use of particular @tags
no-scenario-outlines-without-examples	Disallows scenario outlines without examples
no-superfluous-tags	Disallows tags present on a Feature and a Scenario in that Feature
no-trailing-spaces	Disallows trailing spaces
no-unnamed-features	Disallows empty Feature name
no-unnamed-scenarios	Disallows empty Scenario name
no-unused-variables	Disallows unused variables in scenario outlines
one-space-between-tags	Tags on the same line must be separated by a single space
required-tags	Require tags/patterns of tags on Scenarios
scenario-size	Allows restricting the maximum number of steps in a scenario, scenario outline and background
use-and	Disallows repeated step names requiring use of And instead
keywords-in-logical-order	Requires that Given, When and Then appear in logical sequence
```

https://www.npmjs.com/package/gherkin-lint
