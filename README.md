# Project Felina - Website

This is the web interface for Project Felina, a system for crowdsourcing wildlife media for use in computer vision research.

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

- `data/`: Contains dummy JSON data
- `html/`: Contains static HTML, both full pages and shared fragments, that are assembled at compile-time.
- `img/`: All images, including sample wildlife photograhy and icons.
- `js/`: First-party JavaScript modules
- `stylus`: Stylus stylesheets that are compiled to CSS at compile-time.
- `templates`: HTML templates with variable placeholders that are dynamically populated with data from the server inserted into the DOM with JS at run-time.

## Development

Run `grunt watch` to automatically rebuild the site as you develop it. Note, to copy over images and vendor scripts to the build directory you must manually run `make build` for performance reasons, but everything else can be automated.

## Collaborators

- [Giles Lavelle](https://github.com/lavelle)
- [Alistair Wick](https://github.com/Wacov)
- [Andrew Stuart](https://github.com/narayn60)

## License

[MIT licensed](https://github.com/felina/web/blob/master/LICENSE)

Copyright (c) 2013-2014 Giles Lavelle, Alistair Wick
