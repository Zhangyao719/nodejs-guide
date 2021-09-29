const http = require('http');
const router = require('./modules/router');

const server = http.createServer();

server.on('request', (req, res) => {
  router(req, res);
});

server.listen(8080, () => {
  console.log('服务器启动成功, 请访问http://localhost:8080');
})