const pool = require('../db')

 
const getAllPlatos = async (req, res, next) => {
    const resultado = await pool.query('SELECT * FROM menu')
    res.json(resultado.rows);
}

const getPlato = async (req, res, next) => {
    try {
        const { plato_nombre } = req.params
        const result = await pool.query('SELECT * FROM menu WHERE plato_nombre= $1', [plato_nombre])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Plato not found"
            })
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }

}

const updatePlato = async (req, res, next) => {

    const {plato_nombreID} = req.params;
    const { plato_nombre, plato_precio, plato_descripcion, plato_disponibilidad, plato_imagen, plato_categoria }= req.body;

    const result = await pool.query('UPDATE menu SET plato_nombre = $1, plato_precio = $2, plato_descripcion = $3, plato_disponibilidad = $4, plato_imagen = $5, plato_categoria = $6 WHERE plato_nombre = $7 RETURNING *', [plato_nombre, plato_precio, plato_descripcion, plato_disponibilidad, plato_imagen, plato_categoria, plato_nombreID]);

    if(result.rowCount === 0){
        return res.status(404).json({
            message: 'Plato no encontrado'
        })
    }

    return res.json(result.rows[0])

}


const deletePlato = async (req, res, next) => {
    const { platoNombre } = req.params
    const result = await pool.query('DELETE FROM menu WHERE plato_nombre = $1 RETURNING *', [platoNombre])

    if(result.rowCount === 0){
        return res.status(404).json({
            message: "Plato not found"
        })
    };

    return res.sendStatus(204);
}


const createPlato = async (req, res, next) => {
    const {plato_nombre, plato_precio, plato_descripcion, plato_disponibilidad, plato_imagen, plato_categoria} = req.body;

    try {
        const result = await pool.query('INSERT INTO menu (plato_nombre, plato_precio, plato_descripcion, plato_disponibilidad, plato_imagen, plato_categoria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [plato_nombre, plato_precio, plato_descripcion, plato_disponibilidad, plato_imagen, plato_categoria]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAllPlatos,
    getPlato,
    updatePlato,
    deletePlato,
    createPlato
}