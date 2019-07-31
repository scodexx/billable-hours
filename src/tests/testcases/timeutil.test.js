import { expect } from 'chai'

import { diffTimeUTC } from '../../utils/TimeUtils'

/**
 * Testing time utilities
 */
describe('Utils/TimeUtils', () => {
    it('Should get the difference in hours between two UTC times', () => {
        expect(diffTimeUTC('9:00', '17:00')).to.be.eql(8)
    })
})