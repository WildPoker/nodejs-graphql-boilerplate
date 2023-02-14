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
  insert: user => {
    return model.create(user)
  },
  /**
   * Call mongodb for getting an user by id
   * @param {String} id The id to search
   * @return {Object} The user found or null
   **/
  get_user_by_id: id => {
    return model.findOne({ _id: id })
  },
  /**
   * Call mongodb for getting an user by email
   * @param {String} email The id to search
   * @return {Object} The user found or null
   **/
  get_user_by_email: email => {
    return model.findOne({ email })
  },
  /**
   * Call mongodb for getting a manager by id
   * @param {String} id The id os the user to search
   * @param {String} user_type The id of the manager to search
   * @return {Object} The manager found or null
   **/
  get_manager_by_id: (id, manager_type_id) => {
    return model.findOne({ _id: id, user_type: manager_type_id })
  },
  /**
   * Call mongodb for getting an user by login
   * @param {String} login The login to search
   * @return {Object} The user found or null
   **/
  get_user_by_login: login => {
    return model.findOne({ $or: [{ email: login }, { username: login }] })
  },
  /**
   * Update a document in mongodb respecting the condtion
   * @param {Object} update The update to apply
   * @return {Object} The document updated or null
   **/
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  /**
   * Call mongodb for testing the existence of an user by username
   * @param {String} username The username to search
   * @return {boolean} True if a document exist or else False
   **/
  test_user_by_username: username => {
    return model.exists({ username: username })
  },
  /**
   * Call mongodb for testing the existence of an user by user type
   * @param {String} user_type The user type to search
   * @return {boolean} True if a document exist or else False
   **/
  test_user_by_user_type: user_type => {
    return model.exists({ user_type })
  },
  /**
   * Call mongodb for testing the existence of an user by email
   * @param {String} username The username to search
   * @return {boolean} True if a document exist or else False
   **/
  test_user_by_email: email => {
    return model.exists({ email: email })
  }
}
