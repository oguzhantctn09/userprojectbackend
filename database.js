const Pool = require('pg').Pool;

const db = new Pool({
  user: 'postgres',
  password: 'welcome1',
  database: 'test',
  host: 'localhost',
  port: 5432
})

module.exports = db;