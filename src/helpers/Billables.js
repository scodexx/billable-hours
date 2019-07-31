import lodash from 'lodash'
import { diffTimeUTC } from '../utils/TimeUtils'

/**
 * Groups billables by projects and also groups similar IDs in a project
 *  and combines cost
 * @param   {Array} billables 
 * @returns {Array}
 */
export const groupBillablesByProjects = billables => {
    const projectGroups = lodash.groupBy(billables, 'project')
    
    return Object.keys(projectGroups).map(project => {
        // next, we want to group similar billables by id
        //  and add total cost together
        const projectBillables = projectGroups[project]
        const uniqueBillables = projectBillables.reduce(function(acc, x) {
            var id = acc[x.id]

            if (id) {
                id.hours += x.hours
                id.total_cost += x.total_cost
            } else {
                acc[x.id] = x
            }

            return acc
        }, {})

        return {
            name: project,
            billables: Object.keys(uniqueBillables).map(id => uniqueBillables[id]),
        }
    })
}

/**
 * Transform a csv extracted billable object to app format
 * @param {Object} billable Billable
 * @returns {Object}
 */
export const transformBillable = billable => {
    let _billable = {
        id:         billable['Employee ID'],
        project:    billable['Project'],
        date:       billable['Date'],
        start_time: billable['Start Time'],
        end_time:   billable['End Time'],
        unit_price: Number(billable['Billable Rate (per hour)']),
    }

    _billable['hours'] = diffTimeUTC(_billable.start_time, _billable.end_time)
    _billable['total_cost'] = _billable.hours * _billable.unit_price

    return _billable
}