const path = require('path');
const mime = require('mime');
const url = require('url');
const querystring = require('querystring');
const template = require('art-template');
const {
  readFile,
  writeFile,
  format,
} = require('./utils/index');

const DATAPATH = path.resolve(__dirname, '..', 'data.json');

function renderIndex(res) {
  const filePath = path.resolve(__dirname, '..', 'views', 'index.html');
  readFile({
    path: DATAPATH,
    encoding: 'utf8',
    callback: (data) => {
      // 读取数据 动态添加到页面中
      const html = template(filePath, { data: JSON.parse(data) });
      res.end(html);
    }
  });
}

function renderStatic(req, res) {
  // 响应静态资源
  const mimePath = path.join(__dirname, '..', req.url);
  readFile({
    path: mimePath,
    callback: (data) => {
      res.writeHead(200, {
        'content-type': mime.getType(req.url),
      });
      res.end(data);
    }
  });
}

function renderAdd(res) {
  const filePath = path.resolve(__dirname, '..', 'views', 'add.html');
  readFile({
    path: filePath,
    encoding: 'utf8',
    callback: (data) => {
      res.setHeader('Content-Type', 'text/html;chartset=utf-8')
      res.end(data);
    }
  });
}

function renderPublish(req, res) {
  let query = {};
  // 1. GET/POST请求 分别处理, 获取表单数据query
  if (req.method === 'GET') {
    // 1.1 通过url模块 获取get请求的query (true 转成对象结构)
    query = url.parse(req.url, true).query;
  } else if (req.method === 'POST') {
    // 1.2 POST请求 通过req注册'data'和'end'事件 来获取数据
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      // 1.2.1 使用querystring模块获取对象结构
      query = querystring.parse(body);
    })
  }
  // 2. 取原数据
  readFile({
    path: DATAPATH,
    callback: (data) => {
      data = JSON.parse(data);
      const timestamp = Date.now();
      data.unshift({
        id: timestamp,
        time: format(timestamp),
        ...query,
      })
      // 3. 写入新的数据
      writeFile({
        path: DATAPATH,
        data: JSON.stringify(data, null, 2),
        callback: (err) => {
          // 4. 写入新数据后 重定向到首页
          res.writeHead(302, { location: '/' });
          res.end();
        }
      })
    }
  });
}

function renderDelete(req, res) {
  const { query } = url.parse(req.url, true);
  readFile({
    path: DATAPATH,
    encoding: 'utf8',
    callback: (data) => {
      data = JSON.parse(data).filter((item) => item.id !== +query.id);
      writeFile({
        path: DATAPATH,
        data: JSON.stringify(data, null, 2),
        callback: () => {
          res.writeHead(302, { location: '/' });
          res.end('delete success');
        },
      })
    }
  })
}

// 回显之前的内容
function renderEdit(req, res) {
  const filePath = path.resolve(__dirname, '..', 'views', 'edit.html');
  const { query } = url.parse(req.url, true);
  readFile({
    path: DATAPATH,
    encoding: 'utf8',
    callback: (data) => {
      const currentComment = JSON.parse(data).find((item) => +item.id === +query.id);
      const html = template(filePath, currentComment);
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      res.end(html);
    }
  })
}

// 发布修改完的内容
function renderUpdate(req, res) {
  let query = {};
  // 1. GET/POST请求 分别处理, 获取表单数据query
  if (req.method === 'GET') {
    // 1.1 通过url模块 获取get请求的query (true 转成对象结构)
    query = url.parse(req.url, true).query;
  } else if (req.method === 'POST') {
    // 1.2 POST请求 通过req注册'data'和'end'事件 来获取数据
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      // 1.2.1 使用querystring模块获取对象结构
      query = querystring.parse(body);
    })
  }
  // 2. 取原数据
  readFile({
    path: DATAPATH,
    callback: (data) => {
      data = JSON.parse(data);
      // 根据od找到当前这条评论 并替换
      const currentData = data.find(item => +item.id === +query.id);
      Object.assign(currentData, query);
      const dataIndex = data.findIndex(d => +d.id === +query.id)
      data.splice(dataIndex, 1, currentData)
      // 3. 写入新的数据
      writeFile({
        path: DATAPATH,
        data: JSON.stringify(data, null, 2),
        callback: (err) => {
          // 4. 写入新数据后 重定向到首页
          res.writeHead(302, { location: '/' });
          res.end();
        }
      })
    }
  });
}

function renderNotFound(res) {
  res.writeHead(404, {
    'content-type': 'text/html;charset=utf-8'
  })
  res.end('404, 您访问的资源不存在!');
};

module.exports = {
  renderIndex,
  renderStatic,
  renderAdd,
  renderNotFound,
  renderPublish,
  renderEdit,
  renderDelete,
  renderUpdate
}