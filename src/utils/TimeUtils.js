import moment from 'moment'

/**
 * Calculates the difference between two times (UTC)
 * @param {String} startTime 
 * @param {String} endTime 
 */
export const diffTimeUTC = (startTime, endTime) => {
    const start = moment.utc(startTime, "HH:mm")
    const end = moment.utc(endTime, "HH:mm")
    /* istanbul ignore next */
    // account for crossing over to midnight the next day
    if (end.isBefore(start)) end.add(1, 'day')
    /* istanbul ignore next */
    // calculate the duration
    const d = moment.duration(end.diff(start))
    // subtract the lunch break (assuming there was one... just in case)
    // d.subtract(30, 'minutes')
    // return formatted result
    return moment.utc(+d).hour()
}