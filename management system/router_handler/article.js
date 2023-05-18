const db = require('../db/index');
const path = require('path');          //导入处理路径的核心模块


/**
 * req.body 文本类型的数据
 * req.file 文件类型的数据
 */
exports.SendNewArticle = (req, res) => {
    //判断是否提交了封面图片数据
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数');
    const articleInfo = {
        ...req.body,
        cover_img: path.join('uploads', req.file.fieldname),  //文章封面在服务器端的存放位置
        pub_date: new Date(),   //文章发布时间
        author_id:req.user.id,   //文章作者的ID
    }
    const sql = 'insert into article set ?';
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('增加文章失败!');
        res.cc('增加文章成功!', 0);
    })
}

exports.GetArticle = (req, res) => {
    const sql = 'select * from article'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: '获取文章成功',
            data:results
        })
    })
}