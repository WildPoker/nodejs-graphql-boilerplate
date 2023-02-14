/**
 * Module for managing the dbs for user
 * @module dbs/user
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
   * Call mongodb for adding an user to the database
   * @param {User} user The user to add to the database
   * @return {User} The user added with the id
   **/
  insert: product => {
    return model.create(product)
  }
}
