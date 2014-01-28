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

## Collaborators

- [Giles Lavelle](https://github.com/lavelle)
- [Alistair Wick](https://github.com/Wacov)
- [Andrew Stuart](https://github.com/narayn60)

## License

[MIT licensed](https://github.com/felina/web/blob/master/LICENSE)

Copyright (c) 2013-2014 Giles Lavelle, Alistair Wick
