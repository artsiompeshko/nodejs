import http from 'http';
import fs from 'fs';
import through2 from 'through2';

http
  .createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    fs.createReadStream('./src/statics/index.html')
      .pipe(through2((chunk, enc, callback) => {
        callback(null, chunk.toString().replace('{message}', 'Hello World'));
      }))
      .pipe(res);
  })
  .listen(3000);
