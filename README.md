# ajc-jest-enzyme
Work in progress (21/05/2020)

An easy to import and use test framework module designed for use with JavaScript and ReactJs projects.

Driven by the [`jest`](https://jestjs.io/docs/getting-started) and [`enzyme`](https://enzymejs.github.io/enzyme/) modules.

Specifically the following types of testing are supported:

- Unit testing.
- Snapshot testing.
- Integration testing.

**Please note:** Accessibility testing is also supported when used in conjunction with the [`ajc-accessibility`](https://github.com/ajc24/ajc-accessibility) module. See the README documentation for that module for more information.

# Installation

Add the following entry to the `dependencies` or `devDependencies` section of your projects `package.json` file:

```
"ajc-jest-enzyme": "github:ajc24/ajc-jest-enzyme"
```

---

# Adding Jest Configuration Files

Create a `tests/jest-config` folder in your project workspace.

## Adding the `document.config.js` file

Create a file called `document.config.js` which is located at the path `<rootDir>/tests/jest-config/document.config.js` in your project workspace.

Add the following content to that file:

```javascript
import 'jsdom-global/register';

/* Ensure that all relevant functionality is present for document interactions */
global.document.createRange = () => ({
  getClientRects: () => [],
  selectNodeContents: () => {},
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
global.document.elementFromPoint = () => {};

/* Ensure that all relevant functionality is present for Element interactions */
Element.prototype.scrollIntoView = () => {};
```

---

## Adding the `enzyme.config.js` file

Create a file called `enzyme.config.js` which is located at the path `<rootDir>/tests/jest-config/enzyme.config.js` in your project workspace.

Add the following content to that file:

```javascript
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
 
Enzyme.configure({ adapter: new Adapter() });
```

## Adding the `unit.config.js` file

If you wish to execute ReactJs unit tests which take advantage of the files in this package then you will need to specify a `unit.config.js` file which is located at the path `<rootDir>/tests/jest-config/jest.config.js` in your project workspace.

Add the following content to that file:

```javascript
const { configureUnitTests } = require('ajc-jest-enzyme');

const jestConfig = configureUnitTests();

/* Add custom settings for your project if you wish */
jestConfig.setupFilesAfterEnv.push('<rootDir>/tests/jest-config/document.config.js');
jestConfig.coveragePathIgnorePatterns.push('<rootDir>/path-to/my-file-to/ignore.js');
jestConfig.maxConcurrency = 1;

module.exports = jestConfig;
```

### Default unit test path settings

Unit test paths are expected to match the following path:

- `<rootDir>/tests/unit/**/*.js`

You can specify a custom unit test path by setting `jestConfig.testMatch = [ ... your file(s) ... ]` in the content of this file.

### Default coverage ignored paths

The following directories are automatically ignored during coverage collection statistics:

- `<rootDir>/node_modules`
- `<rootDir>/tests/unit/coverage`

The coverage statistics are also set to be generated in the `<rootDir>/tests/unit/coverage` directory.

---

# The `TestDev` module

Use the included `TestDev` module to drive your unit, snapshot and / or integration tests. This module invokes APIs from [`enzyme`](https://enzymejs.github.io/enzyme/) and [`react-test-renderer`](https://reactjs.org/docs/test-renderer.html) in order to support this wide range of testing types.

## Import `TestDev` into your test files

Add the following import statement to the beginning of each of your test files:

```javascript
import { TestDev } from 'ajc-jest-enzyme';
```

If you are not using the `document.config.js` file as described [here](https://github.com/ajc24/ajc-jest-enzyme#adding-the-documentconfigjs-file) then you will need to manually import `jsdom-global/register` into each individual test file in your project by using you the following import statement at the beginning of each of your test files:

```javascript
import 'jsdom-global/register';
```

## `TestDev` module functionality

The following functions and functionality are provided as part of the `TestDev` module:

- [`createSnapshot(reactComponent)`](https://github.com/ajc24/ajc-jest-enzyme#createsnapshotreactcomponent)
- [`mountHtmlSnapshot(reactComponent)`](https://github.com/ajc24/ajc-jest-enzyme#mounthtmlsnapshotreactcomponent)
- [`mount(reactComponent)`](https://github.com/ajc24/ajc-jest-enzyme#mountreactcomponent)
- [`mountHtml(reactComponent)`](https://github.com/ajc24/ajc-jest-enzyme#mounthtmlreactcomponent)
- [`mountHtmlTemplate(reactComponent, htmlTitle)`](https://github.com/ajc24/ajc-jest-enzyme#mounthtmltemplatereactcomponent-htmltitle)
- [`shallow(reactComponent)`](https://github.com/ajc24/ajc-jest-enzyme#shallowreactcomponent)
- [`shallowHtml(reactComponent)`](https://github.com/ajc24/ajc-jest-enzyme#shallowhtmlreactcomponent)

### `createSnapshot(reactComponent)`:

Accepts a ReactJs component as a parameter. Returns a snapshot of the React component as `JSON` via the [`react-test-renderer`](https://reactjs.org/docs/test-renderer.html)`.create(reactComponent).toJSON()` functionality.

Designed for use with snapshot testing.

```javascript
const MyComponent = () => {
  <div><p>Hello World</p></div>
}

const jsonSnapshot = TestDev.createSnapshot(
  <React.Fragment>
    <MyComponent />
  </React.Fragment>
);
```

### `mountHtmlSnapshot(reactComponent)`:

Accepts a ReactJs component as a parameter. Fully renders the React component using [`enzyme.mount(reactComponent)`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/mount.html) in order to preserve the lifecycle functionality of the component. The function then creates the HTML output for the fully rendered component and returns a snapshot of this HTML output as `JSON`.

Designed for use with snapshot testing.

```javascript
const MyComponent = () => {
  <div><p>Hello World</p></div>
}

const htmlSnapshot = TestDev.mountHtmlSnapshot(
  <React.Fragment>
    <MyComponent />
  </React.Fragment>
);
```

### `mount(reactComponent)`:

Accepts a ReactJs component as a parameter. Fully renders the React component using [`enzyme.mount(reactComponent)`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/mount.html) in order to preserve the lifecycle functionality of the component.

Designed for use with unit, accessibility and integration testing.

```javascript
const MyComponent = () => {
  <div><p>Hello World</p></div>
}

const wrapper = TestDev.mount(
  <React.Fragment>
    <MyComponent />
  </React.Fragment>
);
```

### `mountHtml(reactComponent)`:

Accepts a ReactJs component as a parameter. Fully renders the React component using [`enzyme.mount(reactComponent)`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/mount.html) in order to preserve the lifecycle functionality of the component. The function then creates the HTML output for the fully rendered component and returns that HTML output.

Designed for use with unit, accessibility and integration testing.

```javascript
const MyComponent = () => {
  <div><p>Hello World</p></div>
}

const wrapperHtml = TestDev.mountHtml(
  <React.Fragment>
    <MyComponent />
  </React.Fragment>
);
```

### `mountHtmlTemplate(reactComponent, htmlTitle)`:

Accepts two parameters:

- The ReactJs component which is to be mounted inside the HTML template.
- The `htmlTitle` refers to the title of the HTML page, ie. the text content set to the `<title>` element in the DOM. The default value for this parameter is `Mounted HTML Template`.

Fully renders the HTML for the specified ReactJs component inside a full HTML template, ie. as if the component has been rendered inside a real DOM in a browser. The component is fully rendered and converted to HTML using the [`TestDev.mountHtml(reactComponent)`]().

Designed for use with accessibility testing.

```javascript
const MyComponent = () => {
  <div><p>Hello World</p></div>
}

const htmlTemplate = TestDev.mountHtmlTemplate(
  <React.Fragment>
    <MyComponent />
  </React.Fragment>,
  'My Component Template'
);
```

### `shallow(reactComponent)`:

Accepts a ReactJs component as a parameter. Shallow renders the React component using [`enzyme.shallow(reactComponent)`](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/shallow.html). Does not preserve the lifecycle functionality of the component.

Designed for use with unit, accessibility and integration testing.

```javascript
const MyComponent = () => {
  <div><p>Hello World</p></div>
}

const shallowWrapper = TestDev.shallow(
  <React.Fragment>
    <MyComponent />
  </React.Fragment>
);
```

### `shallowHtml(reactComponent)`:

Accepts a ReactJs component as a parameter. Shallow renders the React component using [`enzyme.shallow(reactComponent)`](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/shallow.html). Does not preserve the lifecycle functionality of the component. The function then creates the HTML output for the fully rendered component and returns that HTML output.

Designed for use with unit, accessibility and integration testing.

```javascript
const MyComponent = () => {
  <div><p>Hello World</p></div>
}

const shallowWrapperHtml = TestDev.shallowHtml(
  <React.Fragment>
    <MyComponent />
  </React.Fragment>
);
```

---
