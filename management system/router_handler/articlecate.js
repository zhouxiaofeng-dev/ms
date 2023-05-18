const db = require('../db/index');

//获取文章列表
exports.getArticleCate = (req, res) => {
    const sql = 'select * from articlecate where is_delete = 0 order by id asc';
    db.query(sql, (err, results) => {
        console.log(results);
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: '获取文章列表成功',
            data:results,
        })
    })
}

//新增文章分类
exports.addArticleCate = (req, res) => {
    const sql = 'select * from articlecate where name = ? and alias = ?';
    db.query(sql, [req.body.name,req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！');
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用,请重试');
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用,请重试');

        const sql2 = 'insert into articlecate set ?';
        db.query(sql2, req.body, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('新增文章失败');
            res.cc('新增文章成功',0)
        })

    })
}

//根据id删除文章分类
exports.deleteArticleCateForID = (req,res) => {
    const sql = 'update articlecate set is_delete = 1 where id = ?';
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除文章失败');
        res.cc('删除文章成功', 0);
    })
}  

//根据id得到文章分类数据
exports.getArticleCateForID = (req, res) => {
    const sql = 'select * from articlecate where id = ?';
    db.query(sql, req.body.id, (err, results) => {
        console.log(req.body.id);
        if(err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取文章失败');
        res.send({
            status: 0,
            message: '获取文章成功',
            data: results[0],
        })
    })
}

//根据id更新文章分类信息
exports.updateArticleCateForID = (req, res) => {
    const sql = 'select * from articlecate where id = ? and name = ? and alias = ?';
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！');
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用,请重试');
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用,请重试');


        const sql2 = 'update articlecate set ? where id = ?';
        db.query(sql2, [req.body,req.body.id],(err, results)=> {
            if(err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新文章失败');
            res.cc('更新文章成功',0)
        })
    })
}