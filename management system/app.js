
const express = require('express');  ///导入express模块
const app = express();  //创建express实例
const cors = require('cors');  //引入cors
const joi = require('@hapi/joi');
const config = require('./config');    //导入配置文件
const expressJWT = require('express-jwt');   

//路由模块
const user = require('./router/user');  //引入router模块
const userinfoRouter = require('./router/userinfo');
const articleCate = require('./router/articlecate');
const article = require('./router/article');
const { func } = require('joi');

//错误中间件
app.use(function (err, req, res, next) {
    //数据验证失败
    console.log(err);
    if (err instanceof joi.ValidationError) return res.cc(err);

    //捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');

    //未知错误
    res.cc(err);
    next()
})

//响应数据的中间件（res.send的封装）
app.use((req,res,next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            //状态判断。判断err是错误对象还是字符串
            message: err instanceof Error ? err.message : err,
            
        })
    }
    next();
})

//配置解析JWT的中间件
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/\/user\//] }));
app.use(cors());  //解决跨域问题
app.use(express.urlencoded({ extended: false }));  //解析application/x-www-form-urlencoded格式的数据


app.use('/user', user);
app.use('/my', userinfoRouter);
app.use('/articleCate', articleCate);
app.use('/article', article);
app.use('/uploads', express.static('./uploads'));

app.use((err,req,res,next)=>{
  res.send({
    status:1,
    message:err.message
  })
  next()
})

app.listen(3300, function () {
    console.log('http://127.0.0.1:3300');
})