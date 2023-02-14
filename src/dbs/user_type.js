/**
* Module for managing the dbs for user_type
* @module dbs/user_type
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const mongoose = require('mongoose')

module.exports = {
  /**
  * Call mongodb for adding an user type to the database
  * @param {User} user The usertype  to add to the database
  * @return {User} The user added with the id
  **/
  insert: (user_type) => {
    return model.create(user_type)
  },
  /**
  * Call mongodb for getting an user by id
  * @param {String} id The id of the user type to search
  * @return {Object} The user type found or null
  **/
  get_user_type_by_id: id => {
    return model.findOne({ _id: id })
  },
  /**
  * Call mongodb for getting an user type by name
  * @param {String} name The name of the user type to search
  * @return {Object} The user type found or null
  **/
  get_user_type_by_name: name => {
    return model.findOne({ name: name })
  },
  /**
  * Update a document in mongodb respecting the condtion
  * @param {Object} update The update to apply
  * @return {Object} The document updated or null
  **/
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id }, update, { new: true })
  },
  /**
  * Call mongodb for removing a document
  * @param {String} _id The id of the document to delete
  * @return {Object} The document deleted or null
  **/
  remove_user_type_by_id: _id => {
    return model.deleteOne({ _id })
  }
}
