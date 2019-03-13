# 基于NodeJS常用框架Express进行快速构建后端接口服务的开发手册
NodeJs自2009年诞生到至今，使用频率一直呈现上升趋势,它有以下几个特点：
- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 
- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

## Express框架
Express 是一款受欢迎的常用的Node框架，用来搭建web应用，框架核心特性如下：
- 可以设置中间件来响应HTTP请求
- 定义了路由表用于执行不同的HTTP请求动作
- 可以通过向模板传递参数来动态渲染HTML页面（SSR）
- 用Express来搭建接口服务很简单

## Express应用的构建
- 目录结构
```
| -
	- api.js 入口文件
	- node_modules 插件依赖目录
	- package.json 依赖配置文件	
```
- 安装express依赖
```
npm install express --save
```
- 打开api.js 文件 编写如下代码片段

```
//引入express插件
var express = require('express');
var app = express();

//设置访问路由
app.get("/",(req,res) =>{
	res.send("Hello NodeJs");
});

//访问 /my 接口路径的json返回
app.get("/my",(req,res) =>{
	//url参数通过req.query["参数名称"] 获得
	res.json({
		code:1,
		message:"查询成功",
		info:{
			name:"stepday",
			sex:"男",
			addr:"仓前梦想小镇天使村"			
		}
	});
});

//支持post提交
app.post("/user/add",(req,res) =>{
	res.send(req.body.uname); //获取post表单传递过来的uname参数值
});

//监听端口服务
var server = app.listen(8081,function(){	
    console.log("应用实例，访问地址为 http://127.0.0.1:8081")
});
```
** 这里要注意如果要处理不同请求的数据，可以使用中间件body-parser 来做 **
```
npm install body-parser --save

在ai.js 上方引入和使用
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: false
}));

```

[BodyParse 了解](https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html)

- 静态文件的使用

```
express 提供了中间件express.static Lia 来设置静态文件，比如：图片、CSS和JS文件等,比如我们的静态资源是存放在public目录下可以这样声明:

app.use(express.static('public'));

```
比如我们想访问首页静态的index.html
```
app.get('/',(req,res) =>{
	res.sendFile(__dirname +"/index.html");
})
```

这样我们可以通过 http://127.0.0.1:8081 访问到index.html的页面
** 注意如果这里index.html 要引用public内的资源 路径内不得有public 因为已经设置了资源目录是public了的**
直接这样移入即可:
```
<link href="css/main.css"/>
<script src="js/index.js"></script>
```

- Cookies的使用
  cookies的使用我们主要是为了认证的方便和数据存储的方便，目前基于安全考虑基本弃用了cookies机制，采用JWT(JSON Web Token)方式
  [Expess Cookies](https://blog.csdn.net/cckevincyh/article/details/79815666)



