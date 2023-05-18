const express = require('express');
const router = express.Router();
const UserInfoHandler = require('../router_handler/userinfo.js')

//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
//导入需要的验证规则对象
const { update_user_schema,update_password_schema,update_avatar_schema } = require('../schema/userinfo');

//得到个人信息
router.get('/getUserinfo', UserInfoHandler.getUserInfo);
//更新个人信息
router.post('/updateUserinfo', expressJoi(update_user_schema), UserInfoHandler.UpdateUserInfo);
//修改密码
router.post('/updatepw', expressJoi(update_password_schema), UserInfoHandler.UpdatePassword);
//更新头像
router.post('/updateAvatar', expressJoi(update_avatar_schema),UserInfoHandler.UpdateUserAvatar);

module.exports = router;
