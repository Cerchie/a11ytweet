const { BadRequestError } = require('../expressError')

/**
 * Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE
 * statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database column names,
 *   like { username: "username" }
 *
 * @returns {Object} {sqlSetCols, dataToUpdate}
 *
 * @example {username: 'Chickens21'} =>
 *   { setCols: '"username"=$1,
 *     values: ['Chickens21'] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate)
    if (keys.length === 0) throw new BadRequestError('No data')

    // {username: 'Chickens21'} => ['"username"=$1']
    const cols = keys.map(
        (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
    )

    return {
        setCols: cols.join(', '),
        values: Object.values(dataToUpdate),
    }
}

module.exports = { sqlForPartialUpdate }

//code adapted from Springboard solution to react-jobly https://github.com/Cerchie/react-jobly/blob/main/backend/helpers/sql.js
