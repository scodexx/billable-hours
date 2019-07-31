const v1 = require('express').Router();

v1.use('/upload', require('./UploadRouter'));

module.exports = v1;