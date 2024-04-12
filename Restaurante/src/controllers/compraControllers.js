const pool = require('../db')

const createOrden = async (req, res, next) => {
    const { orden_precio, orden_preciofinal, orden_cliente, orden_fecha, orden_iva } = req.body
    try {
        const result = await pool.query('INSERT INTO orden (orden_precio, orden_preciofinal, orden_cliente, orden_fecha, orden_iva) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [orden_precio, orden_preciofinal, orden_cliente, orden_fecha, orden_iva]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }


}

const updateOrden = async (req, res, next) => {
    const { orden_id } = req.params;
    const { orden_precio, orden_preciofinal, orden_cliente, orden_fecha, orden_iva } = req.body;

    const result = await pool.query('UPDATE orden SET orden_precio = $1, orden_preciofinal = $2, orden_cliente = $3, orden_fecha = $4, orden_iva  = $5 WHERE orden_id = $6 RETURNING *', [orden_precio, orden_preciofinal, orden_cliente, orden_fecha, orden_iva, orden_id]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            message: 'Orden no encontrada'
        })
    }

    return res.json(result.rows[0])
}

const getOrden = async (req, res, next) => {
    const resultado = await pool.query('SELECT * FROM orden')
    res.json(resultado.rows);

}

module.exports = {
    createOrden,
    updateOrden,
    getOrden
}