const express = require('express');
const router = express.Router();
const {SendNewArticle,GetArticle} = require('../router_handler/article');
const multer = require('multer');      //  导入解析 formdata 格式表单数据的包
const path = require('path');          //导入处理路径的核心模块

const expressJoi = require('@escook/express-joi');
const {add_article_schema } = require('../schema/article');
/**
 * 注意：使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。
 * 推荐使用 multer 来解析 multipart/form-data 格式的表单数据。https://www.npmjs.com/package/multer
 */

//创建multer的实例对象,通过dest属性指定文件的存放路径
const upload = multer({
    dest: path.join(__dirname,'../uploads')
})

/**
 * 发布新文章的路由
 * upload.single()是一个局部生效的中间件，用来解析FormData格式的表单数据
 * 将文件类型的数据，解析并挂载到req.file属性中
 * 将文本类型的数据,解析并挂载到req.body属性中
 * 
 * 先使用upload.single这个中间件解析表单数据
 * 在用expressJoi验证数据
 */

router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), SendNewArticle);
router.get('/getArticle',GetArticle)


module.exports = router