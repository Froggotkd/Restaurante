const {Pool} = require ('pg');
const {db} = require('./config')


const pool = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    database: 'Restaurante',
    port: 5432
})

module.exports = pool;
