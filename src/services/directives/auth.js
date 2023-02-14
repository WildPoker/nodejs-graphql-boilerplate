/**
 * The directives of the auth
 * @module directives/auth
 */
'use strict'

const { ForbiddenError, SchemaDirectiveVisitor } = require('apollo-server-express')
const utils_auth = require('@src/services/utils/auth')
const utils_user = require('@src/services/utils/user')
const utils_user_type = require('@src/services/utils/user_type')

/**
 * Create a directive for managing the Permissions of call
 * Checked that the user has a valid token for accessing the call
 **/
class isLoggedIn extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field
    field.resolve = async function (...args) {
      const payload = utils_auth.read_token_from_context(args[2])
      const user = await utils_user.get_user_by_id(payload._id)

      // I put false because some user does not have this properties
      if (user.is_active === false) {
        throw new ForbiddenError('This account is not active.')
      }

      return await resolve.apply(this, args)
    }
  }
}

/**
 * Create a directive for managing the Permissions of call
 * Checked that the user is an admin
 **/
class isAdmin extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field
    field.resolve = async function (...args) {
      const payload = utils_auth.read_token_from_context(args[2])
      const user = await utils_user.get_user_by_id(payload._id)
      const user_type = await utils_user_type.get_user_type_by_id(user.user_type)

      if (user_type.name !== 'ADMIN') {
        throw new ForbiddenError('You do not have enough permission for this request.')
      }

      return await resolve.apply(this, args)
    }
  }
}
module.exports = { isLoggedIn, isAdmin }
