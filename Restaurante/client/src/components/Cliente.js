import React, { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Grid, Container, Card, Radio, RadioGroup, FormControlLabel, Fade, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import bg from '../img/bg_client.jpg';


export default function Cliente() {

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

   


    const [cliente, setCliente] = useState({
        cliente_nombre: '',
        cliente_cedula: 0,
        cliente_correo: '',
        cliente_direccion: '',
        cliente_telefono: ''
    })
    const navigate = useNavigate();

    const handleChange = e => {
        const value = e.target.value;
        setCliente({ ...cliente, [e.target.name]: value });
    };


    const [selectedOption, setSelectedOption] = useState('');
    const [mostrarFormulario, setFormulario] = useState(false);
    const [consFinal, setConsFinal] = useState(false)

    const handleOptionChange = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
        if (event.target.value === "datos") {
            setFormulario(true);
            setConsFinal(false);
        } else if (event.target.value === "consumidorFinal") {
            setFormulario(false);
            setConsFinal(true);
        } else {
            setFormulario(false);
            setConsFinal(false);

        }
    };


    const handleConsFinal = (e) => {
        cliente.cliente_cedula = 9999999999;
        cliente.cliente_nombre = 'invalid'
        cliente.cliente_correo = 'correo@correo'
        cliente.cliente_direccion = 'invalid'
        cliente.cliente_telefono = '99999999'

        handleSubmit(e);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:4000/client", {
                method: 'POST',
                body: JSON.stringify(cliente),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error('Error al guardar el cliente');
            }

            navigate('/ticket');
        } catch (error) {
            console.error(error);
        }
    };

    const [nombreError, setNombreError] = useState('');
    const handleChangeNombre = e => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value) || value === '') {
            setCliente({ ...cliente, cliente_nombre: value });
            setNombreError('');
        } else {
            setNombreError('Ingrese solo letras o espacios.');
        }
    };


    const [cedulaError, setCedulaError] = useState('');
    const handleChangeCedula = e => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value) || value === '') {
            setCliente({ ...cliente, cliente_cedula: value });
            setCedulaError('');
        } else {
            setCedulaError('Ingrese 10 números');
        }
    };

    const [emailError, setEmailError] = useState('');
    const validarCorreo = (email) => {
        const reg = /^\S+@\S+\.\S+$/;
        return reg.test(email);
    };

    const handleChangeCorreo = e => {
        const value = e.target.value;
        setCliente({ ...cliente, cliente_correo: value });
    };

    const handleBlurCorreo = () => {
        const isValid = validarCorreo(cliente.cliente_correo);
        if (!isValid) {
            setEmailError('Ingrese una dirección de correo válida');
        } else {
            setEmailError('');
        }
    };

    const [tlfError, setTlfError] = useState('');
    const handleChangeTlf = e => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value) || value === '') {
            setCliente({ ...cliente, cliente_telefono: value });
            setTlfError('');
        } else {
            setTlfError('Ingrese 10 números');
        }
    };


    return (
        <Grid container style={{
            minHeight: '100vh',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            {/* AppBar */}
            <AppBar position='fixed' sx={{ bgcolor: '#eaeaea' }} elevation={1}>
                <Container>
                    <Toolbar>
                        <Grid container alignItems='center'>
                            <Grid item>
                                <Link to='/'>
                                    <img src={logo} alt='Logo' style={{ width: '200px', height: 'auto' }} />
                                </Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />

            {/* Contenido principal */}
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Card sx={{ bgcolor: '#f0f0f0', width: '98%', p: 1 }} >
                        <Typography variant="h4" sx={{ fontFamily: 'Times New Roman, sans serif', fontStyle: 'italic', marginLeft: 5 }}>
                            Ya casi terminas...
                        </Typography>
                    </Card>
                    <Card sx={{ bgcolor: '#f0f0f0', width: '100vh', marginLeft: 27, marginTop: 2, p: 0.5, marginBottom: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Times New Roman, sans serif', fontStyle: 'italic', marginLeft: 12 }}>
                            ¿Qué opción deseas? Tu factura con...
                        </Typography>
                    </Card>

                    <Grid container justifyContent='center' rowSpacing={1} columnSpacing={{ xs: 3, sm: 5, md: 4 }}>
                        <Grid item xs={4}>
                            <Card sx={{ bgcolor: '#f0f0f0', width: '50vh%', p: 1 }}>
                                <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                                    <FormControlLabel
                                        value="datos"
                                        control={<Radio sx={{ color: '#cccccc', '&.Mui-checked': { color: 'black' } }} />}
                                        label={<Typography sx={{ fontFamily: 'Times New Roman, sans-serif', fontSize: 19 }}>Datos</Typography>}
                                    />
                                </RadioGroup>
                            </Card>
                            <Fade in={mostrarFormulario}>

                                <Card variant='outlined' sx={{
                                    p: 4,
                                    backgroundColor: '#ffffff',
                                    border: 2,
                                    borderColor: '#cccccc', marginTop: 1, width: '112vh'
                                }}>

                                    <Typography gutterBottom align='center' sx={{
                                        color: '#232520', fontWeight: 450, fontFamily: 'Times New Roman, sans serif', fontSize: 20
                                    }}>
                                        Ingresa tus datos para la factura
                                    </Typography>
                                    <form onSubmit={handleSubmit}>

                                        <TextField
                                            inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            fullWidth
                                            variant='outlined'
                                            label='Nombre'
                                            name="cliente_nombre"
                                            value={cliente.cliente_nombre}
                                            onChange={handleChangeNombre}
                                            margin='normal'
                                            error={!!nombreError}
                                            helperText={nombreError}
                                        />

                                        <TextField
                                            inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            fullWidth
                                            variant='outlined'
                                            label='Cédula'
                                            name="cliente_cedula"
                                            value={cliente.cliente_cedula}
                                            onChange={handleChangeCedula}
                                            margin='normal'
                                            error={!!cedulaError}
                                            helperText={cedulaError}
                                        />
                                        <TextField
                                            inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            fullWidth
                                            variant='outlined'
                                            label='Correo Electrónico'
                                            name="cliente_correo"
                                            value={cliente.cliente_correo}
                                            onChange={handleChangeCorreo}
                                            onBlur={handleBlurCorreo}
                                            margin='normal'
                                            error={!!emailError}
                                            helperText={emailError}
                                        />
                                        <TextField
                                            inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            fullWidth
                                            variant='outlined'
                                            label='Dirección'
                                            name="cliente_direccion"
                                            value={cliente.cliente_direccion}
                                            onChange={handleChange}
                                            margin='normal'

                                        />
                                        <TextField
                                            inputProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            InputLabelProps={{ style: { fontFamily: 'Times New Roman, sans serif' } }}
                                            fullWidth
                                            variant='outlined'
                                            label='Teléfono'
                                            name="cliente_telefono"
                                            value={cliente.cliente_telefono}
                                            onChange={handleChangeTlf}
                                            margin='normal'
                                            error={!!tlfError}
                                            helperText={tlfError}
                                        />
                                        <Button sx={buttonStyles} type='submit'>Obten tu ticket</Button>

                                    </form>
                                </Card>
                            </Fade>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ bgcolor: '#f0f0f0', width: '50vh', marginBottom: 40, p: 1 }}>
                                <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                                    <FormControlLabel value="consumidorFinal" control={<Radio sx={{ color: '#cccccc', '&.Mui-checked': { color: 'black' } }} />} label={<Typography sx={{ fontFamily: 'Times New Roman, sans-serif', fontSize: 19 }}>Consumidor Final</Typography>} />

                                </RadioGroup>
                                <Button sx={buttonStyles} style={{ display: !consFinal ? "none" : "block", marginTop: 50 }} onClick={handleConsFinal} >Obten tu ticket</Button>
                            </Card>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}