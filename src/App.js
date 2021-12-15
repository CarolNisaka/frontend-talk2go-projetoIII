import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Home from './components/pages/Home/Home';
import Loja from './components/pages/Loja/Loja';
import Clientes from './components/pages/Clientes/Clientes';


function App () {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path = "/atendimentoloja" element={<Loja />} />
    </Routes>
  );
}



export default App;
