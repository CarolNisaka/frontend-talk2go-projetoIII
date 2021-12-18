import React, { useState, useEffect} from "react";

import { Link, useParams} from 'react-router-dom';

import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";

import { Modal, Button, Card } from 'react-bootstrap';

import { getOneCliente } from '../../../services/api';
import FormularioEditar from "./FomularioEditar";

function EditarCliente () {

    const[clienteDetail, setClienteDetail] = useState({});
    const { clienteId } = useParams();
    console.log('paramtro id que vem da url',clienteId);
    

    const getOneClienteById = async () => {
        try{
            const token = localStorage.getItem('token');
            const foundCliente = await getOneCliente(clienteId, token);
            setClienteDetail(foundCliente);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        getOneClienteById();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <TemplatePrivate>
            
                <Card className="card-infos" style={{ width: '25rem' }}>
                    <h3>Detalhes do cliente</h3>
                        <Card.Body>
                            <Card.Title>{clienteDetail.apelido}</Card.Title>
                            <br/>
                            <Card.Text>
                                <p>Nome: {clienteDetail.nome}</p>
                                <p>Telefone Principal:{clienteDetail.telefonePrincipal}</p>
                                <p>Telefone Alternativo:{clienteDetail.telefoneAlternativo}</p>
                                <p>E-mail:{clienteDetail.email}</p>
                                <p>Endereço: {clienteDetail.endereco}</p>
                                <p>RG: {clienteDetail.rg}</p>
                                <p>CPF: {clienteDetail.cpf}</p>
                                <p>Data de nascimento:{clienteDetail.nascimento}</p>
                                <p>Passaporte: {clienteDetail.passaporte}</p>
                                <p>Validade do Passaporte: {clienteDetail.validadePassaporte}</p>
                                <p>Vacina: {clienteDetail.vacina}</p>
                            </Card.Text>
                    </Card.Body>
                </Card>

                <Button variant="primary" onClick={handleShow}>
                    Editar dados do cliente
                </Button>

                {showModal && (
                    <Modal show onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Editar um cliente</Modal.Title>
                        </Modal.Header>
                         <FormularioEditar dados={clienteDetail} handleCloseProp={handleClose} buscaclienteProps={getOneClienteById}/>
                    </Modal>
                )}
        </TemplatePrivate>
    );
};

export default EditarCliente;
