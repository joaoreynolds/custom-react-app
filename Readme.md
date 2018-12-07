# Custom React App (custom-react-app) #

## Motivation

I know, ONE MORE react seed project. I built this for my own use, so take it for what it is. As a freelancer I find myself creating a new project every couple of months. I would typically create via `create-react-app` and then promptly eject, allowing me to fully customize the build based on my situation.

Well, I got sick of all the extra boilerplate and code that came with an ejected `create-react-app`. If I don't want to use `less` or `scss`, I don't want all the config for it. And even though `create-react-app` allows you to specify which you want to use, the config code was all there.

Plus, I would often run into situations while making customizations to my build, a lot of magic that I wanted to understand or modify was built-in to `react-scripts`.

## A simple, straightforward setup

So this bootstrap is highly influenced by `create-react-app`, but it does not depend on `react-scripts`, and the dev scripts (build, test, etc) are much more straightforward. So, if you ever need to modify anything (as you should), you'll find that the config in large matches what is done in samples and guides from `webpack` and `babel`. Overall, this should be easy to interpret and follow.

## Development ##

### Dev and Build Process ###

Requirements: Nodejs is required on the development machine: https://nodejs.org/en/download/

Download npm dependencies if you haven't already: `npm install`

`npm start` will setup a server and render the site at http://localhost:3200/

`npm run build` should be run on deployment and packages files into the `/build` directory.

### Setting up environment build variables ###

Variables used for the different build environments are found at `config/.env` (for development). To set them up make a copy of the `.env-sample` file and rename it `.env`

Env variables used in the app must begin with `REACT_APP_`.

### API ###

The API Guide can be found at http://rewrite.ridesystems.net/api/help

### Testing ###

Tests are run automatically on the git pre-commit hook - so when you run `git commit`, tests (and linting) will run first. When developing tests, you can run `npm test` and your files will be watched.

Our convention is: create test files in the same directory as the source file with the same name and `test.js` on the end. For example: `Button.js` would have a test `Button.test.js` in the same directory. We're using `jest` to run our tests (https://facebook.github.io/jest/) along with `enzyme` (http://airbnb.io/enzyme/) to access the component/dom within our tests. Tests are linted on the pre-commit hook using the same rules as the regular development process.

### Pre-Commit Hook

This app has a precommit hook which was installed automatically with the npm module `pre-commit`. You can configure what scripts are executed in the `pre-commit` property in `package.json`. Out of the box this will lint and run tests.
