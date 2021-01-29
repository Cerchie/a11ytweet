
"use strict";
//restricts from using undeclared variables, for example
//for more read https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
/** Database setup for jobly. */

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

const db = new Client({
  connectionString: getDatabaseUri(),
});

db.connect();

module.exports = db;

//borrowed db setup from bootcamp setup