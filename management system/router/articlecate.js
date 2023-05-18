const express = require('express');
const router = express.Router();
const articlecate = require('../router_handler/articlecate');
const expressJoi = require('@escook/express-joi');
const { add_articlecate_schema,delete_articlecate_schema,update_articlecate_schema,get_articlecate_schema} = require('../schema/articlecate.js');


router.get('/cates', articlecate.getArticleCate);
router.post('/addArticleCate', expressJoi(add_articlecate_schema), articlecate.addArticleCate);
router.post('/deleteArticleCate', expressJoi(delete_articlecate_schema), articlecate.deleteArticleCateForID);
router.get('/getArticleCate', expressJoi(get_articlecate_schema), articlecate.getArticleCateForID);
router.post('/updateArticleCate', expressJoi(update_articlecate_schema), articlecate.updateArticleCateForID);

module.exports = router;