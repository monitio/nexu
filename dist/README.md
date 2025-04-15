> [!WARNING]
> This package is discontinued. Please use the more useful and updated package for Astro called [Naxer](https://github.com/monitio/naxer)

# Nexu
A ***WIP*** web **TS** framework running using a vite-plugin.

---

<a href="https://www.npmjs.com/package/@monitio/nexu">
  <img src="https://custom-icon-badges.demolab.com/badge/Package-NPM-red?style=for-the-badge&logo=npm&logoColor=white" />
</a>
<a href="https://yarnpkg.com/package?q=@monitio/nexu&name=@monitio/nexu">
  <img src="https://custom-icon-badges.demolab.com/badge/Package-Yarn-blue?style=for-the-badge&logo=yarn&logoColor=white" />
</a>

---

## Example:
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + Nexu</title>
</head>
<body>
  <p>Working!</p>
</body>
```

## Features:
- [x] Removal of `<!DOCTYPE html>` and the HTML tags (`<html>`)
- [ ] Custom Nexu-only Router
- [ ] Custom Components

## New Project:
Make a new project using the latest version of Nexu by running the Installation commands below and then either `nexu new` or `nexu create` in a terminal.

## Installation:
### NPM:
> [!WARNING]
> You will need to have the NPM global folder in PATH for global to work. Sometimes this is automatically done by NPM when installing.

- Globally:
    1. Install using `npm -g i @monitio/nexu`
    2. Run `nexu` in a terminal.
- Non-Globally:
    1. Run using `npx @monitio/nexu@latest`
    2. This will ask if you want to install the Nexu CLI once so you will need to say `y` or `yes`.

### YARN:
> [!TIP]
> There is no way of running tools like NPX does with Yarn so you will need to install globally.

> [!WARNING]
> You will need to have the Yarn global folder in PATH for global to work. Sometimes this is automatically done by Yarn when installing.

- Globally:
    1. Install using `yarn global add @monitio/nexu`
    2. Run `nexu` in a terminal.
