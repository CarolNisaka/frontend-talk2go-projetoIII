import React, { useState, useEffect, Navigate} from "react";

import { Link } from "react-router-dom";
import { Form, Col, Table, FormGroup, Button, Modal} from 'react-bootstrap';
import './Clientes.css';

import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";

import { getClientes } from '../../../services/api';
import { deleteOneClienteById } from '../../../services/api';


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

    //MODAL DE DELETAR CLIENTE
    const [showModal, setShowModal] = useState(false);

    const [clienteClicado, setClienteClicado] = useState({});

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    
    

    const deleteClientebyId = async () => {
        try{
            const token = localStorage.getItem('token');
            await deleteOneClienteById(clienteClicado._id, token);
            await  getClientePeloApelido();
            handleClose();

        }catch (error) {
            
        }
    }
           
        
    console.log(clienteClicado);

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
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                   
                    
                    <th >Apelido</th>
                    <th >Nome</th>
                    <th >Telefone</th>
                    <th >E-mail</th>
                    <th >Ação</th>
                </tr>
            </thead>
                <tbody>
                    {clientes.map(cliente => (
                    <tr key={cliente._id} className="linha-cliente">
                        
                       
                            {/* <td>{clientes._id}</td> */}
                            
                            <td>{cliente.apelido}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.telefonePrincipal}</td>
                            <td>{cliente.email}</td>
                            
                            <td>

                            <Button className="acao-button" variant="warning"> 
                                 <Link to={`/clientes/${cliente._id}/editarcliente`}>Editar</Link>
                             </Button>
                             
                            
                            
                            <Button className="acao-button" variant="danger" onClick={()=> {
                                setClienteClicado(cliente)
                                handleShow()
                            }}> 
                                Deletar
                            </Button>
                        
                        
                           
                            </td>
                    </tr>
                    ))}   
                </tbody>
        </Table>
            </div>

            <Modal className="delete-modal"show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>DELETAR {clienteClicado.apelido}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Essa ação não pode ser revertida posteriormente</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deleteClientebyId}>
                        Excluir cliente
                    </Button>
                </Modal.Footer>
            </Modal>
  
        </TemplatePrivate>
    )
};

export default Clientes;
