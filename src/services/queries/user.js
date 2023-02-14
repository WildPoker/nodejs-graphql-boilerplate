/**
 * The queries for the user
 * @module queries/user
 */
'use strict'

const utils_user = require('@src/services/utils/user')
const utils_auth = require('@src/services/utils/auth')
/**
 * Manage the queries for the question model
 **/
module.exports = {
  /**
   * Query for getting the user using the call
   * Basically, it reads the bearer token and return the user
   * @param {User} Return the user
   **/
  get_myself: async (_, args, ctx) => {
    const payload = utils_auth.read_token_from_context(ctx)
    return utils_user.get_user_by_id(payload._id)
  },
  /**
   * Query for getting an user from an id
   * @param {User} Return the user
   **/
  get_user_by_id: async (_, args) => {
    return utils_user.get_user_by_id(args.user_id)
  },
  /**
   * Query for getting an user from an id
   * @param {User} Return the user
   **/
  check_user_by_email: async (_, args) => {
    const check_email = await utils_user.is_user_exist_by_email(args.email)
    return { result: check_email }
  }
}
