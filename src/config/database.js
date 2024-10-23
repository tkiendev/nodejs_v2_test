
require('dotenv').config(); // thư viện hỗ trợ lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
const mysql = require('mysql2'); // cấu hình vào thư viện để kết nối đến db: "npm install --save-exact mysql2@2.3.3

// gọi vào db kết nối nhiều
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT, // default: 3306 || '3306';
//     user: process.env.DB_USER, // default: empty
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// gọi vào db giới hạn kết nối
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // default: 3306 || '3306';
    user: process.env.DB_USER, // default: empty
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // tối da 1 user kết nối đc db
    queueLimit: 0,
});

module.exports = connection;
