const  {Router} = require ('express')
const pool = require('../db')
const {getCliente, createCliente} = require('../controllers/clienteController')

const router = Router()

router.post('/client', createCliente)

router.get('/client', getCliente)


module.exports = router