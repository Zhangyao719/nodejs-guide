# 1. 安装nodejs

## nodejs版本

下载地址

- [当前版本](https://nodejs.org/en/download/)
- [历史版本](https://nodejs.org/en/download/releases/)

官网术语解释

- LTS 版本：Long-term Support 版本，长期支持版，即稳定版。
- Current 版本：Latest Features 版本，最新版本，新特性会在该版本中最先加入。

查看node版本

```bash
node -v
```

## 运行nodejs程序

- 创建js文件 `helloworld.js`
- 写nodejs的内容：`console.log('hello nodejs')`
- 打开命令窗口 `cmd`
  - shift加右键打开命令窗口，执行 `node 文件名.js`即可
  - 给vscode安装`terminal`插件，直接在vscode中执行
- 执行命令：`node helloworld.js`

注意：在nodejs中是无法使用DOM和BOM的内容的，因此`document, window`等内容是无法使用的。



# 2. node内置基础模块

## global模块-全局变量

> Node.js 中的全局对象是 `global`, 类似于浏览器中的`window`

常用的global属性

```javascript
console: 用于打印日志
setTimeout/clearTimeout: 设置清除延时器
setInterval/clearInterval: 设置清除定时器

__dirname: 当前文件的路径，不包括文件名
__filename： 获取当前文件的路径，包括文件名
```

## fs模块  FileSystem
> fs模块是nodejs中最常用的一个模块，因此掌握fs模块非常的有必要，fs模块的方法非常多,用到了哪个查哪个即可。
>
> 文档地址：http://nodejs.cn/api/fs.html

  在nodejs中，提供了fs模块，这是node的核心模块

  注意：

1. 除了global模块中的内容可以直接使用，其他模块都是需要加载的。
2. fs模块不是全局的，不能直接使用。因此需要导入才能使用。

```javascript
const fs = require("fs");
```

### 读取文件

> 语法：fs.readFile(path[, options], callback)

方式一：不传编码参数

```javascript
//参数1： 文件的名字
//参数2： 读取文件的回调函数
  //参数1：错误对象，如果读取失败，err会包含错误信息，如果读取成功，err是null
  //参数2：读取成功后的数据（是一个Buffer对象）
fs.readFile("data.txt", function(err, data){
	if(err) {
		console.log(err, err.message);   
    } else {
		console.log(data);   
    }
});
```

方式二：传编码参数

```javascript
//参数1： 文件的路径
//参数2： 编码，如果设置了，返回一个字符串，如果没有设置，会返回一个buffer对象
//参数3： 回调函数
fs.readFile("data.txt", "utf8", function(err, data){
  console.log(err);
  console.log(data);
});
```

关于Buffer对象

```javascript
1. Buffer对象是Nodejs用于处理二进制数据的。
2. 其实任意的数据在计算机底层都是二进制数据，因为计算机只认识二进制。
3. 所以读取任意的文件，返回的结果都是二进制数据，即Buffer对象
4. Buffer对象可以调用toString()方法转换成字符串。
```

### 写文件

> 语法：fs.writeFile(file, data[, options], callback)

```javascript
//参数1：写入的文件名(如果文件不存在，会自动创建)
//参数2：写入的文件内容（注意：写入的内容会覆盖以前的内容）
//参数3：写文件后的回调函数
fs.writeFile("2.txt", "hello world, 我是一个中国人", function(err){
  if(err) {
    return console.log("写入文件失败", err);
  }
  console.log("写入文件成功");
});
```

注意：

1. 写文件的时候，会把原来的内容给覆盖掉

### 追加文件

> 语法：fs.appendFile(path, data[, options], callback)

```javascript
//参数1：追加的文件名(如果文件不存在，会自动创建)
//参数2：追加的文件内容（注意：写入的内容会覆盖以前的内容）
//参数3：追加文件后的回调函数
fs.appendFile("2.txt", "我是追加的内容", function(err){
  if(err) {
    return console.log("追加文件内容失败");
  }
  console.log("追加文件内容成功");
})
```

思考：如果没有appendFile，通过readFile与writeFile应该怎么实现？

### 文件同步与异步的说明

> fs中所有的文件操作，都提供了异步和同步两种方式

异步方式：不会阻塞代码的执行

```javascript
//异步方式
var fs = require("fs");

console.log(111);
fs.readFile("2.txt", "utf8", function(err, data){
  if(err) {
    return console.log("读取文件失败", err);
  }
  console.log(data);
});
console.log("222");
```

同步方式：会阻塞代码的执行, 没有回调函数, 返回值是读取的数据

```javascript
//同步方式
console.log(111);
var result = fs.readFileSync("2.txt", "utf-8");
console.log(result);
console.log(222);
```

总结：同步操作使用虽然简单，但是会影响性能，因此尽量使用异步方法，尤其是在工作过程中。

### 其他api

方法有很多，但是用起来都非常的简单，学会查文档

文档：http://nodejs.cn/api/fs.html

| 方法名                                  | 描述                   |
| --------------------------------------- | ---------------------- |
| `fs.readFile(path, callback)`           | 读取文件内容（异步）   |
| `fs.readFileSync(path)`                 | 读取文件内容（同步）   |
| `fs.writeFile(path, data, callback)`    | 写入文件内容（异步）   |
| `fs.writeFileSync(path, data)`          | 写入文件内容（同步）   |
| `fs.appendFile(path, data, callback)`   | 追加文件内容（异步）   |
| `fs.appendFileSync(path, data)`         | 追加文件内容（同步）   |
| `fs.rename(oldPath, newPath, callback)` | 重命名文件（异步）     |
| `fs.renameSync(oldPath, newPath)`       | 重命名文件（同步）     |
| `fs.unlink(path, callback)`             | 删除文件（异步）       |
| `fs.unlinkSync(path)`                   | 删除文件（同步）       |
| `fs.mkdir(path, mode, callback)`        | 创建文件夹（异步）     |
| `fs.mkdirSync(path, mode)`              | 创建文件夹（同步）     |
| `fs.rmdir(path, callback)`              | 删除文件夹（异步）     |
| `fs.rmdirSync(path)`                    | 删除文件夹（同步）     |
| `fs.readdir(path, option, callback)`    | 读取文件夹内容（异步） |
| `fs.readdirSync(path, option)`          | 读取文件夹内容（同步） |
| `fs.stat(path, callback)`               | 查看文件状态（异步）   |
| `fs.statSync(path)`                     | 查看文件状态（同步）   |

## path模块

### 路径操作的问题

在读写文件的时候，文件路径可以写相对路径或者绝对路径

```javascript
//data.txt是相对路径，读取当前目录下的data.txt, 相对路径相对的是指向node命令的路径
//如果node命令不是在当前目录下执行就会报错， 在当前执行node命令的目录下查找data.txt，找不到
fs.readFile("data.txt", "utf8", function(err, data) {
  if(err) {
    console.log("读取文件失败", err);
  }

  console.log(data);
});
```

相对路径：相对于执行node命令的路径

绝对路径：`__dirname`: 当前文件的目录，`__filename`: 当前文件的目录，包含文件名

### path模块的常用方法

> 关于路径，在linux系统中，路径分隔符使用的是`/`，但是在windows系统中，路径使用的`\`

在我们拼写路径的时候会带来很多的麻烦，经常会出现windows下写的代码，在linux操作系统下执行不了，path模块就是为了解决这个问题而存在的。

常用方法：

```javascript
path.join();//拼接路径

//windows系统下
> path.join("abc","def","gg", "index.html")
"abc\def\gg\a.html"

//linux系统下
> path.join("abc","def","gg", "index.html")
'abc/def/gg/index.html'

path.basename(path[, ext])	返回文件的最后一部分
path.dirname(path)	返回路径的目录名
path.extname(path)	获取路径的扩展名

var path = require("path");
var temp = "abc\\def\\gg\\a.html";
console.log(path.basename(temp));//a.html
console.log(path.dirname(temp));//abc\def\gg
console.log(path.extname(temp));//.html
```

【优化读写文件的代码】

#### path模块其他api

| 方法名                       | 描述                                 |
| ---------------------------- | ------------------------------------ |
| `path.basename(path[, ext])` | 返回文件的最后一部分                 |
| `path.dirname(path)`         | 返回路径的目录名                     |
| `path.extname(path)`         | 获取路径的扩展名                     |
| `path.isAbsolute(path)`      | 判断目录是否是绝对路径               |
| `path.join([...paths])`      | 将所有的path片段拼接成一个规范的路径 |
| `path.normalize(path)`       | 规范化路径                           |
| `path.parse(path)`           | 将一个路径解析成一个path对象         |
| `path.format(pathObj)`       | 讲一个path对象解析成一个规范的路径   |



## http模块

### 网络请求过程

https://blog.csdn.net/ejennahuang/article/details/114821971

>1. 输入网址, 浏览器查询**本地host文件**(配置域名IP地址的映射)
>2. 如果本地没有对应的host, 会去在线**域名解析服务器**查询(**DNS解析**)

### 创建服务器基本步骤

```javascript
//1. 导入http模块，http模块是node的核心模块，作用是用来创建http服务器的。
var http = require("http");

//2. 创建服务器
var server = http.createServer();

//3. 服务器处理请求
server.on("request", function() {
  console.log("我接收到请求了");
});

//4. 启动服务器，监听某个端口
server.listen(9999, function(){
  console.log("服务器启动成功了, 请访问： http://localhost:9999");
});
```

详细说明

1. 给服务器注册request事件，只要服务器接收到了客户端的请求，就会触发request事件
2. request事件有两个参数，request表示请求对象，可以获取所有与请求相关的信息，response是响应对象，可以获取所有与响应相关的信息。
3. 服务器监听的端口范围为：1-65535之间，推荐使用3000以上的端口，因为3000以下的端口一般留给系统使用

### request对象详解

文档地址：http://nodejs.cn/api/http.html#http_message_headers

**常见属性**：

>- headers: 所有的请求头信息
>- method： 请求的方式
>- url： 请求的地址
>
>注意：在发送请求的时候，可能会出现两次请求的情况，这是因为谷歌浏览器会自动增加一个`favicon.ico`的请求。

小结：request对象中，常用的就是method和url两个参数

**注册事件**: https://nodejs.org/zh-cn/docs/guides/anatomy-of-an-http-transaction/

> **请求体**
>
> 当接受到了一个 `POST` 或者 `PUT` 请求时，请求体对于你的应用程序非常重要。相对于访问请求头而言，获取请求体有些麻烦。传入请求对象的 `request` 其实实现了 [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) 接口， 这个信息流可以被监听，或者与其它流进行对接。<u>我们可以通过监听 `'data'` 和 `'end'` 事件从而把 数据给取出来</u>。
>
> 每次在 `'data'` 事件中触发抓获的数据块是一个 [`Buffer`](https://nodejs.org/api/buffer.html)。如果你已知是一个字符串对象，那么 最好的方案就是把这些数据收集到一个数组中，然后在 `'end'` 事件中拼接并且把它转化为字符串。	
>
> [end事件](http://nodejs.cn/api/http.html#http_request_end_data_encoding_callback)

```js
// 如果你已知是一个字符串对象，那么 最好的方案就是把这些数据收集到一个数组中，然后在 'end' 事件中拼接并且把它转化为字符串。
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```



### response对象详解

文档地址：http://nodejs.cn/api/http.html#http_class_http_serverresponse

常见的属性和方法：

```javascript
res.write(data): 给浏览器发送请求体，可以调用多次，从而提供连续的请求体
res.end();   通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。
res.end(data); 结束请求，并且响应一段内容，相当于res.write(data) + res.end()
res.statusCode: 响应的的状态码 200 404 500
res.statusMessage: 响应的状态信息， OK Not Found ,会根据statusCode自动设置。
res.setHeader(name, value); 设置响应头信息， 比如content-type
res.writeHead(statusCode, statusMessage, options); 设置响应头，同时可以设置状态码和状态信息。
```

**注意：必须先设置响应头，才能设置响应。** 

## URL模块

- 说明：用于 URL 处理与解析

```js
// 返回一个url对象:
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=123&title=123&content=123',
  query: 'name=123&title=123&content=123',
  pathname: '/publish',
  path: '/publish?name=123&title=123&content=123',
  href: '/publish?name=123&title=123&content=123'
}
```

- 注意：通过url拿到的查询参数都是字符串格式

```js
// 导入url模块
const url = require('url')

const ret = url.parse(
    'http://localhost:3000/details?id=1&name=jack', // 第一个参数: url字符串
    true, // 是否将query属性（查询参数）解析为一个对象，如果为：true，则query是一个对象
)
console.log(ret.query) // { id: '1', name: 'jack' }
```

## querystring模块

查询字符串

- 用于解析与格式化 URL 查询字符串
- 注意：只在专门处理查询字符串时使用

```js
// foo=bar&abc=xyz&abc=123
// 将查询参数转化为对象
const querystring = require('querystring')
// 第一个参数: 要解析的 URL 查询字符串
querystring.parse('foo=bar&abc=xyz') // { foo: 'bar', abc: 'xyz' }
```



# 3. npm - Node包管理工具

## npm的基本概念

- node package manager
- [npm官网](https://npmjs.com)
- [npm中文文档](https://www.npmjs.com.cn/)

```html
1. npm 是node的包管理工具，
2. 它是世界上最大的软件注册表，每星期大约有 30 亿次的下载量，包含超过 600000 个 包（package） （即，代码模块）。
3. 来自各大洲的开源软件开发者使用 npm 互相分享和借鉴。包的结构使您能够轻松跟踪依赖项和版本。
```

- 作用：通过`npm`来快速安装开发中使用的包
- npm不需要安装，只要安装了node，就自带了`npm`

## npm基本使用

### 初始化包

```javascript
npm init;    //这个命令用于初始化一个包，创建一个package.json文件，我们的项目都应该先执行npm init
npm init -y;  //快速的初始化一个包， 不能是一个中文名
```

### 安装包

```javascript
npm install 包名;  //安装指定的包名的最新版本到项目中
npm install 包名@版本号;  //安装指定包的指定版本

npm i 包名； //简写
```

### 卸载包

```javascript
npm uninstall 包名;  //卸载已经安装的包
```

### 清除缓存

``` javascript
npm cache clean -f // 如果npm安装失败了，可以用这个命令来清除缓存
```

## package.json文件

package.json文件，包（项目）描述文件，用来管理组织一个包（项目），它是一个纯JSON格式的。

- 作用：描述当前项目（包）的信息，描述当前包（项目）的依赖项
- 如何生成：`npm init`或者`npm init -y`
- 作用
  - 作为一个标准的包，必须要有`package.json`文件进行描述
  - 一个项目的node_modules目录通常都会很大，不用拷贝node_modules目录，可以通过package.json文件配合`npm install`直接安装项目所有的依赖项
- 描述内容

```json
{
  "name": "03-npm",  //描述了包的名字，不能有中文
  "version": "1.0.0",  //描述了包的的版本信息， x.y.z  如果只是修复bug，需要更新Z位。如果是新增了功能，但是向下兼容，需要更新Y位。如果有大变动，向下不兼容，需要更新X位。
  "description": "", //包的描述信息
  "main": "index.js", //入口文件（模块化加载规则的时候详细的讲）
  "scripts": {  //配置一些脚本，在vue的时候会用到，现在体会不到
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],  //关键字（方便搜索）
  "author": "",  //作者的信息
  "license": "ISC",  //许可证，开源协议
  "dependencies": {   //重要，项目的依赖， 方便代码的共享  通过 npm install可以直接安装所有的依赖项
    "bootstrap": "^3.3.7",
    "jquery": "^3.3.1"
  }
}
```

**注意：一个合法的package.json，必须要有name和version两个属性** 

## 本地安装和全局安装

有两种方式用来安装 npm 包：本地安装和全局安装。选用哪种方式来安装，取决于你如何使用这个包。 

- 全局安装：如果你想将其作为一个命令行工具，那么你应该将其安装到全局。这种安装方式后可以让你在任何目录下使用这个命令。比如less命令，webpack命令，hcc-md命令 。
- 本地安装：如果你自己的模块依赖于某个包，并通过 Node.js 的 `require` 加载，那么你应该选择本地安装，这种方式也是 `npm install` 命令的默认行为。

```javascript
// 全局安装,会把npm包安装到C:\Users\HUCC\AppData\Roaming\npm目录下，作为命令行工具使用
npm install -g 包名;

//本地安装，会把npm包安装到当前项目的node_modules文件中，作为项目的依赖
npm install 包名;  
```

## 常见的命令行工具

### nrm

- nrm：npm registry manager（npm仓库地址管理工具）
- 安装：`npm i -g nrm`

```shell
# 带*表示当前正在使用的地址

# 查看仓库地址列表
nrm ls

# 切换仓库地址
nrm use taobao
```

### nodemon 自动重启

- 作用：监视到js文件修改后，自动重启node程序
- 安装：`npm i -g nodemon`
- 使用：`nodemon app.js` 运行node程序



# 4. commonjs规范中的导入导出

### 导入

1. **内置模块**和**第三方模块**导入时, 直接跟名称即可

   ```js
   // 内置模块
   const fs = require('fs')
   // 第三方模块
   const moment = require('moment')
   ```

2. **自定义模块`必须带上相对路径`**

   ```js
   // 自定义模块
   const { foo } = require('./utils/index')
   ```

3. 导入时 无需跟 .js 后缀

### module.exports和exports的区别

1. 一开始都指向**`同一个对象{ }`**,  **exports**就是**module.exports**的引用

   ```js
   exports === module.exports // true
   ```

2. 当module.exports和exports**不指向同一个对象**时, **`导入以module.exports为主`**

3. **exports只能点语法赋值,  而不能重新给新对象**

   ```js
   # 错误示范:
   // a.js:
   exports = {
       fun1,
       fun2,
   }
   // b.js:
   const { fun1, fun2 } = require('./a.js');
   // 结果: fun1 undefined fun2 undefined
   ```

   **原因:** exports赋值新对象时(堆地址中开辟新的空间), **不再指向原来的对象**, 而根据上述第2点, 原module.exports中的对象 仍然为空{ },  所以没有结构出内容, 结果为undefined

   ```js
   # 正确示范:
   // a.js:
   exports.fun1 = fun1
   exports.fun2 = fun2
   // 或者
   module.exports = {
       fun1,
       fun2,
   }
   ```

   **原因: ** 此时点语法 还是在原对象上新增了属性, 并没有另起新的对象, 所以其他文件导入时, 是可以拿到的



# 5.常用第三方模块

### mime模块

> - [MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types)(Multipurpose Internet Mail Extensions): 多用途Internet邮件扩展类型，是一种表示文档性质和格式的标准化方式 
> - 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档；因此服务器将正确的MIME类型附加到响应对象的头部(content-type)是非常重要的
> - mime模块 可以通过`getType`方法获取文件的MIME类型

- 安装：`npm i mime`

```js
const mime = require('mime')

// 获取路径对应的MIME类型
mime.getType('txt')                    // ⇨ 'text/plain'
// 根据MIME获取到文件后缀名
mime.getExtension('text/plain')        // ⇨ 'txt'
```

### art-template模块

- [文档](https://aui.github.io/art-template/zh-cn/docs/)
- 安装:  `npm install art-template`

- 核心方法

```javascript
// 基于模板路径渲染模板
//返回值：返回渲染后的内容
// template(filename, data)
let html = template(
    path.join(__dirname, "pages", "index.html"), //参数1：文件的绝对路径
    {name:"大吉大利，今晚吃鸡"}, //参数2：数据(必须是一个对象)
);

// pages/index.html:
<div>{{ name }}<div>
```

**注意点：文件的路径必须是绝对路径**

### moment模块

- [文档](http://momentjs.cn/docs/)



# 6. 实现静态WEB服务器

## 服务器响应首页

- 注意：浏览器中输入的URL地址，仅仅是一个标识，不与服务器中的目录一致。也就是说：返回什么内容是由服务端的逻辑决定

```js
server.on('request', function(req, res) {
  var url = req.url
  if(url === '/') {
    fs.readFile('./index.html', function(err, data) {
      if(err) {
        return res.end('您访问的资源不存在~')
      }
      res.end(data)
    })
  }
})
```

## 根据根据不同url，响应不同文件

## content-type设置-MIME类型

- 使用mime模块MIME类型的通用处理(图片资源等)(详见mime模块↑)



# 7. 实现动态WEB服务器

## 在node中使用art-template 

- 详见art-template模块↑

## get请求处理-url模块

- 通过`url.parse`, 解析url, 获取get请求携带的query参数(详情见url模块↑)

## 服务端重定向

- [HTTP 状态码说明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- [301 和 302](http://shuai.be/archives/301-302-redirection/)
- 说明：服务端可以通过HTTP状态码让浏览器中的页面重定向

```js
res.writeHead(302, {
  'Location': '/'
})
res.end()
```

## POST请求参数的处理

- 说明：POST请求可以发送大量数据，没有大小限制
- req.on 注册 data事件
- req.on 注册 end事件

```js
// 接受POST参数
var postData = []

// data事件：用来接受客户端发送过来的POST请求数据
var result = "";
req.on('data', function (chunk) {
  result += chunk;
})

// end事件：当POST数据接收完毕时，触发
req.on('end', function () {
  cosnole.log(result); 
})
```

## 请求体处理-querystring模块

- 使用querystring处理POST请求数据(详情见querystring ↑)
