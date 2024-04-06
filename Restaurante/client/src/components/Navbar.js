import { Button, Box, AppBar, Toolbar, Grid, Container } from '@mui/material'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../img/logo.png'

export default function Navbar() {

    const navigate = useNavigate()
    return (
        <Box>
          <AppBar position='static' color='transparent' elevation='0'>
            <Container>
              <Toolbar>
                <Grid container alignItems="center">
                  <Grid item>
                    <Link to='/'>
                      <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                    </Link>
                  </Grid>
                  <Grid item xs />
                  <Grid item>
                    <Button disableRipple={true} color='inherit' onClick={() => navigate('/create')}>
                      Editar Menú
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      );
}
