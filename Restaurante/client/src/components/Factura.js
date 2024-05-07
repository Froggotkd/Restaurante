import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Card, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import logo from '../img/logo_big.png';

export default function Factura() {

  const buttonStyles = {
    fontFamily: 'Times New Roman, sans serif',
    borderRadius: '0px',
    padding: '5px 10px',
    backgroundColor: '#cccccc',
    color: '#2d2d2d',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#b2b2b2',
    },
    
  };

  const [platos, setPlatos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ultimoCliente, setUltimoCliente] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [detalles, setDetalles] = useState([]);

  const loadPlatos = async () => {
    const response = await fetch('http://localhost:4000/platos');
    const data = await response.json();
    setPlatos(data);
  };

  const loadCliente = async () => {
    const response = await fetch('http://localhost:4000/client');
    const data = await response.json();
    setClientes(data);

    if (data.length > 0) {
      const ultimoCliente = data[data.length - 1];
      setUltimoCliente(ultimoCliente);
      if (ultimoCliente.cliente_nombre === 'invalid') {
        ultimoCliente.cliente_nombre = ' ';
      }
      orden.orden_cliente = ultimoCliente.cliente_id
    }
  };

  const loadOrdenes = async () => {
    const response = await fetch('http://localhost:4000/orden');
    const data = await response.json();
    setOrdenes(data);

    if (data.length > 0) {
      const ultOrden = data[data.length - 1];
      console.log(ultOrden.orden_id)
      loadDetalles(ultOrden.orden_id);
      setUltOrdenID(ultOrden.orden_id)
     updOrden(ultOrden.orden_id);
    }
  };

  const setUltOrdenID = (value) =>{
    let ultOrdenID = value;
    return value;
  }

  const loadDetalles = async (value) => {
    const response = await fetch('http://localhost:4000/detalle/' + value);
    const data = await response.json();
    setDetalles(data);
  };

  useEffect(() => {
    loadPlatos();
    loadCliente();
    loadOrdenes();

  }, []);

  const date = new Date();
  const fechaString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  
  const getPlatoName = (platoId) => {
    const plato = platos.find((plato) => plato.plato_id === platoId);
    return plato ? plato.plato_nombre : 'Plato no encontrado';
  };

  const getPlatoPrecio = (platoId) => {
    const plato = platos.find((plato) => plato.plato_id === platoId);
    return plato ? plato.plato_precio : 'Plato no encontrado';
  };

  const getTotalPrecio = () => {
    let totalPrecio = 0;
    detalles.forEach((detalle) => {
      totalPrecio += detalle.detalle_cantidad * getPlatoPrecio(detalle.detalle_platos);
      orden.orden_precio = totalPrecio;
    });
    return totalPrecio;

  };

  const getIVA = (totalPrecio) => {
    let ivaNotRounded = totalPrecio * 0.15;
    let iva = Math.round(ivaNotRounded*100)/100
    orden.orden_iva = iva;
    return iva
  }

  const getPrecioFinal = (iva, subtotal) => {
    let precioFinal = iva + subtotal;
    orden.orden_preciofinal = precioFinal;
    return precioFinal;
  };
  

  const handleObtTicket = () => {
    loadCliente();
    loadOrdenes();
  }

  const [orden, setOrden] = useState({
    orden_precio: 0,
    orden_preciofinal :0,
    orden_iva: 0,
    orden_fecha: fechaString,
    orden_cliente: 3
  })




  const updOrden = async (value) => {
    try {
      const res = await fetch('http://localhost:4000/orden/' + value, {
        method: 'PUT',
        body: JSON.stringify(orden),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error('Error al guardar la orden');
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{
      minHeight: '100vh',
      backgroundImage: `linear-gradient(#ffffff, #fdfd86,#ffff46)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Card sx={{ padding: '20px', textAlign: 'center', width: '80%', backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <Grid container alignItems="center" justifyContent="center">
          <img  src={logo} alt='Logo' style={{ width: '80px', height: 'auto', marginRight: '10px' }}/>
          <Typography variant="h4" sx={{ fontFamily:'Times New Roman, sans serif', fontWeight:500 }} gutterBottom>Gracias por tu compra, disfruta!!</Typography>
        </Grid>
        <Button disableRipple sx={buttonStyles} onClick={handleObtTicket} >Obtén tu ticket aquí</Button>
        <Typography sx={{ fontSize: 18, fontStyle:'italic', fontFamily:'Times New Roman, sans serif', fontWeight:500, marginTop:2 }}>Muchas gracias {ultimoCliente.cliente_nombre} por tu compra</Typography>
      </Card>

      <Card sx={{ padding: '20px', textAlign: 'left', width: '60%', backgroundColor: 'rgba(255,255,255,0.9)', marginTop: 1.5}} >
        <Typography sx={{fontSize: 22, fontFamily:'Times New Roman, sans serif', fontWeight:800 }} gutterBottom>Detalles del Cliente:</Typography>
        <Typography sx={{fontSize: 18, fontFamily:'Times New Roman, sans serif', fontWeight:500 }}>Cédula: {ultimoCliente.cliente_cedula} -- Teléfono: {ultimoCliente.cliente_telefono}</Typography>
        <Typography sx={{fontSize: 18, fontFamily:'Times New Roman, sans serif', fontWeight:500 }}>Correo Electrónico: {ultimoCliente.cliente_correo} -- Dirección: {ultimoCliente.cliente_direccion}</Typography>
      </Card>

      <Card sx={{ padding: '20px', textAlign: 'left', width: '60%', backgroundColor: 'rgba(255,255,255,0.9)', marginTop: 1 }}>
      <Typography sx={{fontSize: 22, fontFamily:'Times New Roman, sans serif', fontWeight:800 }} gutterBottom>Detalles de la Compra:</Typography>
        {detalles.map((detalle, index) => (
          <Typography key={index} sx={{fontSize: 18,  fontFamily:'Times New Roman, sans serif' }}>
            {detalle.detalle_cantidad} x {getPlatoName(detalle.detalle_platos)} - Precio Unitario: {getPlatoPrecio(detalle.detalle_platos)}$ - Precio Total: {detalle.detalle_cantidad * getPlatoPrecio(detalle.detalle_platos)}$
          </Typography>
        ))}
        <Typography sx={{marginTop: 2,fontSize: 18,  fontFamily:'Times New Roman, sans serif' }}>Subtotal: {getTotalPrecio()}$  ---------- IVA (15%): {getIVA(getTotalPrecio())}$</Typography>
        <Typography sx={{fontSize: 18,  fontFamily:'Times New Roman, sans serif' }}>Precio Total: {getPrecioFinal(getIVA(getTotalPrecio()), getTotalPrecio())}$</Typography>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <QRCode value={`Cliente: ${ultimoCliente.cliente_nombre},Total: ${getPrecioFinal(getIVA(getTotalPrecio()), getTotalPrecio())}$`} />
        </Box>
      </Card>
    </Grid>
  )
}
