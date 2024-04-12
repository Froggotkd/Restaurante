import React, { useState } from 'react'
import bg from '../img/bg_ticket.jpg';
import {Button, Grid, Card, Typography} from '@mui/material'


export default function Factura() {


  const [clientes, setClientes] = useState([]); //Array de objetos clientes
  const loadCliente = async () => { //Cargar los clientes y guardarlos en el array
    const response = await fetch('http://192.168.100.24:4000/client');
    const data = await response.json();
    setClientes(data);
  
    if (data.length > 0) {
      const ultimoCliente = data[data.length - 1];
      setUltimoCliente(ultimoCliente)
      if(ultimoCliente.cliente_nombre === 'invalid'){
        ultimoCliente.cliente_nombre = ' '
      }
    }
  };
  const [ultimoCliente, setUltimoCliente] = useState([]);


  const [ordenes, setOrdenes] = useState([]); //Array de objetos ordenes
  const loadOrdenes = async () => { //Cargar las ordenes y guardarlos en el array
    const response = await fetch('http://192.168.100.24:4000/orden');
    const data = await response.json();
    setOrdenes(data);
  
    if (data.length > 0) {
      const ultOrden = data[data.length - 1];
      console.log(ultOrden.orden_id)
      loadDetalles(ultOrden.orden_id);
    }
  };

  const [detalles, setDetalles] = useState([]); //Array de objetos detalles
  const loadDetalles = async (value) => { //Cargar las ordenes y guardarlos en el array
    const response = await fetch('http://localhost:4000/detalle/' + value);
    const data = await response.json();
    setDetalles(data);
    console.log(detalles)

  };


  const handleObtTicket =  () =>{
    loadCliente();
    loadOrdenes();
  }

  const [ultOrden, setUltOrden] = useState([]);

  return (
    <Grid container style={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}> 


      <Card sx={{height:'10%', width:'100%'}}>
        <Typography> Gracias por tu compra, disfruta!!</Typography>
        <Button onClick={handleObtTicket}>Obtén tu ticket aquí</Button>
        <Typography>Muchas gracias {ultimoCliente.cliente_nombre } por tu compra</Typography>
      </Card>
        
        <Card sx={{height:'10%', width:'100%'}} >
          <Typography>Cédula: {ultimoCliente.cliente_cedula} -------------- Teléfono: {ultimoCliente.cliente_telefono} --------------  Correo Electrónico: {ultimoCliente.cliente_correo} --------------  Dirección: {ultimoCliente.cliente_direccion} </Typography>
        </Card>
        <Card sx={{height:'10%', width:'100%', marginBottom:55}}>
          <Typography>Restuarant Patito - Quito, Ecuador</Typography>
        <Typography>Los detalles de tu compra son:  </Typography>
        


        </Card>
    </Grid>
  )
}

