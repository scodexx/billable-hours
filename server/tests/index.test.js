const { expect } = require('chai')

const rawBillables = require('./billables-raw')
const csvService = require('../services/CsvService')

/**
 * File inspection
 */
describe('FileService', () => {
    it('Should return invalid(false) for empty file', async () => {
        let valid = await csvService.inspectFileFormat([])
        expect(valid).to.be.false
    })

    it('Should return invalid(false) for invalid file', async() => {
        let valid = await csvService.inspectFileFormat([{
            prop1: 1,
            prop2: 2
        }])

        expect(valid).to.be.false
    })

    it('Should return valid(true) for valid file', async() => {
        let valid = await csvService.inspectFileFormat(rawBillables)
        expect(valid).to.be.true
    })

    it('Should return an array of billables', async() => {
        await csvService.processFile(`${__dirname}/billable.csv`)
            .then(billables => expect(billables).to.have.lengthOf(5))
    })

    it('Should return an array of empty billables', async() => {
        await csvService.processFile(`${__dirname}/billable-empty.csv`)
            .then(billables => expect(billables).to.have.lengthOf(0))
    })
})