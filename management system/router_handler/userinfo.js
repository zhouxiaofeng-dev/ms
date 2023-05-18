const db = require('../db/index');
const bcryptjs = require('bcryptjs');

//获取个人信息
exports.getUserInfo = (req, res) => {
    //req.auth属性是token解析成功，express-jwt帮我们挂载上去的
    const user = req.user;
    const sql = 'select id,username,nickname,email,user_pic from user where id = ?'
    db.query(sql, user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取用户信息失败');
        
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data:results[0]
        })
    })
}

//修改个人信息
exports.UpdateUserInfo = (req, res) => {
    console.log(req.body);
    const sql = 'update user set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);  //执行sql语句失败
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败');

        return res.cc('修改用户信息成功',0);

    })
}


//重置密码
exports.UpdatePassword = (req, res) => {
    console.log(req.user);
    const sql = 'select * from user where id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在');

        /**
         * 判断提交的旧密码是否正确
         * bcryptjs.compareSync(提交的密码,数据库中的密码)
        */

        const compareResult = bcryptjs.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('旧密码错误');

        /**
         * 对新密码进行加密，更新到数据库中
         */
        const sql2 = 'update user set password = ? where id = ?';
        //加密
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10);
        db.query(sql2, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新密码失败');
            res.cc('更新密码成功')
        })
    })
}

//更新用户头像
exports.UpdateUserAvatar = (req, res) => {
    const sql = 'update user set user_pic = ? where id = ?'
    db.query(sql, [req.body.avatar, req.body.id], (err, results) =>{
        if(err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('修改用户头像失败');
        return res.cc('修改用户头像成功',0); 
    })
}