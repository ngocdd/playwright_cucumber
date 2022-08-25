# ESLint and Prettier

## Install ESLint and Prettier

```
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

## Typescript lint

### Step 1: Installation

```
yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript

```

### Step 2: Configuration

Next, create a .eslintrc.cjs config file in the root of your project, and populate it with the following:

```
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};
```

### Step 3: Running ESLint

```
yarn eslint .
```
