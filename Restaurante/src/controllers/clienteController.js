const pool = require('../db')

const getCliente = async (req, res, next) => {
    const resultado = await pool.query('SELECT * FROM cliente')
    res.json(resultado.rows);

}

const createCliente = async (req, res, next) => {
    const {cliente_nombre, cliente_cedula, cliente_correo, cliente_direccion, cliente_telefono} = req.body;

    try {
        const result = await pool.query('INSERT INTO cliente (cliente_nombre, cliente_cedula, cliente_correo, cliente_direccion, cliente_telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [cliente_nombre, cliente_cedula, cliente_correo, cliente_direccion, cliente_telefono]);
        res.json(result.rows[0]);
    } catch (error) {
        res.json(error.message)
    }

}

module.exports ={
    getCliente,
    createCliente
}