/**
 * The mutation for product
 * @module mutations/product
 */
'use strict'

const libs_logger = require('@src/libs/logger')
const utilsProduct = require('@src/services/utils/product')

module.exports = {
  /**
   * Signing to the application
   * @param {Object} _ The return value of the resolver (not needeed here)
   * @param {Object} args The argument passed to the function
   * @return {Object} The token and the user
   **/
  createProduct: async (_, args) => {
    libs_logger.log('New signing to the app', { args })

    return await utilsProduct.addProduct(args)
  }
}
