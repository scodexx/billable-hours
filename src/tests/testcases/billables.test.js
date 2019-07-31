import { expect } from 'chai'

import { groupBillablesByProjects, transformBillable } from '../../helpers/Billables'
import rawBillables from '../billables-raw'
import transformedBillables from '../billables-transformed'
import groupedBillables from '../billables-grouped'

/**
 * Testing billable helpers
 */
describe('Helpers/Billables', () => {
    it('Should transform billables', () => {
        const transformed = rawBillables.map(transformBillable)
        expect(transformed).to.eql(transformedBillables)
    })

    it('Should group billables', () => {
        const transformed = rawBillables.map(transformBillable)
        const grouped = groupBillablesByProjects(transformed)
        expect(grouped).to.be.eql(groupedBillables)
    })
})