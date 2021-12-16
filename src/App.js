import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Home from './components/pages/Home/Home';
import Loja from './components/pages/Loja/Loja';
import Clientes from './components/pages/Clientes/Clientes';
import ClienteDetails from './components/pages/ClienteDetails/ClienteDetails';


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

      <Route path="/clientes" element={<ProtectedRoute isUserLogged={isUserLogged} Page={Clientes}/>} />
      <Route path="/clientes/:clienteId" element={<ProtectedRoute isUserLogged={isUserLogged} Page={ClienteDetails}/>} />
      
      <Route path = "/atendimentoloja" element={<ProtectedRoute isUserLogged={isUserLogged} Page={Loja}/>} />
    </Routes>
  );
}



export default App;
