const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const platosRoutes = require('./routes/platoRoutes')
const compraRoutes = require('./routes/compraRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const detalleRoutes = require('./routes/detalleRoutes')


app.use(cors()); //conecta los dos servidores
app.use(morgan('dev'))
app.use(express.json());
app.use(platosRoutes)
app.use(compraRoutes)
app.use(clienteRoutes)
app.use(detalleRoutes)

/*app.use ((err, req, res, next)=>{
    return res.json({
        message: 'Error!!!'
    })
})*/

app.listen(4000);
console.log('Server on port 4000')