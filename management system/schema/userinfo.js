const joi = require('joi');

//定义id、nickname、email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

//更新头像
const avatar = joi.string().dataUri().required();

//密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required();

//更新用户基本信息的验证规则对象
exports.update_user_schema = {
    body: {
        id,
        nickname,
        email,
    }
}

//更新用户头像的验证规则对象
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
exports.update_avatar_schema = {
    body: {
        avatar
    }
}

//重置密码
exports.update_password_schema = {
    body: {
        //使用password这个规则，验证req.body.oldPwd的值
        oldPwd: password,
        /**
         * 使用joi.not(joi.ref('oldPwd)).concat(password)规则，验证req.body.newPwd的值
         * 解读：
         * 1.joi.ref('oldPwd)表示newPwd的值必须和oldPwd的值保持一致
         * 2.joi.not(joi.ref('oldPwd)) 表示newPwd的值不能和oldPwd的值一样
         * 3..concat(password) 用于合并joi.not(joi.ref('oldPwd')) 和password这两条验证规则
         */
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}