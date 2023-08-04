const db = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const conn = db.createConnection({
    user : process.env.MYSQL_USER,
    host : process.env.MYSQL_HOST,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
}).promise()

conn.connect()

module.exports = conn