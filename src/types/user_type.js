'use strict'

const { gql } = require('apollo-server-express')

/**
 * The User_type object
 * @typedef {Object} User_type
 * @property {string} name - The name of the user type
 * @property {Number} permission_level - The permission of the user
 */

module.exports = gql`
  """
  User type of the app \n
  Control the permission of the system
  """
  type User_type {
    """
    The id of the user type
    """
    _id: String!
    """
    The name of the user type
    """
    name: String!
    """
    The description of the user type
    """
    description: String
    """
    The permission of the user
    """
    permissions: [String]!
  }
`
