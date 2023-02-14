/**
 * Set of global functions or constants about utils
 * @module libs/utils
 */
'use strict'
require('isomorphic-fetch')

module.exports = {
  /**
   * Return the mode of node or affect one if none has been given
   * @param {string} node_env The mode of node
   * @return {string} The mode of node
   **/
  mode: node_env => {
    return node_env !== undefined ? node_env.trim() : 'development'
  },
  /**
  * Return the result of a query
  * @params {Object} query The query
  * @params {String} method The method of the query
  * @params {String} url The url to fetch
  * @params {String} bearer The bearer token to add for authenticate query
  /**
  * @return {Object} The result of the query
  **/
  fetch: async (method, url, query = null, bearer = null, full_response = false) => {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    }

    if (query !== null) {
      options.body = JSON.stringify(query)
    }

    if (bearer !== null) {
      options.headers.Authorization = 'Bearer ' + bearer
      options.credentials = 'include'
      options.withCredentials = true
      options.headers.Accept = 'application/json'
    }

    const response = await fetch(url, options)
    const response_json = await response.json()
    if (full_response) {
      return response_json
    }
    return response_json.errors !== undefined ? response_json : response_json.data
  }
}
