/**
* Set of global functions or constants about the dbs and mongoose
* @module libs/dbs
*/
'use strict'

const constants = require('@src/libs/constants')

module.exports = {
  /**
  * Get the date of yesterday
  **/
  handle_classic_filters: ({ matches, order, sort, limit, skip, joint, count, additionnal }) => {
    const aggregation = []

    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      // Joint has been filtered in the filter util already
      aggregation.push({ $match: { ['$' + joint]: matches } })
    }

    // Sort the result
    order = order === constants.order_descending ? 1 : -1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    let result = [{
      $match: {}
    }]

    if (additionnal) {
      result = [...result, ...additionnal]
    }

    if (skip !== null) {
      result.push({ $skip: skip })
    }

    if (limit !== null) {
      result.push({ $limit: limit })
    }

    if (count !== null && count) {
      aggregation.push({
        $facet: {
          pageInfo: [
            {
              $count: 'totalRecords'
            }
          ],
          result
        }
      })
    }

    return aggregation
  }
}
