import React, { useReducer } from 'react';
import { Box, AppBar, Grid, Typography, Card, TextField, Button, CircularProgress, Checkbox, List, ListItemText, ListItem, Collapse, ListItemIcon, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bg from '../img/bg_platoForms.png';

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

const buttonStylesNow = {
  fontFamily: 'Times New Roman, sans serif',
  borderRadius: '0px',
  padding: '5px 10px',
  backgroundColor: '#b2b2b2',
  color: '#000000',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#999999',
  },
};

const initialState = {
  plato: {
    plato_nombre: '',
    plato_precio: '',
    plato_descripcion: '',
    plato_disponibilidad: false,
    plato_imagen: '',
    plato_categoria: ''
  },
  loading: false,
  precioError: '',
  nombreError: '',
  descError: '',
  open: false,
  selectedCategoria: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLATO':
      return { ...state, plato: { ...state.plato, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PRECIO_ERROR':
      return { ...state, precioError: action.payload };
    case 'SET_NOMBRE_ERROR':
      return { ...state, nombreError: action.payload };
    case 'SET_DESC_ERROR':
      return { ...state, descError: action.payload };
    case 'SET_OPEN':
      return { ...state, open: action.payload };
    case 'SET_SELECTED_CATEGORIA':
      return { ...state, selectedCategoria: action.payload };
    default:
      return state;
  }
};

export default function PlatoForms() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { plato, loading, precioError, nombreError, descError, open, selectedCategoria } = state;
  const categorias = ['Bebidas', 'Cafetería', 'Platos', 'Postres'];


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const res = await fetch("http://localhost:4000/platos", {
        method: 'POST',
        body: JSON.stringify(plato),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error('Error al guardar el plato');
      }

      dispatch({ type: 'SET_LOADING', payload: false });
      navigate('/');
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_PLATO', payload: { [name]: value } });
  };

  const handleChangeDisponibilidad = (e) => {
    const checked = e.target.checked;
    dispatch({ type: 'SET_PLATO', payload: { plato_disponibilidad: checked } });
  }

  const handleClick = () => {
    dispatch({ type: 'SET_OPEN', payload: !open });
  }

  const handleCategoriaLista = (categoria) => {
    dispatch({ type: 'SET_SELECTED_CATEGORIA', payload: categoria });
    dispatch({ type: 'SET_PLATO', payload: { plato_categoria: categoria } });
    dispatch({ type: 'SET_OPEN', payload: true });
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
      <Grid item xs={20} md={10} lg={4} sx={{ marginTop: 10 }}>
        <AppBar sx={{ bgcolor: 'white', p: 0.8 }}>
          <Box>
            <Button disableRipple onClick={() => navigate('/')} sx={{ marginLeft: 120, bgcolor: 'white', fontFamily: 'Times New Roman, sans serif', color: '#2d2d2d', transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#cccccc', }, }}>Menú Principal</Button>
          </Box>
        </AppBar>

        <Button disableRipple sx={buttonStylesNow}>Crear Plato </Button>
        <Button disableRipple sx={buttonStyles} onClick={() => navigate('/edit')} >Editar Plato</Button>
        <Button disableRipple sx={buttonStyles} onClick={() => navigate('/delete')} >Eliminar Plato</Button>
        <Card variant='outlined' sx={{ p: 4, backgroundColor: '#ffffff', border: 2, borderColor: '#cccccc' }}>
          <Typography variant='h5' gutterBottom align='center' sx={{ color: '#232520', fontWeight: 450, fontFamily: 'Times New Roman, sans serif' }}>Crear Plato</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              fullWidth
              variant='outlined'
              label='Nombre'
              name="plato_nombre"
              value={plato.plato_nombre}
              onChange={handleChange}
              margin='normal'
              error={!!nombreError}
              helperText={nombreError}
            />
            <TextField
              inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
              fullWidth
              variant='outlined'
              label='Precio'
              name='plato_precio'
              value={plato.plato_precio}
              onChange={handleChange}
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
              label='Descripción'
              name='plato_descripcion'
              value={plato.plato_descripcion}
              onChange={handleChange}
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
              onChange={handleChange}
              margin='normal'
            />

            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              sx={{ width: '100%', maxWidth: 320, bgcolor: '#f3f3f3', borderRadius: 3, marginBottom: 1, marginTop: 1 }}
            >
              <ListItem onClick={handleClick}>
                <ListItemText disableTypography primary={<Typography sx={{ fontSize: 17, color: '#808080', fontFamily: 'Times New Roman, sans serif' }} >Categoría</Typography>} />
                {open ? <ListItemIcon> &#9654; </ListItemIcon> : <ListItemIcon> &#9660; </ListItemIcon>}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {categorias.map((categoria) => (
                  <ListItem onClick={() => handleCategoriaLista(categoria)} key={categoria}>
                    <ListItemButton>
                      <ListItemText secondary={<Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 15 }}>{categoria}</Typography>} />
                      {selectedCategoria === categoria && <ListItemIcon>✔</ListItemIcon>}
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            </List>

            <Typography variant='body1' gutterBottom align='left' sx={{ color: '#68706a', fontFamily: 'Times New Roman, sans serif' }}>¿Está disponible?</Typography>
            <Typography variant='body1' gutterBottom align='right' sx={{ color: '#68706a', fontFamily: 'Times New Roman, sans serif' }}>
              <Checkbox
                checked={plato.plato_disponibilidad}
                onChange={handleChangeDisponibilidad}
                sx={{ color: '#cccccc', '&.Mui-checked': { color: '#b2b2b2' } }}
              />
              Sí
            </Typography>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              disabled={!plato.plato_nombre || !plato.plato_descripcion || !plato.plato_precio || loading || !!precioError || !plato.plato_imagen}
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
