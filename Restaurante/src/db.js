const {Pool} = require ('pg');
const {db} = require('./config')


const pool = new Pool({
    user: 'postgres',
    password: 'admin',
    host: '192.168.100.21',
    database: 'Restaurante',
    port: 5432
})

module.exports = pool;
