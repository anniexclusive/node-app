const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes.handler);

server.listen(3000);
// fs.writeFileSync('hello.txt', 'Hello from Node.js')