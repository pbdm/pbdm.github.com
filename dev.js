var fs = require('fs');
var path = require('path');
var browserSync = require('browser-sync').create();
var content_404 = fs.readFileSync(path.join(__dirname, '404.html'));

browserSync.init(
  {
    port: 8082,
    open: false,
    files: ['./**/*.*'],
    server: {
      baseDir: './'
    },
    notify: false
  },
  (err, bs) => {
    bs.addMiddleware('*', (req, res) => {
      // Provides the 404 content without redirect.
      res.write(content_404);
      res.end();
    });
  }
);
