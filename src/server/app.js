

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json({ extended: false }));  //必须写json来解析json数据

var cors = require('cors')
//设置跨域访问
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
}))
//登录
app.use('/user', require('./router/user'))
//挂号
app.use('/register', require('./router/register'))
//药品
app.use('/drug', require('./router/drug'))
//床位
app.use('/bed', require('./router/bed'))
//出入院
app.use('/hospital', require('./router/hospital'))



app.listen(3000, function () {
    console.log("App started on port 3000");
});