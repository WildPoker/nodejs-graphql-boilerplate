/**
 * The utils function for managing the user
 * @module utils/user
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)

/**
 * Manage the mutations for the question model
 **/
module.exports = {
  /**
   * @param {Object} args - Containing the info of the user
   */
  addProduct: async args => {
    return dbs.insert(args)
  }
}
