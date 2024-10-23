const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    // console.log('>>> check __dirname: ', __dirname)
    // console.log('>>> check: ', path.join('./src', 'views'));

    // cấu hình template engine: npm install --save-exact ejs@3.1.8
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs');

    // cấu hình static files
    app.use(express.static(path.join('./src', 'public')));
}

module.exports = configViewEngine;