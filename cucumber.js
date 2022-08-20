module.exports = {
  default: {
    parallel: 1,
    // format: ['html:cucumber-report.html'],
    paths: ['features/**/*.feature'], // path for feature files
    requireModule: ['ts-node/register'],
    require: ['support/common-hooks.ts', 'step-definitions/**/*.ts'], // path for step definitions,
    publishQuiet: true,
  },
};
