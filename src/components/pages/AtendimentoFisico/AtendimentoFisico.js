import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";

import './AtendimentoFisico.css';
import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";
import { MdOutlineStorefront, MdStorefront } from 'react-icons/md';

import { useFormik } from "formik";
import * as yup from 'yup';

import { getClientes } from '../../../services/api';
import { createOneCliente } from "../../../services/api";
import { createAtendimentoTipoFisico } from '../../../services/api';

import { Form, Col, Table, FormGroup} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GiButtonFinger } from "react-icons/gi";

import Modal from 'react-bootstrap/Modal'
import { FaBullseye } from "react-icons/fa";

function AtendimentoFisico (props) {
        //***PARA USAR CLIENTE EXISTENTE***
        const [show, setShow] = useState(false);
        const [clientes, setClientes] = useState([]);
        // const [searchCliente, setSearchCliente] = useState('');
        
        const [showModal, setShowModal] = useState(false);
        
    
        const handleChangeSearch = async (e) => {
            setSearchCliente(e.target.value);
        };
    
       

        const novoClienteSchema = yup.object().shape({
            apelido: yup.string().required('Campo obrigatorio').max(50, 'Máximo 50 caracteres'),
        });
    
        const { values, touched, errors, handleChange, handleBlur, handleSubmit, setErros 
        } = useFormik({
            initialValues: { apelido: ''},
            validationSchema: novoClienteSchema,
            onSubmit: async (formData, {resetForm}) => {
                setShowModal(true)
                try {
                    const token = localStorage.getItem('token');

                    await createOneCliente (formData.apelido, token);

                    console.log('formulario submetido', formData);
                    resetForm({ apelido: ''})
                    setShowModal(false)
                    
                } catch (error) {
                    console.log(error)
                    setErros({
                        apelido: error.response.data.message,
                    });
                    setShowModal(false)
                }
            }
        });
    

        const getClientePeloApelido = async () => {
            try {
                const token = localStorage.getItem('token');
                const foundCliente = await getClientes(values.apelido, token);
    
                setClientes(foundCliente);
            } catch (error) {
                setShow(true);
            }
        };

        useEffect(() => {
            getClientePeloApelido();
        }, [values.apelido]);   
    
        

    return (
        <TemplatePrivate>
            <div className="full-page">
                <div className="atendimento-container">
                    <h1> 
                        <MdOutlineStorefront/> 
                        Atendimento no Shopping Metropole
                    </h1> 

                    <Form className="cliente-container" onSubmit={handleSubmit}>
                       
                            <Form.Label>Cliente</Form.Label>
                                <FormGroup as={Col} md='12' controlId="login-form">
                                    <Form.Control
                                        type="text"
                                        placeholder='Digite para procurar um cliente'
                                        value={values.apelido}
                                        name="apelido"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                
                                <Button className="button-create-cliente"
                                variant="warning"
                                type="submit"
                                >
                                    Criar novo cliente
                                </Button>
                        
                    </Form>

                </div>

                <div className="clientes-container">
                {clientes.map((cliente)=> (
                    <Link className="cliente-card" key={cliente._id} to={`/clientes/${cliente._id}`}>
                        <p>{cliente.apelido}</p>
                    </Link>
                ))}
                </div>

                <Modal show={showModal}>
                    <Modal.Header>
                    <Modal.Title>Criando Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Já está quase pronto</Modal.Body>
                    
                </Modal>
            </div>
        </TemplatePrivate>
    )
};

export default AtendimentoFisico;