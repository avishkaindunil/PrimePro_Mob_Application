const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'primeproDB', // Replace with your database name
  password: 'avishka@99', // Replace with your PostgreSQL password
  port: 5432,             // Default PostgreSQL port
});

module.exports = pool;
