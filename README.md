# [Darwin](http://darwinapp.co/)

[![Build Status](https://travis-ci.org/felina/web.png?branch=master)](https://travis-ci.org/felina/web)

This is the web interface for Darwin, a system for crowdsourcing wildlife media for use in computer vision research.

## Installation

First install [Node.js](http://nodejs.org/), which is needed for the build tools. This comes with npm, Node's package manager. Then run the following commands to build the site.

```bash
npm install -g bower grunt-cli  # Install globally required build tools
npm install    # Install development dependencies
bower install  # Install third-party client-side JavaScript libraries like jQuery
make build     # Build the site
grunt connect  # Run a local server to preview it
```

The website will then be accessible at `http://localhost:9000/`

## Structure

The project is structured as follows:

- `data/`: Static JSON configuration data and dummy data for testing.
- `html/`:  Static HTML, both full pages and shared fragments that are assembled at compile-time.
- `img/`: All images, including sample wildlife photograhy and icons.
- `js/`: First-party JavaScript modules.
- `stylus/`: Stylus stylesheets that are compiled to CSS at compile-time.
- `templates/`: HTML templates with variable placeholders that are dynamically populated with data from the server inserted into the DOM with JS at run-time.
- `test/`: Unit test spec files.

## Development

### Building

Run `grunt watch` to automatically rebuild the site as you develop it. Note, to copy over images and vendor scripts to the build directory you must manually run `make build` for performance reasons, but everything else can be automated.

### Testing

Run `grunt test` to run the unit tests from the command line in a headless Webkit instance.
Run `grunt connect:test` to start a local webserver, then visit `http://localhost:9001/test/` to run the tests in a browser.

### Documentation

Run `grunt jsdoc` to build the documentation. It can then be found in the `doc` directory.

### Installing

To install new packages, run `bower install --save <package>`. You'll then need to update the Gruntfile to copy the necessary files from this package over to the site, and link them to the particular HTML pages that require them. Once this is done, run `grunt rsync` to copy everything over.

## Collaborators

- [Giles Lavelle](https://github.com/lavelle)
- [Alistair Wick](https://github.com/Wacov)
- [Andrew Stuart](https://github.com/narayn60)

## License

[MIT licensed](https://github.com/felina/web/blob/master/LICENSE)

Copyright (c) 2013-2014 Team Heisenberg
