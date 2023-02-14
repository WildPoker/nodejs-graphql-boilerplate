'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  # The Product
  """
  This is a product
  """
  type Product {
    """
    The name of the product
    """
    name: String!

    """
    The description of the product
    """
    description: String!
  }
`
