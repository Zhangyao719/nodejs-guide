const http = require('http');
const {
  renderIndex,
  renderStatic,
  renderNotFound,
  renderAdd,
  renderPublish,
  renderDelete,
} = require('./modules/render');

const server = http.createServer();

server.on('request', (req, res) => {
  const reqUrl = req.url;
  if (['/', '/index'].includes(reqUrl)) {
    renderIndex(res);
  } else if (reqUrl.startsWith('/static')) {
    renderStatic(res, reqUrl);
  } else if (reqUrl.startsWith('/add')) {
    renderAdd(res);
  } else if (reqUrl.startsWith('/publish') ) {
    renderPublish(req, res);
  } else if (reqUrl.startsWith('/delete') ) {
    renderDelete(res, reqUrl);
  } else {
    renderNotFound(res);
  }
});

server.listen(8080, () => {
  console.log('服务器启动成功, 请访问http://localhost:8080');
})