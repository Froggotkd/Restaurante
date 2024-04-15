import React from 'react'
import { Card, Grid, Container, AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material'
import logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../img/bg_contactus.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';



export default function Contacto() {

  const navigate = useNavigate()


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
        borderTop: '10px',
      }}
    >
      <AppBar position='fixed' sx={{ bgcolor: '#eaeaea' }} elevation={1}>
        <Container>
          <Toolbar>
            <Grid container alignItems='center'>
              <Grid item>
                <Link to='/'>
                  <img src={logo} alt='Logo' style={{ width: '200px', height: 'auto' }} />
                </Link>
              </Grid>
              <Grid item xs />

              <Grid item>
                <Button disableRipple={true} color='inherit' sx={{ fontFamily: 'Times New Roman, sans serif', color: '#000000' }} onClick={() => navigate('/')}>Descubre nuestro menú</Button>
                <Button disableRipple={true} color='inherit' sx={{ fontFamily: 'Times New Roman, sans serif', color: '#000000', p: '6px 18px' }} onClick={() => navigate('/contactus')}>contáctanos</Button>
                <Button disableRipple={true} color='inherit' sx={{ fontFamily: 'Times New Roman, sans serif', color: '#000000' }} onClick={() => navigate('/create')}>
                  Editar Menú
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />


      <Grid container direction='row' textAlign='center'>
        <Grid item>
          <Card sx={{ height: '80vh', width: '80vh', margin: '20px', opacity: 0.92 }}>
            <Typography sx={{ marginTop: 3, fontFamily: 'Times New Roman, sans serif', marginBottom: '10px', fontSize: 28, fontWeight: 800, fontStyle: 'italic' }}>
              Nos encontramos en Quito, Ecuador
            </Typography>

            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 18, display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <LocationOnIcon sx={{ color: '#da0000', marginRight: 2, marginLeft: 15, height: '60px' }} />
              Av. 10 de Agosto y Patria
            </Typography>
            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 18, display: 'flex', alignItems: 'center', marginLeft: 20, marginTop: '-15px' }}>
              Tlf: (02) - 2516379
            </Typography>

            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 18, display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <LocationOnIcon sx={{ color: '#da0000', marginRight: 2, marginLeft: 15, height: '60px' }} />
              Av. 10 de Agosto y Patria
            </Typography>
            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 18, display: 'flex', alignItems: 'center', marginLeft: 20, marginTop: '-15px' }}>
              Tlf: (02) - 2516379
            </Typography>

            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 18, display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <LocationOnIcon sx={{ color: '#da0000', marginRight: 2, marginLeft: 15, height: '60px' }} />
              Av. 10 de Agosto y Patria
            </Typography>
            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 18, display: 'flex', alignItems: 'center', marginLeft: 20, marginTop: '-15px' }}>
              Tlf: (02) - 2516379
            </Typography>


            <Card sx={{marginTop:10 , bgcolor:'#ffe26c', p:3}}>
              <IconButton href='https://www.instagram.com/explore/tags/ducks/?hl=es'>
              <InstagramIcon sx={{fontSize:40, color:'#5a5a5a', marginRight:7}} />
              </IconButton>

              <IconButton href='https://es-la.facebook.com/TheIndependentOnline/videos/duck-duck-duck-dog/10156383590596636/'>
              <FacebookIcon sx={{fontSize:40, color:'#5a5a5a'}} />
              </IconButton>

              <IconButton href='https://www.youtube.com/watch?v=xfr64zoBTAQ'>
              <YouTubeIcon sx={{fontSize:40, color:'#5a5a5a', marginLeft:7}} />
              </IconButton>

            </Card>
            
          </Card>
        </Grid>
        <Grid item>
          <Card>
          <iframe src="https://www.google.com/maps/d/embed?mid=1nqaLQKmWZC2EqZ1bWTjoZdIZ1YN_rfI&ehbc=2E312F&noprof=1" width="500" height="480"></iframe>
          </Card>
        </Grid>
      </Grid>


    </Grid>
  )
}
