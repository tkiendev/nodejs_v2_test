const connection = require('../config/database');
const ApiController = {

    // chuẩn api: json || xml

    // api test
    getAllUses(req, res) {
        let results = connection.query(
            'SELECT * FROM Users u',
            (err, results, fields) => {
                if (results.length === 0) {
                    return res.status(404).json(results);
                }

                return res.status(200).json(results);
            }
        )
    },

    // /api/v1/CreateUser
    PostCreateUser(req, res) {

        const reqData = req.body; // data được lấy từ phía người dùng về: obj

        let email = reqData.email;
        let name = reqData.myname;
        let city = reqData.city;

        // console.log('check data: ', reqData);
        console.log(`${email} || ${name} || ${city}`);

        // let {email, name, city} = reqData // cú pháp viết gọn 
        if (!email || !name || !city) {
            return res.status(404).json({
                message: false,
            });
        }
        console.log('===============================================')
        // truyền data vào db
        connection.query(
            `
            INSERT INTO Users(email, name, city) VALUES(?, ?, ?); 
            `,
            [email, name, city],
            (err, results) => {
                console.log("error connecting: " + err);
                return res.status(200).json({
                    message: true,
                });
            }
        );
    },

    // /api/v1/update-user
    PostUpdateUser(req, res) {
        const reqData = req.body; // data được lấy từ phía người dùng về: obj

        let email = reqData.email;
        let name = reqData.myname;
        let city = reqData.city;
        let idUser = req.params.id;

        // console.log(`${email} || ${name} || ${city}`);
        if (!email || !name || !city || !idUser) {
            return res.status(404).json({
                message: 'error',
            });
        }
        connection.query(
            `
            UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?
            `,
            [email, name, city, idUser],
            (err, results) => {
                if (err) {
                    console.log("error connecting: " + err);
                    return res.status(404).json({
                        message: 'db error',
                    });
                }
                return res.status(200).json({
                    message: true,
                });
            }
        );
    },

    // /api/v1/delete-user
    PostDeleteUser(req, res) {
        let idUser = req.params.id;
        if (!idUser) {
            return res.status(404).json({
                message: 'error',
            });
        }
        connection.query(
            `
            DELETE FROM Users WHERE id = ?
            `,
            [idUser],
            (err, results) => {
                if (err) {
                    console.log("error connecting: " + err);
                    return res.status(404).json({
                        message: 'db error',
                    });
                }
                return res.status(200).json({
                    message: true,
                });
            }
        );
    }
}

module.exports = ApiController;