import http from 'http';
import { readFileSync } from 'fs';

http
  .createServer()
  .on('request', (req, res) => {
    const fileContent = readFileSync('./src/statics/index.html', { encoding: 'utf8' })
      .replace('{message}', 'Hello World');

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(fileContent);
  })
  .listen(3000);
