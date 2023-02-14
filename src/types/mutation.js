'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    """
    The method for signing to the application
    """
    signing(
      "The username of the user"
      username: String!
      "The email of the user"
      email: String!
      "The password of the user"
      password: String!
    ): Token

    """
    Login to the application with an account
    """
    login(
      "Username or email of the user"
      login: String!
      "Password of the user"
      password: String!
    ): Token


    """
    Create a product thru this mutation and be able to return the data
    """
    createProduct(
      "Enter The name of the product"
      name: String!
      "Enter the description of the prodcut"
      description: String!
    ): Product! @isLoggedIn
  }
`
