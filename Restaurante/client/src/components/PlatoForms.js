import React, { useState } from 'react';
import { Grid, Typography, Card, TextField, Button, CircularProgress, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bg from '../img/bg_platoForms.png';

const buttonStyles = {
  borderRadius: '0px', 
  padding: '5px 12px', 
  backgroundColor: '#cccccc', 
  color: '#2d2d2d', 
  transition: 'background-color 0.3s', 
  '&:hover': {
    backgroundColor: '#b2b2b2', 
  },
};

const buttonStylesNow = {
  borderRadius: '0px', 
  padding: '5px 12px', 
  backgroundColor: '#b2b2b2', 
  color: '#000000', 
  transition: 'background-color 0.3s', 
  '&:hover': {
    backgroundColor: '#999999', 
  },
};

export default function PlatoForms() {
  const [plato, setPlato] = useState({
    plato_nombre: '',
    plato_precio: '',
    plato_descripcion: '',
    plato_disponibilidad: false,
    plato_imagen: ''
  });

  

  const [loading, setLoading] = useState(false);
  const [precioError, setPrecioError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [descError, setDescError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/platos", {
        method: 'POST',
        body: JSON.stringify(plato),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error('Error al guardar el plato');
      }

      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChangeNombre = e => {
    const value = e.target.value;
    if (value) {
      setPlato({ ...plato, plato_nombre: value });
      setNombreError('');
    } else {
      setNombreError('Ingrese solo letras o espacios.');
    }
  };

  const handleChangeDesc = e => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value) || value === '') {
      setPlato({ ...plato, plato_descripcion: value });
      setDescError('');
    } else {
      setDescError('Ingrese solo letras o espacios.');
    }
  };

  const handleChangePrecio = e => {
    const value = e.target.value;
    if (/^\d+(\,\d{0,2})?$/.test(value) || value === '') {
      setPlato({ ...plato, plato_precio: value });
      setPrecioError('');
    } else {
      setPrecioError('Ingrese solo números');
    }
  };

  const handleChangeDisponibilidad = e => {
    const checked = e.target.checked;
    setPlato({ ...plato, plato_disponibilidad: checked });
  }

  const handleChangeImagen = e => {
    const value = e.target.value;
    setPlato({ ...plato, plato_imagen: value });
  }

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTop: '10px'
      }}
    >
      <Grid item xs={20} md={10} lg={4}>
      <Button disableRipple sx={buttonStylesNow}>Crear Plato </Button>
      <Button disableRipple sx={buttonStyles} onClick={() => navigate('/edit')} >Editar Plato</Button>
      <Button disableRipple sx={buttonStyles} onClick={() => navigate('/delete')} >Eliminar Plato</Button>
        <Card variant='outlined' sx={{
          p: 4,
          backgroundColor: '#ffffff',
          border: 2,
          borderColor: '#cccccc'
        }}>
          <Typography variant='h5' gutterBottom align='center' sx={{
            color: '#232520',
          }}>
            Crear Plato
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant='outlined'
              label='Nombre'
              name="plato_nombre"
              value={plato.plato_nombre}
              onChange={handleChangeNombre}
              margin='normal'
              error={!!nombreError}
              helperText={nombreError}
            />
            <TextField
              fullWidth
              variant='outlined'
              label='Precio'
              name='plato_precio'
              value={plato.plato_precio}
              onChange={handleChangePrecio}
              margin='normal'
              error={!!precioError}
              helperText={precioError}
            />
            <TextField
              fullWidth
              multiline
              variant='outlined'
              label='Descripción'
              name='plato_descripcion'
              value={plato.plato_descripcion}
              onChange={handleChangeDesc}
              margin='normal'
              error={!!descError}
              helperText={descError}
            />
            <TextField
              fullWidth
              multiline
              variant='outlined'
              label='Enlace de la imagen'
              name='plato_imagen'
              value={plato.plato_imagen}
              onChange={handleChangeImagen}
              margin='normal'
            />
            <Typography variant='body1' gutterBottom align='left' sx={{
              color: '#68706a',
              fontFamily: 'Arial'
            }}>
              ¿Está disponible?

              <Typography variant='body1' gutterBottom align='right' sx={{
                color: '#68706a',
                fontFamily: 'Arial'
              }}>
                <Checkbox
                  checked={plato.plato_disponibilidad}
                  onChange={handleChangeDisponibilidad}
                  sx={{
                    color: '#cccccc',
                    '&.Mui-checked': {
                      color: '#b2b2b2'
                    }
                  }}
                />
                Sí
              </Typography>
            </Typography>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              disabled={!plato.plato_nombre || !plato.plato_descripcion || !plato.plato_precio || loading || !!precioError ||!plato.plato_imagen}
              sx={buttonStylesNow}
            >
              {loading ? <CircularProgress size={24} color='inherit' /> : 'Guardar'}
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}