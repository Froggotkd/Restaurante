const pool = require('../db')

const createDetalle = async (req, res, next) => {
    const {detalle_platos, detalle_ordenID, detalle_cantidad} = req.body;

    try {
        const result = await pool.query('INSERT INTO pedido_detalle (detalle_platos, "detalle_ordenID", detalle_cantidad) VALUES ($1, $2, $3) RETURNING *',
            [detalle_platos, detalle_ordenID, detalle_cantidad]);
        res.json(result.rows[0]);
    } catch (error) {
        res.json(error.message)
    }

}

const getDetalle = async ( req, res, next) => {
    try {
        const { detalle_ordenID} = req.params
        const result = await pool.query('SELECT * FROM pedido_detalle WHERE "detalle_ordenID"= $1', [detalle_ordenID])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Detalle not found"
            })
        }
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }

}

module.exports={
    createDetalle,
    getDetalle
}