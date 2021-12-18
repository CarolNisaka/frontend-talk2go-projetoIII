import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";

import './Loja.css';
import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";
import { MdOutlineStorefront, MdStorefront } from 'react-icons/md';

import { useFormik } from "formik";
import * as yup from 'yup';

import ClienteDetails from '../CriarAtendimento/CriarAtendimento';

import { getClientes } from '../../../services/api';
import { createOneCliente } from "../../../services/api";
import { createAtendimentoTipoFisico } from '../../../services/api';

import { Form, Col, Table, FormGroup} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'


function Loja (props) {
    
    //***PARA USAR CLIENTE EXISTENTE***
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

    const handleChangeSearch = async (e) => {
        setSearchCliente(e.target.value);
    };

    useEffect(() => {
        getClientePeloApelido();
    }, [searchCliente]);

    // OU OU OU 

    //***PARA CRIAR NOVO CLIENTE
    const novoClienteSchema = yup.object().shape({
        apelido: yup.string().required('Campo obrigatorio').max(50, 'Máximo 50 caracteres'),
        telefonePrincipal: yup.string(),
    });

    

        const { values, touched, errors, handleChange, handleBlur, handleSubmit, setErros 
        } = useFormik({
            initialValues: { apelido: ''},
            validationSchema: novoClienteSchema,
            onSubmit: async (formData) => {
                try {
                    await createOneCliente (formData.apelido);
                    console.log('formulario submetido', formData);


                } catch (error) {
                    console.log(error)
                    setErros({
                        apelido: error.response.data.message,
                    });
                }
        
            }
        });
    

    //CRIAR O ATENDIMENTO EM SI
    //Problemas: 
    //o tipo aqui já é fisico - coloquei esse true so pq no Mongo esta como required
    //o tipoFisico é presencial ou remoto no banco - ta certo do jeito que fiz?
    //pedido: o ok pq é etxto livre
    //status: nao cooloquei no banco que é enum [continuar ou declinar] - difinido pelo botao.
    //outro problema é que no schema do Atendimento do banco ja to passando clienteId e aqui to registrando cliente tmb - la em cima - confusao mental
    // const atendimentoFisicoSchema = yup.object().shape({
    //     // tipo: yup.string().required(),
    //     tipoFisico: yup.string(),
    //     pedido: yup.string(),
    //     status: yup.string()

    // });

   
        // const { values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
        // } = useFormik({
        //     initialValues: { tipo: 'fisico', tipoFisico: '', pedido: '', status: ''},
        //     validationSchema: atendimentoFisicoSchema,
        //     onSubmit: async (formData) => {
        //         try {
        //             await createAtendimentoTipoFisico(formData.tipo, formData.tipoFisico, formData.pedido, formData.status);

        //             console.log('formulario atendimento submetido', formData);

        //         } catch (error) {
        //             console.log(error)
        //             setErrors({
        //                 tipo: error.response.data.message,
        //                 tipoFisico: error.response.data.message,
        //                 pedido: error.response.data.message,
        //                 status: error.response.data.message,
        //             });
        //         }
        //     },
        // });
    

    //o return esta fora da funcao pq nao sei 
    return (
        <TemplatePrivate>
            <div className="loja">
                <div className="atendimento-container">
                    <h1> 
                        <MdOutlineStorefront/> 
                        Atendimento no Shopping Metropole
                    </h1> 

                    {/* <Form onSubmit={handleSubmit}> */}
                        <div className="cliente-container">
                        <Form.Label>Cliente</Form.Label>
                            <FormGroup as={Col} md='12' controlId="login-form">
                                <Form.Control
                                    type="text"
                                    placeholder='Digite para procurar um cliente'
                                    values={searchCliente}
                                    onChange={handleChangeSearch}
                                />

                            </FormGroup>
                        </div>

                        {/* AJUSTAR AQUI PQ o pedido container e a forma de atendimento container fazer parte do ATENDIMENTO SCHEMA */}
                        <div className="pedido-container">
                        <Form.Label>Pedido</Form.Label>
                            <FormGroup as={Col} md='12' controlId="floatingTextarea2">
                                <Form.Control
                                    type="text"
                                    placeholder='Digite o pedido do cliente que o cliente deseja'
                                    // values={values.pedido}
                                    // onChange={handleChange}
                                    style={{ height: '100px' }}
                                />
                            </FormGroup>
                           
                        </div>

                        

                        <div className="forma-de-contato-container">
                        <Form>
                        <Form.Label>Forma de contato do atendimento</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Presencial"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Remoto"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                               
                                </div>
                            ))}
                        </Form>
                        </div>
                        
                {/* //estao fora do form pq ta uma zona */}
                 <Button 
                variant="success"
                type="submit"
                size="lg"
                className="button-continuar"
                >
                Continuar
                </Button>

                <Button 
                variant="danger"
                type="submit"
                size="lg"
                className="button-declinar"
                >
                Declinar
                </Button>
                        
                    {/* </Form> */}
                </div>

                <div>
                <div className="clientes-container">
                {clientes.map((cliente)=> (
                    <Link className="cliente-card" key={cliente._id} to={`/clientes/${cliente._id}`}>
                        <p>{cliente.apelido}</p>
                    </Link>
                ))}
            </div>
                </div>

               
            </div>


        </TemplatePrivate>
    )
};

export default Loja;