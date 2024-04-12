const  {Router} = require ('express')
const {createOrden, getOrden, updateOrden} = require('../controllers/compraControllers')
const router = Router()

router.post('/platos/orden', createOrden)
router.get('/orden', getOrden)
router.put('/orden/:orden_id', updateOrden)

module.exports = router