// import React, { Suspense, lazy } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import {CookiesProvider} from 'react-cookie'
import CreateGroup from './components/CreateGroup'
import { AuthProvider } from './contexts/AuthContext'

// const Home = lazy(()=>import('./components/Home'))
// const Login = lazy(()=>import('./components/Login'))

function App() {
  return (
    <>
    <CookiesProvider>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/create-group' element={<CreateGroup/>}/>
        </Routes>
      </AuthProvider>
      </CookiesProvider>
      </>
  )
}

export default App
