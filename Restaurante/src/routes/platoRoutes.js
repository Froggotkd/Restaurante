const  {Router} = require ('express')
const pool = require('../db')
const {getAllPlatos, getPlato, updatePlato, deletePlato, createPlato} = require('../controllers/platoControllers')

const router = Router()

router.get('/platos', getAllPlatos)

router.get('/platos/:plato_nombre', getPlato)

router.post('/platos', createPlato)

router.delete('/delete/:platoNombre', deletePlato)

router.put('/platos/:plato_nombreID', updatePlato)

module.exports = router;