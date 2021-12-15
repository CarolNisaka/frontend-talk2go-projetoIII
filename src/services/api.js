import axios from "axios";

//criar aqui todas as entradas pro back 
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha});

    return response.data;
};

export const register = async (nome, cpf, email, senha) => {
    const response = await api.post('/auth/register', { nome, cpf, email, senha});

    return response.data;
};

export const getClientes = async (token) => {
    const response = await api.get('/clientes', { headers: { Authorization: `Bearer ${token}`}});

    return response.data;
};