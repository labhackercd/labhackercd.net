# Source for labhackercd.net

This is the code that powers http://labhackercd.net/.

It uses the [assemble](http://assemble.io) static site builder, along with
some [grunt](http://gruntjs.com) tasks for convenience.

## Installation

Make sure you have [node.js](http://nodejs.org) and [npm](http://npmjs.org)
installed in your system.

Then install both [grunt-cli](http://gruntjs.com) and [bower](http://bower.io)
globally:

```bash
npm install -g grunt-cli bower
```

Clone this repository:

```bash
git clone https://github.com/labhackercd/labhackercd.net.git
cd labhackercd.net
```

Install the required packages:

```bash
npm install
```

Install bower components:

```bash
bower install
```

And finally build the static site:

```bash
grunt build
```

> NOTE: If you want to work on the sources you can use the `grunt serve`
> command instead of `build`. It'll fire a web server inside the build
> directory, watch the relevant files for changes and then automatically
> rebuild the site when something changes.

<!-- vim: set ft=markdown -->
