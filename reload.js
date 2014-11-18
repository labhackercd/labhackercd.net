/**
 * Dirty hack to enable on demand building of the site. Requests to this
 * application will trigger a `grunt build` to rebuild the static site, but
 * there are guards against concurrent requests. The site will only be built
 * once `span` milliseconds (see and edit below, defaults to 3 minutes).
 *
 * Setup a cron job to GET this every once in a while and enjoy your
 * semi-dynamic website!
 */
'use strict';

var http = require('http');

var port = 1337;
var iface = '127.0.0.1';

// 3 minutes, in milliseconds
var span = 1000 * 60 * 3;

var reloading = false;
var lastReload = null;

function millisecondsToNextReload(when) {
  if (!lastReload) {
    return 0;
  }

  if (!when) {
    when = new Date();
  }

  return span - (when - lastReload);
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  var ms = millisecondsToNextReload();
  var ins = (reloading || ms <= 0) ? 'right now' : 'in ' + (ms / 1000.0) + 'seconds';

  if (!reloading && ms <= 0) {
    reloading = true;

    var grunt = require('grunt');
    var gruntSetup = require('./Gruntfile.js');

    gruntSetup(grunt);

    grunt.tasks(['build'], {verbose: true, nogruntfile: true}, function() {
      reloading = false;
      lastReload = new Date();
    });
  }

  res.end('Reloading ' + ins + '...');
}).listen(port, iface);

console.log('Server running at http://' + iface + ':' + port);
