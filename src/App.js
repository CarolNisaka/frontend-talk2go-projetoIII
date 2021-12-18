import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Home from './components/pages/Home/Home';

import Clientes from './components/pages/Clientes/Clientes';
import CriarAtendimento from './components/pages/CriarAtendimento/CriarAtendimento';
import AtendimentoFisico from './components/pages/AtendimentoFisico/AtendimentoFisico';
import EditarCliente from './components/pages/Clientes/EditarCliente';

import ProtectedRoute from './components/miscelaneous/ProtectedRoute/ProtectedRoute';


function App () {
  const [isUserLogged, setIsUserLogged] = useState(!!localStorage.getItem('token'));

  const loginUser = () => {
    setIsUserLogged(true);
  };

  return (
    <Routes>
      <Route path="/" element={<Login loginUser={loginUser}/>} />
      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<ProtectedRoute isUserLogged={isUserLogged} Page={Home}/>} />

      <Route path="/clientes/listaclientes" element={<ProtectedRoute isUserLogged={isUserLogged} Page={Clientes}/>} />
      <Route path="/clientes/:clienteId" element={<ProtectedRoute isUserLogged={isUserLogged} Page={CriarAtendimento}/>} />
      <Route path="/clientes/:clienteId/editarcliente" element={<ProtectedRoute isUserLogged={isUserLogged} Page={EditarCliente}/>} />

      <Route path = "/atendimentofisico" element={<ProtectedRoute isUserLogged={isUserLogged} Page={AtendimentoFisico}/>} />
      
    </Routes>
  );
}



export default App;
