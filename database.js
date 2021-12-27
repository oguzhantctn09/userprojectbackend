const Pool = require('pg').Pool;

const db = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'kullanicilar',
  host: 'localhost',
  port: 5432
})

module.exports = db;