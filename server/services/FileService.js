const csvService = require('./CsvService')
const fs = require('fs')

const errorLog = require('../handlers/ErrorLog')

module.exports = {
    /**
     * Handles file uploading to location
     * @param {Object} file 
     * @param {String} file_path 
     * @returns {Promise}
     */
    doUpload(file, file_path) {
        return new Promise((resolve, reject) => {
            file.mv(file_path, async err => {
                if(err) return reject(err)
        
                // File was uploaded successfully.
                // Now we process file and get content as json
                await csvService.processFile(file_path)
                    .then(json => resolve([true, json]))
                        .catch(err => reject(err))

                // finally, we delete the file. We don't need it anymore
                //  and we don't redundant files in our space
                // no need to wait for this to finish
                this.removeFile(file_path)
            })
        })
    },
    /**
     * Removes an uploaded file
     * @param {String} file_path Path to our uploaded file
     */
    removeFile(file_path) {
        return fs.unlink(file_path, err => {
            if(err) errorLog.log(err)
        })
    }
}