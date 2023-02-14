'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  """
  Queries of the app
  """
  type Query  {
    """
    Return the user in the system
    """
    get_user_by_id(
      "The id of the user"
      user_id: String): User! @isLoggedIn
    
    """
    Return the user in the system
    """
    check_user_by_email(
      "The email of the user"
      email: String): Result!

    """
    Get the user from his bearer token\n
    Return the user informations contains inside his bearer token
    """
    get_myself: User! @isLoggedIn

    """
    Return the config of the system
    """
    get_config: Config! @isAdmin @isLoggedIn
  }
`
