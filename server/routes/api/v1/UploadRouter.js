const router = require('express').Router()
const expressFile = require('express-fileupload')
const upload = require('../../../controllers/UploadController')

router.post('/process-timesheet', expressFile(), upload.handleUpload)

module.exports = router