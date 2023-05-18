const joi = require('joi');

const name = joi.string().required();
const alias = joi.string().alphanum().required();
const id = joi.number().integer().min(1).required();

//新增文章的验证规则对象
exports.add_articlecate_schema = {
    body: {
        name,
        alias
    }
}

exports.delete_articlecate_schema = {
    body: {
        id
    }
}

exports.get_articlecate_schema = {
    body: {
        id
    }
}

exports.update_articlecate_schema = {
    body: {
        id: id,
        name,
        alias,
    }
}