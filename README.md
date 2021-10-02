<div align="center">
    <h1>node-hastebin</h1>
    <img alt="npm Version" src="https://img.shields.io/npm/v/node-hastebin?style=for-the-badge">
    <img alt="npm Downloads" src="https://img.shields.io/npm/dw/node-hastebin?style=for-the-badge">
    <br>
</div>

## Table of contents
- [Table of contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)
- [Contributing](#contributing)

## About

Dependency-free [Node.js](https://nodejs.org/) module to interact with HasteBin servers.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install node-hastebin:

```bash
npm install node-hastebin --production
```

## Usage

```javascript
const Hastebin = require("./index.js");
const hastebin = new Hastebin();

hastebin.write("Hello, World!").then((key) => {
    hastebin.read(key).then((data) => {
        console.log(data);
    });
});
```

## Links

- [npm](https://www.npmjs.com/package/node-hastebin)
- [GitHub](https://github.com/MoaufmKlo/node-hastebin)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
