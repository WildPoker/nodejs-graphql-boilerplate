/**
 * The utils function for managing the authentication process
 * @module utils/auth
 */
'use strict'

const { ForbiddenError } = require('apollo-server-express')
const jwt_decode = require('jwt-decode')
const jwt = require('jsonwebtoken')

/**
 * Manage the utils function for the auth
 **/
module.exports = {
  /**
   * Return the secret key to be use with JWT
   * @return {string} The secret key
   **/
  get_secret: () => {
    return Buffer.from(process.env.SECRET_JWT, 'base64')
  },
  /**
   * Return the token from the bearer token
   * @param {string} bearer_token The bearer token
   * @return {string} The token
   **/
  get_token_from_bearer: bearer_token => {
    return bearer_token !== null && bearer_token.split(' ')[0] === 'Bearer' ? bearer_token.split(' ')[1] : null
  },
  /**
   * Create the informations to put inside the token
   * @param {Object} user The user you want to take the informations from
   * @return {Object} The payload
   **/
  create_payload: user => {
    return {
      microserver: 'usersmicroservice',
      date_given: Date.now(),
      _id: user._id
    }
  },
  /**
   * Create a token for an user
   * @param {Object} user The user you want to create the token for
   * @return {string} The token for the OAUTH
   **/
  create_token: user => {
    const payload = module.exports.create_payload(user)
    const token = jwt.sign(payload, module.exports.get_secret(), { expiresIn: process.env.TOKEN_EXPIRE_TIME })
    return token
  },
  /**
   * Decode a token using the secret key
   * @return {Object} The object who was encoded in the token
   **/
  decode_token: token => {
    return jwt.decode(token, module.exports.get_secret())
  },
  /**
   * Decode an unisgned token
   * @return {Object} An encoded object
   **/
  decode_unsigned_token: token => {
    return jwt_decode(token)
  },
  /**
   * Read the token and check is validity and if it expires
   * @param {Object} context The context of the call
   * @return {Object} The decoded information from the token
   **/
  read_token_from_context: context => {
    const token = module.exports.get_token_from_bearer(context.auth)

    if (!token) {
      if (context === null) {
        throw new ForbiddenError('The context is empty.')
      }

      const bearer_token = context.auth
      if (bearer_token === null) {
        throw new ForbiddenError('You dont have a bearer token.')
      }

      if (bearer_token.split(' ')[0] !== 'Bearer') {
        throw new ForbiddenError('Your token is not a bearer token.')
      }

      throw new ForbiddenError('Not Authorized.')
    }

    const payload = module.exports.decode_token(token)
    if (Date.now() > payload.exp * 1000) {
      throw new ForbiddenError('The token expired.')
    }

    return payload
  }
}
