'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  """
  The result of the call
  """
  type Result {
    """
    True if the call is a success or else false
    """
    result: Boolean!
  }
`
