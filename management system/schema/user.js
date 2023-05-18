const joi = require('joi');
/**
 * string()值必须是字符串
 * alphanum()值必须是包含a-z A-Z 0-9的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 必填项 不能为undefined
 * pattern(正则表达式) 值必须符合正则表达式的要求
 * 
 */

//用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required().error(new Error('账号需要1-10位'));
//密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required().error(new Error('密码需要6-12位'));


//注册和登录表单的验证规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    }
}



