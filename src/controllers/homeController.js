// các hàm truyền vào file routes
const { name } = require('ejs');
const connection = require('../config/database') // cấu hình db từ file '../config/database'
const { getAllUsers } = require('../services/CRUDService')

// import multer from 'multer'; // ES6
const multer = require('multer'); // thư viện hỗ trợ upload file npm i --save-exact multer@1.4.3
const path = require('path'); // npm nodejs

// /home
const getHomepage = async (req, res) => {
    // lấy data từ db
    connection.query(
        'SELECT * FROM Users u',
        function (err, results, fields) {
            // console.log(results); // check data
            return res.render('home.ejs', { listUser: results });
        }
    );

    // C2 đg check

    // gọi vào db giới hạn kết nối
    // dbConnection();
    // return res.render('home.ejs', { listUser: results });
    // res.send('ok');
};

// /view
const getSample = (req, res) => {
    res.render('sample.ejs');
};

// /api
const getAbc = (req, res) => {
    res.send('<h1>check abc!</h1>');
};

// GET /Create
const getCreate = (req, res) => {
    res.render('create.ejs');
}

// POST /Create-User
const PostCreateUser = async (req, res) => {

    const reqData = req.body; // data được lấy từ phía người dùng về: obj

    let email = reqData.email;
    let name = reqData.myname;
    let city = reqData.city;
    // let {email, name, city} = reqData // cú pháp viết gọn 

    // console.log('>> req.body: ', `email = ${email} | name = ${name} | city = ${city}`) // check data

    // truyền data vào db
    //C1
    // connection.query(
    //     `INSERT INTO Users (email, name, city)
    //      VALUES (?, ?, ?);`,
    //     [email, name, city],
    //     (err, results) => {
    //         // trả về phía người dùng
    //         // console.log(results);
    //         res.send('<h1>create a new user</h1>');
    //     }
    // );

    // c2 check error
    const db = async () => {
        require('dotenv').config(); // thư viện hỗ trợ lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
        const mysql = require('mysql2/promise'); // cấu hình vào thư viện để kết nối đến db: "npm install --save-exact mysql2@2.3.3

        // gọi vào db giới hạn kết nối
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT, // default: 3306 || '3306';
            user: process.env.DB_USER, // default: empty
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10, // tối da 1 user kết nối đc db
            queueLimit: 0,
        });
        const [rows, fields] = await connection.execute(`INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [email, name, city]);
        res.send('<h1>create a new user</h1>');
    }
    db();


    // const [results, fields] = await connection.query(
    //     `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [email, name, city]
    // );
    // console.log('>> check results', results);
    // res.send('<h1>create a new user</h1>');

}

// /Update/:id
const getUpdate = async (req, res) => {
    const userId = req.params.id;

    // check fix
    const db = async () => {
        require('dotenv').config(); // thư viện hỗ trợ lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
        const mysql = require('mysql2/promise'); // cấu hình vào thư viện để kết nối đến db: "npm install --save-exact mysql2@2.3.3

        // gọi vào db giới hạn kết nối
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT, // default: 3306 || '3306';
            user: process.env.DB_USER, // default: empty
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10, // tối da 1 user kết nối đc db
            queueLimit: 0,
        });

        let [results, fields] = await connection.query('SELECT * FROM Users u WHERE id = ?', [userId]);

        let user = results && results.length > 0 ? results[0] : {}

        res.render('edit.ejs', { userEdit: user });
    }
    db();
};

// POST /update-user
const PostUpdateUser = (req, res) => {
    const reqData = req.body; // data được lấy từ phía người dùng về: obj

    let email = reqData.email;
    let name = reqData.myname;
    let city = reqData.city;
    let userId = reqData.id;

    // console.log({
    //     email: email,
    //     name: name,
    //     city: city,
    //     userId: userId,
    // }); // check data gửi về từ người dùng

    const db = async () => {
        require('dotenv').config(); // thư viện hỗ trợ lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
        const mysql = require('mysql2/promise'); // cấu hình vào thư viện để kết nối đến db: "npm install --save-exact mysql2@2.3.3

        // gọi vào db giới hạn kết nối
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT, // default: 3306 || '3306';
            user: process.env.DB_USER, // default: empty
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10, // tối da 1 user kết nối đc db
            queueLimit: 0,
        });

        let [results, fields] = await connection.query('UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?', [email, name, city, userId]);
        res.redirect('/');
    }
    db();

}

// POST /delete-user/:id
const PostDeleteUser = (req, res) => {
    const reqData = req.params.id; // data được lấy từ phía người dùng về: obj
    let userId = reqData;
    // console.log(userId);

    const db = async () => {
        require('dotenv').config(); // thư viện hỗ trợ lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
        const mysql = require('mysql2/promise'); // cấu hình vào thư viện để kết nối đến db: "npm install --save-exact mysql2@2.3.3

        // gọi vào db giới hạn kết nối
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT, // default: 3306 || '3306';
            user: process.env.DB_USER, // default: empty
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10, // tối da 1 user kết nối đc db
            queueLimit: 0,
        });

        let [results, fields] = await connection.query('SELECT * FROM Users u WHERE id = ?', [userId]);
        let user = results && results.length > 0 ? results[0] : {};
        res.render('delete.ejs', { userDelete: user });
    }
    db();
}

const PostRemoveUser = (req, res) => {
    const reqData = req.body.userId; // data được lấy từ phía người dùng về: obj
    let userId = reqData;

    const db = async () => {
        require('dotenv').config(); // thư viện hỗ trợ lấy data từ file env: "npm install --save-exact dotenv@16.0.3"
        const mysql = require('mysql2/promise'); // cấu hình vào thư viện để kết nối đến db: "npm install --save-exact mysql2@2.3.3

        // gọi vào db giới hạn kết nối
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT, // default: 3306 || '3306';
            user: process.env.DB_USER, // default: empty
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10, // tối da 1 user kết nối đc db
            queueLimit: 0,
        });
        let [results, fields] = await connection.query('DELETE FROM Users WHERE id = ?', [userId]);
        res.redirect('/');
    }
    db();
}


// ======================== file ========================
// GET /upload-file

// 1 file - nhiều file
const getUploadFile = (req, res) => {
    return res.render('uploadFile.ejs');
}

const upload = multer().single('profile_pic');
// POST /upload-profile_pic
const PostSaveFile = (req, res) => {
    console.log(res.file);
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // console.log('>>> check: ')
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports = {
    getHomepage,
    getAbc,
    getSample,
    PostCreateUser,
    getCreate,
    getUpdate,
    PostUpdateUser,
    PostDeleteUser,
    PostRemoveUser,
    getUploadFile,
    PostSaveFile,
}