import React, { useEffect, useState, useRef } from 'react';
import { AppBar,Toolbar,Button, IconButton, Drawer,Typography,Grid,Container,Card,CardContent,Avatar,Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../img/logo.png';
import CardCover from '@mui/joy/CardCover';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

export default function PlatoList() {
  const [platos, setPlatos] = useState([]); //Array de objetos platos
  const [carrito, setCarrito] = useState([]); //Array con el carrito que se muestra en el drawer
  //Referencias para los botones en Descubre nuestro menú
  const Platos = useRef(null);
  const Bebidas = useRef(null);
  const Postres = useRef(null);
  const Cafeteria = useRef(null);
  //Para navegar entre páginas
  const navigate = useNavigate();
  //Abrir o cerrar el drawer
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => { //Para abrir o cerrar el drawer
    setOpen(newOpen);
  };

  const loadPlatos = async () => { //Cargar los platos y guardarlos en el array
    const response = await fetch('http://192.168.100.24:4000/platos');
    const data = await response.json();
    setPlatos(data);
  };

  useEffect(() => {//Para que se cargen los platos
    loadPlatos();
  }, []);



  const buttonStyles = { //Estilo de los botones
    borderRadius: '0px',
    padding: '5px 12px',
    backgroundColor: '#f0f0f0',
    color: '#2d2d2d',
    margin: '0 50px',
    fontFamily: 'Times New Roman, sans serif',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#b2b2b2',
    },
  };

  const scrollToSection = (elementRef) => {
    window.scrollTo({ //Ir a algún lugar especifico de la pag
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const handleCompra = (plato) => {
    if(carrito.includes(plato)){ //Ejecutada cuando el user aplasta el botón de comprar, veifica que no esté ya en el carrito, si sí aumenta la cantidad por 1
      handleIncrement(plato.plato_id)
    }else{
      console.log('No repetio')
      setCarrito([...carrito, plato]);
    }
  };

  const renderMenuSection = (ref, category) => (
    //Para mostrar los platos en cards, los argumentos son la parte en donde está y la categoria
    <div ref={ref}>
      <Grid
        container
        alignContent='right'
        justifyContent='right'
        sx={{ bgcolor: 'transparent', p: 3 }}
        style={{ background: 'linear-gradient(to bottom, #ffffff, #e7e7e7' }}
      >
        <img src={logo} style={{ width: '200px', marginRight: 650 }} alt='Logo' />
        <Typography
          sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 25, marginRight: 10, fontWeight: 600, p: 1 }}
        >
          {category}
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent='center'
        style={{
          padding: '20px',
          backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.4)), url(${require('../img/bg1-list.png')})`,
          backgroundSize: 'cover',
        }}
      >
        {platos
          .filter((plato) => plato.plato_id !== 1 && plato.plato_categoria === category)
          .map((plato, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4} style={{ marginBottom: '10px' }}>
              <Card sx={{ borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '95%', position: 'relative' }}>
                <img
                  src={plato.plato_imagen}
                  alt={plato.plato_nombre}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    opacity: plato.plato_disponibilidad ? 1 : 0.4,
                  }}
                />
                <CardContent>
                  <Typography sx={{ fontFamily: 'Times New Roman, sans serif' }} variant='h6'>
                    {plato.plato_nombre}
                  </Typography>
                  <Typography sx={{ fontFamily: 'Times New Roman, sans serif', marginLeft: 30 }} variant='body1' color='textSecondary'>
                    {plato.plato_precio}
                  </Typography>
                  <Typography sx={{ fontFamily: 'Times New Roman, sans serif', marginTop: 1, marginBottom: 2 }} variant='body1' color='textSecondary'>
                    {plato.plato_descripcion}
                  </Typography>
                  <Button
                    onClick={() => handleCompra(plato)}
                    disabled={!plato.plato_disponibilidad}
                    disableRipple
                    sx={{
                      fontFamily: 'Times New Roman, sans serif',
                      bgcolor: '#5c73ff',
                      color: 'white',
                      p: 0.5,
                      marginLeft: 25,
                      '&:hover': {
                        backgroundColor: '#2540e4',
                      },
                    }}
                  >
                    {plato.plato_disponibilidad ? 'Comprar' : 'Agotado'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );

  const[orden, setOrden] = useState({ //Obj en donde comienza la orden
    orden_precio:'', 
    orden_preciofinal: '',
    orden_cliente: 1,
    orden_fecha:'',
    orden_iva:''
  })

const handleFinalizarCompra = async () => {

    try {
      const res = await fetch("http://192.168.100.24:4000/platos/orden", {
        method: 'POST',
        body: JSON.stringify(orden),
        headers: { "Content-Type": "application/json" }
      });
  
      if (!res.ok) {
        throw new Error('Error al iniciar la orden');
      }
      navigate('/create')
    } catch (error) {
      console.error(error);
    }
  };

  const [cantidades, setCantidades] = useState({}); //Para ver la cantidad de cada plato en el array del drawer
  const handleIncrement = (platoId) => { //Aumenta la cantidad del plato
    setCantidades(prevState => ({
      ...prevState,
      [platoId]: (prevState[platoId] || 0) + 1
    }));
  };

  const handleDecrement = (platoId) => {//Disminuye la cant del plato
    if (cantidades[platoId] > 0) {
      setCantidades(prevState => ({
        ...prevState,
        [platoId]: prevState[platoId] - 1
      }));
    }
  };

  const calcularPrecioTotal = () => { //Calcula el valor mostrado al final del drawer usando el precio * las cantidades y sumando
    let total = 0;
    carrito.forEach((plato) => {
      total += cantidades[plato.plato_id] * plato.plato_precio;
    });
    return total;
  };


  return (
    <Grid container justifyContent='center' alignItems='center' style={{ backgroundColor: '#f0f0f0' }}>
      {/*Código de la AppBar */}
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
                <Button disableRipple={true} color='inherit' sx={{ fontFamily: 'Times New Roman, sans serif', color: '#000000' }} onClick={() => navigate('/create')}>
                  Editar Menú
                </Button>
              </Grid>
              <IconButton onClick={toggleDrawer(true)}>
                <ShoppingCartIcon size='large' />
              </IconButton>

              <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, height: '100%', bgcolor: '#eaeaea' }} role='presentation' onClick={toggleDrawer(false)}>
                  <Typography sx={{ fontFamily: 'Times New Roman, sans serif', p: 1, fontSize: 30, bgcolor: '#cccccc', fontStyle:'italic' }}>Tus Platos</Typography>
                  {carrito.map((plato, index) => (
                    <Grid container spacing={2} alignItems="center" sx={{ marginTop: 0.5, marginBottom: 0.5, bgcolor: '#f1f1f1' }} key={index}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={8}>
                          <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 18, marginLeft: 2 }}>
                            {plato.plato_nombre}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 15, marginBottom: 2, marginLeft: 2.5 }}>
                            {plato.plato_precio}
                          </Typography>
                          <Grid item xs={0} container justifyContent="left" alignItems="center">
                            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 15, marginLeft: 3 }}>Cantidad:</Typography>
                            <IconButton onClick={(event) => { event.stopPropagation(); handleDecrement(plato.plato_id); }}>
                              <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 15 }}>{cantidades[plato.plato_id]}</Typography>
                            <IconButton onClick={(event) => { event.stopPropagation(); handleIncrement(plato.plato_id); }}>
                              <AddIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <Grid item xs={3.4} textAlign="left">
                          <Card sx={{ width: 'auto', height: '70px', marginBottom: 0 }}>
                            <img
                              src={plato.plato_imagen}
                              alt={plato.plato_nombre}
                              style={{
                                width: '70px',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 1,
                              }}
                            />
                          </Card>
                          <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 15, fontWeight: 600, marginLeft: 3.5 }}>{cantidades[plato.plato_id] * plato.plato_precio} $</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 5 }}>
                    <Card sx={{ width: '100%', bgcolor: '#f1f1f1', p: 1 }}>
                      <Typography  sx={{fontSize:19, fontFamily: 'Times New Roman, sans serif', fontWeight: 500, marginLeft:6, fontStyle:'italic' }}>Total a pagar: {calcularPrecioTotal()} $</Typography>
                      <Button disableRipple onClick={handleFinalizarCompra}  sx={{ width:'100%', marginTop: 2, bgcolor:'#5c73ff', fontFamily:'Times New Roman, sans serif', color:'white' , '&:hover': {
                        backgroundColor: '#2540e4',
                      }}}>
                        
                        Finalizar Compra</Button>
                    </Card>
                  </Grid>
                </Box>
              </Drawer>

            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />


      {/*Grid con el video de portada */}
      <Grid item xs={12} style={{ position: 'relative' }}>
        <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0)', position: 'relative' }}>
          <CardContent>
            <CardCover style={{ position: 'relative', height: '80vh' }}>
              <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
                <source src={require('../img/stock_cooking.mp4')} type='video/mp4' />
              </video>
            </CardCover>
            <Typography
              variant='h4'
              align='center'
              gutterBottom
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'Times New Roman, sans-serif',
              }}
              sx={{
                fontStyle: 'italic',
                fontWeight: 800,
                fontSize: 50,
              }}
            >
              RESTAURANT PATITO
            </Typography>
            <Typography align='center' gutterBottom style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <img src='https://static.vecteezy.com/system/resources/thumbnails/019/859/726/small_2x/yellow-five-stars-quality-rating-icons-5-stars-icon-five-star-sign-rating-symbol-transparent-background-illustration-png.png' height='65' alt='Rating' />
            </Typography>
            <Typography
              variant='h5'
              align='center'
              gutterBottom
              style={{
                position: 'absolute',
                top: '65%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '5px',
                fontFamily: 'Times New Roman, sans-serif',
              }}
              sx={{
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 30,
              }}
            >
              restaurante - cafetería
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/*DESCUBRE NUESTRO MENU */}
      <Grid container justifyContent='center' style={{ background: 'linear-gradient(to bottom, #ffffff, #e7e7e7)' }}>
        <Grid item xs={12} textAlign='center' marginBottom={2}>
          <Typography variant='h4' sx={{ fontSize: 30, marginTop: 4, fontFamily: 'Times New Roman, sans serif' }}>
            DESCUBRE NUESTRO MENÚ
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Toolbar disableGutters sx={{ bgcolor: 'transparent', width: 'auto' }}>
            <Button disableRipple sx={buttonStyles} onClick={() => scrollToSection(Bebidas)}>
              Bebidas
            </Button>
            <Button disableRipple sx={buttonStyles} onClick={() => scrollToSection(Cafeteria)}>
              Cafetería
            </Button>
            <Button disableRipple sx={buttonStyles} onClick={() => scrollToSection(Platos)}>
              Platos
            </Button>
            <Button disableRipple sx={buttonStyles} onClick={() => scrollToSection(Postres)}>
              Postres
            </Button>
          </Toolbar>
        </Grid>
      </Grid>

      {/*OPINIONES */}
      <Grid container justifyContent='center' style={{ padding: '20px', backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.4)), url(${require('../img/bg_rating.jpg')})`, backgroundSize: 'cover' }}>
        <Card sx={{ p: 1, marginBottom: 5 }}>
          <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 25, fontWeight: 450, padding: '5px 20px' }}>
            ¿QUÉ DICEN DE NOSOTROS?
          </Typography>
        </Card>

        <Card sx={{ p: 1, bgcolor: 'ffffff', opacity: 0.9, marginBottom: 5, marginLeft: 20, marginRight: 20 }}>
          <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 20 }}>
            Restaurant Patito combina la elegancia con la buena sazón, con una amplia variedad en su menú, colaboradores amables, excelente servicio y aún mejor comida, Restaurant Patito es una experiencia infaltable en Quito.
          </Typography>
          <Grid container alignItems='center' sx={{ marginTop: 1 }}>
            <Typography sx={{ marginLeft: 54, fontFamily: 'Times New Roman, sans serif', fontSize: 15 }}> - Juan Pérez, Revista Gotitas del Sabor</Typography>
            <Avatar alt='Reviewer 1' src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' sx={{ width: 50, height: 50, marginLeft: 1 }} />
          </Grid>
        </Card>

        <Card sx={{ p: 1, bgcolor: 'ffffff', opacity: 0.9, marginBottom: 5, marginLeft: 20, marginRight: 20 }}>
          <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 20 }}>
            El restaurante Patito en Quito ofrece una experiencia culinaria elegante y sofisticada. Con una decoración encantadora y una cocina excepcional que resalta los sabores locales, cada visita es una delicia para los sentidos. El servicio atento y profesional completa una experiencia gastronómica memorable
          </Typography>
          <Grid container alignItems='center' sx={{ marginTop: 1 }}>
            <Typography sx={{ marginLeft: 61, fontFamily: 'Times New Roman, sans serif', fontSize: 15 }}> - María Gonzalez, MasterChef</Typography>
            <Avatar alt='Reviewer 1' src='https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' sx={{ width: 50, height: 50, marginLeft: 1 }} />
          </Grid>
        </Card>

        <Card sx={{ p: 1, bgcolor: 'ffffff', opacity: 0.9, marginBottom: 5, marginLeft: 20, marginRight: 20 }}>
          <Typography sx={{ fontFamily: 'Times New Roman, sans serif', fontSize: 20 }}>
            Patito en Quito es un festín para los amantes de la buena comida. Su variado menú ofrece una deliciosa gama de platos que destacan los sabores locales e internacionales. Cada bocado es una experiencia culinaria memorable que invita a volver una y otra vez.
          </Typography>
          <Grid container alignItems='center' sx={{ marginTop: 1 }}>
            <Typography sx={{ marginLeft: 54, fontFamily: 'Times New Roman, sans serif', fontSize: 15 }}> - La Roca, en Rapidos y Furiosos 500</Typography>
            <Avatar alt='Reviewer 1' src='https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg' sx={{ width: 50, height: 50, marginLeft: 1 }} />
          </Grid>
        </Card>
      </Grid>

      {/*Donde se muestran los platos dependiendo de su categoria*/}
      {renderMenuSection(Platos, 'Platos')}
      {renderMenuSection(Cafeteria, 'Cafetería')}
      {renderMenuSection(Bebidas, 'Bebidas')}
      {renderMenuSection(Postres, 'Postres')}
    </Grid>
  );
}

