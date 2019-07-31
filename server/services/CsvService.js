const csvToJson = require('csvtojson')

module.exports = {
    /**
     * We need to inspect file format to be sure it matches our sample file
     * @param {Object} data 
     * @returns {Promise}
     */
    inspectFileFormat(data) {
        return new Promise(resolve => {
            // we pick at random
            const row = data[Math.floor(Math.random() * data.length)]
            
            if(!row) return resolve(false)

            // Expected object properties
            const validProps = ['Employee ID', 'Billable Rate (per hour)', 'Project', 'Date', 'Start Time', 'End Time']

            let valid = true

            for(let prop of validProps) {
                if(!row[prop]) {
                    // File is missing important row. Thus making it invalid
                    // Can decide to let them known which part of the file is invalid
                    // console.log(prop)
                    valid = false
                }
            }

            resolve(valid)
        })
    },
    /**
     * Processes a CSV file and returns json data
     * @param {String} file_path
     */
    processFile(file_path) {
        return new Promise((resolve, reject) => {
            csvToJson().fromFile(file_path)
                .then((jsonObj) => {
                    // inspecting csv file format
                    this.inspectFileFormat(jsonObj)
                        .then(valid => {
                            resolve(valid ? jsonObj : [])
                        })
                }).catch(err => reject(err))
        })
    }
}