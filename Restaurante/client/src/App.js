import {BrowserRouter, Routes, Route} from  'react-router-dom'
import  PlatoList from './components/PlatoList.js'
import PlatoForms from './components/PlatoForms'
import {Container} from '@mui/material'
import PlatoUpdate from './components/PlatoUpdate.js'
import PlatosDelete from './components/PlatoDelete.js'
import Cliente from './components/Cliente.js'
import Factura from './components/Factura.js'
import Contacto from './components/Contacto.js'

export default function App() {
  return (
    <BrowserRouter>

      <Container>
      <Routes>
      <Route path ='/' element={<PlatoList/>} />
      <Route path ='/create' element={<PlatoForms/>} />
      <Route path ='/edit' element={<PlatoUpdate/>} />
      <Route path ='/delete' element={<PlatosDelete/>} />
      <Route path ='/ticket' element={<Factura/>} />
      <Route path ='/client' element={<Cliente/>} />
      <Route path ='/contactus' element={<Contacto />}/> 
    </Routes>
      </Container>
    </BrowserRouter>
  )
}
