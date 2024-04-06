import React, { useEffect, useState} from 'react';
import { Grid, Typography, Card, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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


export default function PlatoDelete() {
  const [platoNombre, setPlatoNombre] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeNombre = e => {
    const value = e.target.value.trim(); // Trim whitespace
    setPlatoNombre(value);
    if (value) {
      setNombreError('');
    } else {
      setNombreError('Ingrese el nombre del plato.');
    }
  };
  
  const handleSubmit = async (platoNombre) => {
    console.log(platoNombre)
      await fetch("http://localhost:4000/delete/" + platoNombre, {
        method: "DELETE",
      });

      navigate('/');
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
            color: '#232520',
          }}>
            Eliminar Plato
          </Typography>
         
            <TextField
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
              onClick={() => handleSubmit(platoNombre)}
            >
              {loading ? <CircularProgress size={24} color='inherit' /> : 'Eliminar'}
            </Button>
          
        </Card>
      </Grid>
    </Grid>
  );
}
