const  {Router} = require ('express')
const {createDetalle, getDetalle} = require('../controllers/detalleControllers')

const router = Router()

router.post('/detalle', createDetalle)

router.get('/detalle/:detalle_ordenID' , getDetalle)

module.exports = router;