/**
* Set of global functions or constants about date
* @module libs/date
*/
'use strict'

const moment = require('moment')

module.exports = {
  /**
  * Get the date of yesterday
  **/
  yesterday: () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date
  },
  /**
   * Check the date format
   */
  check_date: async date => {
    if (!date) {
      return null
    }
    const result = moment(date, 'MM/DD/YYYY', true).isValid()
    if (!result) {
      throw new Error('The format of date you provided is not valid')
    }
    return date
  }
}
