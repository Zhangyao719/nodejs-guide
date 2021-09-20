const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

// 1.创建服务器
const server = http.createServer();

// 2.注册请求事件
server.on('request', (req, res) => {
  // 2.1 读取请求路径
  const filePath = path.join(__dirname, 'www', req.url.length > 1 && req.url || 'index.html');

  // 2.2 读取文件, 设置响应内容
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      res.end(res.message || '404, 资源不存在');
    } else {
      // 2.3 动态设置响应头Content-Type
      const contentType = mime.getType(req.url);
      res.setHeader('Content-Type', contentType);

      // 2.4 结束响应 返回数据
      res.end(data);
    }
  })
})

// 3.监听端口
server.listen(8080, () => {
  console.log('服务器启动成功, 请访问 http://localhost:8080');
})