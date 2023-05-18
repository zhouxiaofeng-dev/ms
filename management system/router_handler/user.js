const db = require('../db/index');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');


// 注册用户的处理函数
/**
 * 检测表单数据是否合法
 * 检测用户名是否被占用
 * 对密码进行加密处理
 * 插入新用户
 */
exports.regUser = (req, res) => {
    const user = req.body;
    //账号密码是否为空
    if (!user.username || !user.password) return res.cc('用户名或密码不能为空');

    const sql = `select * from user where username = ?`
    db.query(sql, [user.username], (err, results) => {
        if (err) return res.cc(err)
        //用户名被占用
        if (results.length > 0) return res.cc('用户名被占用，请更换用户名')
        //加密密码
        user.password = bcryptjs.hashSync(user.password, 10);
        const sql2 = 'insert into user set ?';
        db.query(sql2, {username:user.username,password:user.password}, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册失败!')
            res.cc('注册成功');
        })
    })
    
}

//登录的处理函数
/**
 * 检测表单数据是否合法
 * 根据用户名查询用户的数据
 * 判断用户输入的密码是否正确
 * 生成 JWT 的 Token 字符串 
 */
exports.login = (req, res) => {
    const user = req.body;
    console.log(user);
    const sql = `select * from user where username =?`
    db.query(sql, user.username, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('账号不正确');

        /**
         * 判断用户输入的登录密码和数据库的是否一致
         * 调用 bcryptjs.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
         */
        const compareResult = bcryptjs.compareSync(user.password, results[0].password);
        if (!compareResult) return res.cc('密码错误')
        console.log(compareResult);


        /**
         * 登录成功，生成token字符串
         * 在生成 Token 字符串的时候，一定要剔除 密码 和 头像 的值
         * 通过 ES6 的高级语法，快速剔除 密码 和 头像 的值
         * 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
         */
        const userSTR = { ...results[0], password: '', user_pic: '' };

        //生成token字符串
        const tokenStr = jwt.sign(userSTR, config.jwtSecretKey, {
            expiresIn:'10h',    //有效期
        })
        console.log(results[0],'results');
        res.send({
            status: 0,
            message: '登录成功',
            data: {
                token: 'Bearer ' + tokenStr,
                userIMF: results[0],
            }
        })
    })
    console.log(user,'123');
}


//根据ID寻找用户
exports.SearchUserForId = (req, res) => {
    console.log(req.body);
    const sql = 'select * from user where id = ?'
    db.query(sql, [req.body.id], (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: '获取用户成功',
            data:results
        })
    })
}