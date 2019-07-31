const fileService = require('../services/FileService')
const errorLog = require('../handlers/ErrorLog')
const uniqid = require('uniqid')

/**
 * File upload
 * @param {*} req 
 * @param {*} res 
 */
exports.handleUpload = (req, res) => {
    if (Object.keys(req.files).length == 0) 
        return res.status(400).send('No file was uploaded.')

    const file = req.files.docFile
    const file_extension = file.name.split('.').pop()
    const file_name = `${uniqid.process()}.${file_extension}`
    const file_loc = `${__dirname}/../uploads/${file_name}`

    if(file_extension !== 'csv') 
        return res.json({
            status: 'error',
            message: 'Invalid file type. Only .csv file type is allowed',
        })

    fileService.doUpload(file, file_loc)
        /* eslint-disable-next-line */
        .then(([uploaded, jsonData]) => {
            // An empty jsonData either means either file format is off
            //  or no rows were found in file
            res.json({ 
                status: 'ok',
                message: 'Processing complete.',
                data: jsonData
            })
        }).catch(err => {
            errorLog.log(err)
            res.status(500).json({
                status: 'error',
                message: 'Upload failed',
            })
        })
}