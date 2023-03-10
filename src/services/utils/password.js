/**
 * The utils function for managing the password (creation and restriction)
 * @module utils/password
 */
'use strict'

const bcrypt = require('bcrypt')

/**
 * Manage the utils function for password
 **/
module.exports = {
  /**
   * Hash a password with bcrypt
   * @param {number} alternative_salt If we want to specify a different salt that the environment file
   * @return The encrypted password
   **/
  hash_password: async (password, alternative_salt = null) => {
    const salt = alternative_salt !== null ? alternative_salt : Number(process.env.BCRYPT_SALT)
    return bcrypt.hash(password, salt)
  },
  /**
   * Compare a password with a hash password
   * @param {string} password The password we want to check
   * @param {string} hash_password The password to what we want to check
   * @return The encrypted password
   **/
  compare_password_hash: async (password, hash_password) => {
    return bcrypt.compare(password, hash_password)
  },
  /**
   * Check if the password has a lowercase
   * @param {string} password The password to check
   * @return {string} True if the password has a lowercase or else False
   **/
  has_lowercase: password => {
    return /[a-z]/.test(password)
  },
  /**
   * Check if the password has a uppercase
   * @param {string} password The password to check
   * @return {string} True if the password has a uppercase or else False
   **/
  has_uppercase: password => {
    return /[A-Z]/.test(password)
  },
  /**
   * Check if the password has a number
   * @param {string} password The password to check
   * @return {string} True if the password has a number or else False
   **/
  has_number: password => {
    return /[0-9]/.test(password)
  },
  /**
   * Check if the password is long enough
   * @param {string} password The password to check
   * @return {string} True if the password is long enough or else False
   **/
  has_enough_length: async (password, length) => {
    return password.length > 6
  },
  /**
   * Check if the password depending of the conditon passed
   * The conditions represente the name of the function of the password util file
   * @param {string} password The password to check
   * @param {string[]} conditions An array of the name of the check function
   * @return {string} True if the password respect all condition or else False
   **/
  check_new_password: async (password, conditions = []) => {
    const result = await conditions.reduce(async (accumulator, current_value) => {
      return Promise.resolve((await accumulator) + Number(await module.exports[current_value](password)))
    }, Promise.resolve(0))
    return result !== conditions.length
  },
  /**
   * Check if the password respect all the condition from the config
   * @param {string} password The password to check
   **/
  check_password_strong_enough: async password => {
    const password_restrictions = ['has_lowercase', 'has_uppercase', 'has_number', 'has_enough_length']
    const is_password_not_strong = await module.exports.check_new_password(password, password_restrictions)
    if (is_password_not_strong) {
      return {
        error:
          'This password is not strong enough. It must have a lowercase, an uppercase, a number and a length superior at ' +
          Number(process.env.password_minimum_character)
      }
    }

    return is_password_not_strong
  }
}
