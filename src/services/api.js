import axios from "axios";

//criar aqui todas as entradas pro back 
const api = axios.create({
    baseURL: process.env.REACT_APP_TALK2GO_API_URI,
});

api.interceptors.response.use(
    (response) => {
        // console.log('response normal', response);
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href='/';
        }
        // console.log(error.response)
        return Promisse.reject(error);
    },
);

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

export const getOneCliente = async (clienteId, token) => {
    const response = await api.get(`/clientes/${clienteId}`, setHeaders(token));

    return response.data;
};

//aqui é body ou apelido? 
export const createOneCliente = async (apelido, token) => {
    const response = await api.post('/clientes', {apelido}, setHeaders(token));

    return response.data;
};

//criar isso no back pra pegar o nome no front
export const getOneUsuario = async (usuarioId, token) => {
    const response = await api.get(`/usuarios/${usuarioId}`,setHeaders(token));

    return response.data;
      
};

//nao to segura disso estar certo
export const getAtendimentos = async (clienteId, token) => {
    const response = await api.get(`/atendimentos/${clienteId}`, setHeaders(token));

    return response.data;
};

//nao to segura disso estar certo
export const createAtendimentoTipoFisico = async (clienteId, tipo, tipoFisico, pedido, token) => {
    const response = await api.post(`/atendimentos`,{clienteId, tipo, tipoFisico, pedido}, setHeaders(token));

    return response.data;
};

export const editOneCliente = async (clienteId, body, token) => {
    const response = await api.put( `/clientes/${clienteId}`,body, setHeaders(token));

    return response.data;
};

export const deleteOneClienteById = async (clienteId, token) => {
    const response = await api.delete( `/clientes/${clienteId}`, setHeaders(token));

    return response.data;
};