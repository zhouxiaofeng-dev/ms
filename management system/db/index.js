const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '111111',
    database: 'management_system'
});

module.exports = db;