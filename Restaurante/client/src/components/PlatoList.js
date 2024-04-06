import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import bg from '../img/bg1-list.png';

export default function PlatoList() {
  const [platos, setPlatos] = useState([]);

  const loadPlatos = async () => {
    const response = await fetch('http://localhost:4000/platos');
    const data = await response.json();
    setPlatos(data);
  };

  useEffect(() => {
    loadPlatos();
  }, []);

  return (
    <Grid style={{
      minHeight: '100vh',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {(
        platos.map((plato) => (
          <Card
            key={plato.id}
            style={{ marginBottom: "20px", marginRight: "20px", width: "300px", marginTop: "10px"}}
            sx={{
              borderRadius: '10px',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
              border: 5,
              borderColor: '#000000'
            }}
          >
            {console.log(plato.plato_imagen+ plato.plato_nombre) }
            <img src={plato.plato_imagen}    style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }} />
            <CardContent>
              <Typography variant="h6">{plato.plato_nombre}</Typography>
              <Typography variant="body1" color="textSecondary">Precio: {plato.plato_precio}</Typography>
              <Typography variant="body2" color="textSecondary">Descripción: {plato.plato_descripcion}</Typography>
              <Typography variant="body2" color="textSecondary">{plato.plato_disponibilidad ? 'Disponible' : 'No disponible'}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
    </Grid>
  );
}