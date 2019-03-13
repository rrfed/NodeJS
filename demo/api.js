//引入express插件
var express = require('express');
var app = express();


//body解析
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: false
}));


app.use(express.static("static"));

app.get('/',(req,res) =>{
	res.send('Hello NodeJs');
});

app.get("/my",(req,res) =>{
	//
	console.log(req.query.name);
	
	res.json({
		code:1,
		msg:"ok",
		info:{
			name:"stepday"
		}
	});
});

//用户登录
app.post("/login",(req,res) =>{
	console.log(req.body);
});

//监听服务
app.listen(8081,function(){
	console.log("服务已经开启");
});