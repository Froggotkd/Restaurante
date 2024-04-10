import React, { useState, useEffect } from 'react';
import {AppBar, Box, Grid, Typography, Card, TextField, Button, CircularProgress, Checkbox, List, ListItemText, ListItem, Collapse, ListItemButton, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bg from '../img/bg_platoForms.png';

const buttonStyles = {
  fontFamily: 'Times New Roman, sans serif',
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
  ...buttonStyles,
  backgroundColor: '#b2b2b2',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#999999',
  },
};

const PlatoUpdate = () => {
  const [plato, setPlato] = useState({
    plato_nombre: '',
    plato_precio: '',
    plato_descripcion: '',
    plato_disponibilidad: false,
    plato_imagen: '',
    plato_categoria: '' // Add plato_categoria to the plato state
  });

  const [loading, setLoading] = useState(false);
  const [precioError, setPrecioError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [descError, setDescError] = useState('');
  const [open, setOpen] = useState(true);
  const [platos, setPlatos] = useState([]);
  const [platoActualizar, setPlatoActualizar] = useState({});
  const categorias = ['Bebidas', 'Cafetería', 'Platos', 'Postres'];


  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch('http://localhost:4000/platos');
        if (!response.ok) {
          throw new Error('Error al cargar los platos');
        }
        const data = await response.json();
        setPlatos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:4000/platos/${plato.plato_nombre}`, {
        method: 'PUT',
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
    if (value) {
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

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  }


  const handleNestedItemClick = (plato) => {
    setPlatoActualizar(plato);

    setPlato({
      plato_nombre: plato.plato_nombre,
      plato_precio: plato.plato_precio,
      plato_descripcion: plato.plato_descripcion,
      plato_disponibilidad: plato.plato_disponibilidad,
      plato_imagen: plato.plato_imagen,
      plato_categoria: plato.plato_categoria // Update plato_categoria when selecting a plato
    });
  };

  const handleCategoriaLista = (categoria) => {

    setPlato({ ...plato, plato_categoria: categoria });
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
      <Grid item xs={20} md={10} lg={6} sx={{ marginTop: 10}}>
      <AppBar sx={{ bgcolor: 'white', p: 0.8 }}>
          <Box>
            <Button disableRipple onClick={() => navigate('/')}
            sx={{
              marginLeft: 120, bgcolor: 'white', fontFamily: 'Times New Roman, sans serif', color: '#2d2d2d',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#cccccc',
              },
            }}>Menú Principal</Button>
          </Box>
        </AppBar>
        <Button disableRipple sx={buttonStyles} onClick={() => navigate('/create')}>Crear Plato </Button>
        <Button disableRipple sx={buttonStylesNow} onClick={() => navigate('/edit')} >Editar Plato</Button>
        <Button disableRipple sx={buttonStyles} onClick={() => navigate('/delete')} >Eliminar Plato</Button>
        <Card variant='outlined' sx={{
          p: 4,
          backgroundColor: '#ffffff',
          border: 2,
          borderColor: '#cccccc',
        }}>
          <Typography variant='h5' gutterBottom align='center' sx={{
            color: '#232520', fontWeight: 450, fontFamily: 'Times New Roman, sans serif'
          }}>
            Editar Plato
          </Typography>
          <form onSubmit={handleSubmit}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              sx={{ width: '100%', maxWidth: 505, bgcolor: '#f3f3f3', borderRadius: 3 }}
            >
              <ListItem onClick={handleClick}>
                <ListItemText primary={<Typography sx={{ fontFamily: 'Times New Roman, sans serif' }}>Platos Existentes</Typography>} />
                {open ? <ListItemIcon> &#9654; </ListItemIcon> : <ListItemIcon> &#9660; </ListItemIcon>}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {platos.filter(item => item.plato_id !== 1).map((plato) => (
                  <ListItem key={plato.plato_id} onClick={() => handleNestedItemClick(plato)}>
                    <ListItemButton>
                      <ListItemText secondary={<Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 15 }}>{plato.plato_nombre}</Typography>} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            </List>
            <TextField
              inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              variant='outlined'
              label='Nombre del plato'
              name="plato_nombre"
              value={plato.plato_nombre}
              onChange={handleChangeNombre}
              margin='normal'
              error={!!nombreError}
              helperText={nombreError}
              sx={{ marginRight: 7 }}
            />
            <TextField
              inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              variant='outlined'
              label='Precio del plato'
              name='plato_precio'
              value={plato.plato_precio}
              onChange={handleChangePrecio}
              margin='normal'
              error={!!precioError}
              helperText={precioError}
            />
            <TextField
              inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              fullWidth
              multiline
              variant='outlined'
              label='Descripción del plato'
              name='plato_descripcion'
              value={plato.plato_descripcion}
              onChange={handleChangeDesc}
              margin='normal'
              error={!!descError}
              helperText={descError}
            />
            <TextField
              inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              fullWidth
              multiline
              variant='outlined'
              label='Enlace de la imagen'
              name='plato_imagen'
              value={plato.plato_imagen}
              onChange={handleChangeImagen}
              margin='normal'
            />
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              sx={{ width: '100%', maxWidth: 520, bgcolor: '#f3f3f3', borderRadius: 3, marginBottom: 1, marginTop: 1 }}
            >
              <ListItem onClick={handleClick}>
                <ListItemText disableTypography primary={<Typography sx={{
                  fontSize: 17, color: '#808080', fontFamily:'Times New Roman, sans serif'
                }} >Categoría</Typography>} />
                {open ? <ListItemIcon> &#9654; </ListItemIcon> : <ListItemIcon> &#9660; </ListItemIcon>}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {categorias.map((categoria) => (
                  <ListItem onClick={() => handleCategoriaLista(categoria)}>
                    <ListItemButton>
                      <ListItemText secondary={<Typography sx={{fontFamily:'Times New Roman, sans serif', fontSize:15 }}>{categoria}</Typography> } />
                      {plato.plato_categoria === categoria && <ListItemIcon>✔</ListItemIcon>} 
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            </List>
            <Typography variant='body1' gutterBottom align='left' sx={{
              color: '#68706a',
              fontFamily:'Times New Roman, sans serif'
            }}>
              ¿Está disponible?
              <Typography variant='body1' gutterBottom align='right' sx={{
                color: '#68706a',
                fontFamily:'Times New Roman, sans serif'
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
              disabled={!plato.plato_nombre || !plato.plato_descripcion || !plato.plato_precio || loading || !!precioError}
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

export default PlatoUpdate;
