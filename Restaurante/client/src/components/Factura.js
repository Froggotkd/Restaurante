import React, { useState, useEffect } from 'react';
import bg from '../img/bg_ticket.jpg';
import { Button, Grid, Card, Typography } from '@mui/material';

export default function Factura() {

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
    const response = await fetch('http://192.168.100.24:4000/client');
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
    const response = await fetch('http://192.168.100.24:4000/orden');
    const data = await response.json();
    setOrdenes(data);

    if (data.length > 0) {
      const ultOrden = data[data.length - 1];
      console.log(ultOrden.orden_id)
      loadDetalles(ultOrden.orden_id);
     updOrden(ultOrden.orden_id);
    }
  };

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
    let iva = totalPrecio * 0.15;
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
    <Grid container style={{
      minHeight: '100vh',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Card sx={{ height: '10%', width: '100%' }}>
        <Typography> Gracias por tu compra, disfruta!!</Typography>
        <Button onClick={handleObtTicket}>Obtén tu ticket aquí</Button>
        <Typography>Muchas gracias {ultimoCliente.cliente_nombre} por tu compra</Typography>
      </Card>

      <Card sx={{ height: '10%', width: '100%' }} >
        <Typography>Cédula: {ultimoCliente.cliente_cedula} -------------- Teléfono: {ultimoCliente.cliente_telefono} --------------  Correo Electrónico: {ultimoCliente.cliente_correo} --------------  Dirección: {ultimoCliente.cliente_direccion} </Typography>
      </Card>
      <Card sx={{ height: '10%', width: '100%', marginBottom: 55 }}>
        <Typography>Restuarant Patito - Quito, Ecuador</Typography>
        <Typography>Los detalles de tu compra son:  </Typography>

        {detalles.map((detalle, index) => (
          <Typography key={index}>
            {detalle.detalle_cantidad} x {getPlatoName(detalle.detalle_platos)} - - Precio Unitario: {getPlatoPrecio(detalle.detalle_platos)}$ - Precio Total: {detalle.detalle_cantidad * getPlatoPrecio(detalle.detalle_platos)}$
          </Typography>
        ))}

        <Typography>Subtotal: {getTotalPrecio()}$</Typography>
        <Typography>IVA (15%): {getIVA(getTotalPrecio())}$</Typography>
        <Typography>Precio Total: {getPrecioFinal(getIVA(getTotalPrecio()), getTotalPrecio())}$</Typography>
      </Card>
    </Grid>
  )
}