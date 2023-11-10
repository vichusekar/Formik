import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateUser from './components/CreateUser'
import Dashboard from './components/Dashboard'
import EditUser from './components/EditUser'
import Home from './components/Home'

function App() {
  return <>
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<CreateUser />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/edit/:id' element={<EditUser />} />
      <Route path='*' element={<Home /> } />
    </Routes>
   </BrowserRouter>
  </>
}

export default App
