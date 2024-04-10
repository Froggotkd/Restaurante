import React, {  useState} from 'react';
import {Box, AppBar, Grid, Typography, Card, TextField, Button, CircularProgress } from '@mui/material';
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


export default function PlatoDelete() {
  const [platoNombre, setPlatoNombre] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeNombre = e => {
    const value = e.target.value; 
    setPlatoNombre(value);
    if (value) {
      setNombreError('');
    } else {
      setNombreError('Ingrese el nombre del plato.');
    }
  };
  
  const [platos, setPlatos] = useState([]);

  const loadPlatos = async () => {
    const response = await fetch('http://localhost:4000/platos');
    const data = await response.json();
    setPlatos(data);
  };

  const handleSubmit = async (platoNombre) => {
    console.log(platoNombre);
    try {
        
      const res = await fetch("http://localhost:4000/delete/" + platoNombre, {
        method: "DELETE",
      });

      if(res.status === 404){
        alert('Plato ingresado no existe!!!')
        navigate('/create');
      }

      if (!res.ok) {
        throw new Error('Error al eliminar el plato');
      }
  
      setLoading(false); 
      navigate('/');
    } catch (error) {
      console.error(error);
      setLoading(false); 
    }
  };
  
  
  

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
        <Button disableRipple sx={buttonStyles} onClick={() => navigate('/create')}>Crear Plato</Button>
        <Button disableRipple sx={buttonStyles} onClick={() => navigate('/edit')} >Editar Plato</Button>
        <Button disableRipple sx={buttonStylesNow}>Eliminar Plato</Button>
        <Card variant='outlined' sx={{
          p: 4,
          backgroundColor: '#ffffff',
          border: 2,
          borderColor: '#cccccc'
        }}>
          <Typography variant='h5' gutterBottom align='center' sx={{
            color: '#232520', fontWeight: 450, fontFamily: 'Times New Roman, sans serif',
          }}>
            Eliminar Plato
          </Typography>
         
            <TextField
             inputProps={{style:{fontFamily:'Times New Roman, sans serif'}}}
             InputLabelProps={{style:{fontFamily:'Times New Roman, sans serif'}}}
              fullWidth
              variant='outlined'
              label='Nombre del Plato'
              value={platoNombre}
              onChange={handleChangeNombre}
              margin='normal'
              error={!!nombreError}
              helperText={nombreError}
            />
            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={!platoNombre}
              sx={buttonStyles}
              disableRipple='true'
              onClick={() => handleSubmit(platoNombre)}
            >
              {loading ? <CircularProgress size={24} color='inherit' /> : 'Eliminar'}
            </Button>
          
        </Card>
      </Grid>
    </Grid>
  );
}
