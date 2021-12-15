import axios from "axios";

//criar aqui todas as entradas pro back 
const api = axios.create({
    baseURL: process.env.REACT_APP_TALK2GO_API_URI,
});

const setHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}`}});

export const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha});

    return response.data;
};

export const register = async (nome, cpf, email, senha) => {
    const response = await api.post('/auth/register', { nome, cpf, email, senha});

    return response.data;
};

export const getClientes = async (buscaCliente, token) => {
    const response = await api.get(`/clientes?apelido=${buscaCliente}`, setHeaders(token));

    return response.data;
};

export const getOneUsuario = async (usuarioId, token) => {
    const response = await api.get(`/usuarios/${usuarioId}`,setHeaders(token));

    return response.data;
};