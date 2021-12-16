import React, { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { Form, Col, Table, FormGroup} from 'react-bootstrap';
import './Clientes.css';

import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";

import { getClientes } from '../../../services/api';

function Clientes (props) {
    const [show, setShow] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [searchCliente, setSearchCliente] = useState('');
    
    const getClientePeloApelido = async () => {
        try {
            const token = localStorage.getItem('token');
            const foundCliente = await getClientes(searchCliente, token);

            setClientes(foundCliente);
        } catch (error) {
            setShow(true);
        }
    };

    const handleChange = async (e) => {
        setSearchCliente(e.target.value);
    };

    useEffect(() => {
        getClientePeloApelido();
    }, [searchCliente]);//se passar o array vazio o useEffect chama a callback somente quando o componente termina de montar. Passando no array, ele chama quando termina de montar e quando a seachcliente é atualizada

    //posso passar outros getCliente no UseEffect? to passando pra buscar pelo apelido mas queria buscar por nome, telefone ou cpf...o usuario escolhe por onde quer buscar
    return (
        <TemplatePrivate>
            <h1 className="title-cliente">Clientes</h1>
            <FormGroup as={Col} md='12' controlId="login-form">
                <Form.Control
                    type="text"
                    placeholder='Digite para procurar um cliente'
                    values={searchCliente}
                    onChange={handleChange}
                />
            </FormGroup>

            
            <div className="clientes-container">
                {clientes.map((cliente)=> (
                    <Link className="cliente-card" key={cliente._id} to={`/clientes/${cliente._id}`}>
                        <p>{cliente.apelido}</p>
                    </Link>
                ))}
            </div>
        </TemplatePrivate>
    )
};

export default Clientes;

//montar uma tabela decente para trazer os clientes
