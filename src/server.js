require('dotenv').config(); // thư viện hỗ trợ lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
const express = require('express');

const configViewEngine = require('./config/viewEngine'); // config đến view engine
const connection = require('./config/database') // cấu hình db từ file './config/database'

// Routers
const webRoutes = require('./routes/web'); // cấu hình đến file './routes/web'
const initApiRoute = require('./routes/api');

const app = express(); // app express
// lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
const port = process.env.PORT || 3001; // port => hardcode
const hostname = process.env.HOST_NAME;


// cấu hình file env
// console.log('>> check env: ', process.env);

// cấu hình template engine: "npm install --save-exact ejs@3.1.8"
configViewEngine(app);

// cấu hình cho data gửi từ phía user về server
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// khai báo route
app.use('/', webRoutes);
initApiRoute(app);
// test connection


// đọc dữ liệu từ myDB
// connection.query(
//     'SELECT * FROM Users u',
//     function (err, results, fields) {
//         // console.log('>>results = ', results);
//         // console.log('>>fields = ', fields);
//     }
// )

app.listen(port, hostname, () => {
    console.log(`==== ${hostname}:${port} ======`);
});