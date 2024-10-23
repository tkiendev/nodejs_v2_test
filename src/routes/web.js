const express = require('express');
const router = express.Router(); // cấu hình hàm Router() trong thư viện express

const multer = require('multer');
const path = require('path');
let appRoot = require('app-root-path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/public/image/'));
    },

    filename: (req, file, cb) => {
        // console.log('>>> check: ')
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

exports.imageFilter = imageFilter;


let upload = multer({ storage: storage, fileFilter: imageFilter })

const {
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
} = require('../controllers/homeController') // cấu hình đến file '../controllers/homeController' để lấy controllers

// router.Method('/route', controllers);

router.get('/', getHomepage); // render /home
router.get('/abc', getAbc); // render /abc
router.get('/sample', getSample); // render /sample
router.get('/create', getCreate); // render trang thêm 
router.get('/update/:id', getUpdate); // render trang sửa
router.post('/delete-user/:id', PostDeleteUser);  // render trang xóa

router.post('/create-user', PostCreateUser); // sử lý thêm
router.post('/update-user', PostUpdateUser);  // sử lý sửa
router.post('/delete-user', PostRemoveUser);  // sử lý sửa

router.get('/upload-file', getUploadFile); // render trang uplaodFile
router.post('/upload-profile_pic', upload.single('profile_pic'), PostSaveFile) // sư lý lưu file

module.exports = router;