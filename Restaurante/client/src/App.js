import {BrowserRouter, Routes, Route} from  'react-router-dom'
import  PlatoList from './components/PlatoList.js'
import PlatoForms from './components/PlatoForms'
import {Container} from '@mui/material'
import Navbar from './components/Navbar.js'
import PlatoUpdate from './components/PlatoUpdate.js'
import PlatosDelete from './components/PlatoDelete.js'

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Container>
      <Routes>
      <Route path ='/' element={<PlatoList/>} />
      <Route path ='/create' element={<PlatoForms/>} />
      <Route path ='/edit' element={<PlatoUpdate/>} />
      <Route path ='/delete' element={<PlatosDelete/>} />
    </Routes>
      </Container>
    </BrowserRouter>
  )
}
