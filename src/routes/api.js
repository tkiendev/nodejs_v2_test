const express = require('express');
const { use } = require('./web');
const router = express.Router(); // cấu hình hàm Router() trong thư viện express

let ApiController = require('../controllers/ApiController')
const initApiRoute = (app) => {
    // router.Method('/route', controllers);

    router.get('/AllUses', ApiController.getAllUses); // /api/v1/AllUses
    router.post('/CreateUser', ApiController.PostCreateUser); // /api/v1/CreateUser
    router.put('/update-user/:id', ApiController.PostUpdateUser); // /api/v1/update-user
    router.delete('/delete-user/:id', ApiController.PostDeleteUser); // /api/v1/delete-user

    return app.use('/api/v1/', router);
}

module.exports = initApiRoute;