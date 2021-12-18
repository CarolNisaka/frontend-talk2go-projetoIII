import React, { useState, useEffect} from "react";

import { Link, useParams} from 'react-router-dom';

import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";

import { useFormik } from "formik";
import * as yup from 'yup';

import { getOneCliente } from '../../../services/api';
import { getAtendimentos } from "../../../services/api";
import { createAtendimentoTipoFisico } from '../../../services/api';

import './CriarAtendimento.css';

import { Form, FormGroup, Col, Button, Card } from 'react-bootstrap';



function CriarAtendimento () {

    const[cliente, setCliente] = useState({ });
    const { clienteId } = useParams();
    console.log('paramtro id que vem da url',clienteId);
    

    const getOneClienteById = async () => {
        try{
            const token = localStorage.getItem('token');
            const foundCliente = await getOneCliente(clienteId, token);
            setCliente(foundCliente);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        getOneClienteById();
    }, []);

    const atendimentoFisicoSchema = yup.object().shape({
        tipo: yup.string(),
        tipoFisico: yup.string(),
        pedido: yup.string(),
        // status: yup.string()

    });

   
    const { values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors, setValues,
        } = useFormik({
            initialValues: { tipo: 'fisico', tipoFisico: '', pedido: ''},
            validationSchema: atendimentoFisicoSchema,
            onSubmit: async (formData, {resetForm}) => {
                try {
                    const token = localStorage.getItem('token');

                    await createAtendimentoTipoFisico(clienteId, formData.tipo, formData.tipoFisico, formData.pedido, token);

                    await getOneClienteById();
                    setValues({tipo: 'fisico', tipoFisico: '', pedido: ''});
                    resetForm({ pedido: ''})

                } catch (error) {
                    console.log(error)
                    setErrors({
                        tipo: error.response.data.message,
                        tipoFisico: error.response.data.message,
                        pedido: error.response.data.message,
                        // status: error.response.data.message,
                    });
                }
            },
        });

    return(
        
        <TemplatePrivate>
            <div className="fullpage-atendimento-container">
                <div className="atendimento-container">
                    <h2>Criar atendimento</h2>
                    
                    <Form onSubmit={handleSubmit}>
                            <FormGroup as={Col} md='12' controlId="floatingTextarea2">
                                <Form.Label>Pedido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pedido"
                                    placeholder='Digite o pedido do cliente que o cliente deseja'
                                    values={values.pedido}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ height: '100px' }}
                                />
                            </FormGroup>

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
           
                    </Form>
                </div>
                
                <div className="cliente-container">
                    <Card className="card-infos" style={{ width: '25rem' }}>
                    <h3>Detalhes do cliente</h3>
                        <Card.Body>
                            <Card.Title>{cliente.apelido}</Card.Title>
                            <br/>
                            <Card.Text>
                                <p>Nome: {cliente.nome}</p>
                                <p>Telefone Principal:{cliente.telefonePrincipal}</p>
                                <p>Telefone Alternativo:{cliente.telefoneAlternativo}</p>
                                <p>E-mail:{cliente.email}</p>
                                <p>Endereço: {cliente.endereco}</p>
                                <p>RG: {cliente.rg}</p>
                                <p>CPF: {cliente.cpf}</p>
                                <p>Data de nascimento:{cliente.nascimento}</p>
                                <p>Passaporte: {cliente.passaporte}</p>
                                <p>Validade do Passaporte: {cliente.validadePassaporte}</p>
                                <p>Vacina: {cliente.vacina}</p>
                            </Card.Text>
                        

                        </Card.Body>
                        <Button variant="warning">
                                <Link to={`/clientes/${cliente._id}/editarcliente`}>Editar Cliente</Link>
                        </Button>
                    </Card>
                </div>

                <div className="atendimentos-anteriores-container">
                    <Card className="card-infos" style={{ width: '25rem' }}>
                    <h3>Atendimentos do cliente</h3>
                       
                        <ul>
                                {cliente.atendimentos && cliente.atendimentos.map((atendimento) => (
                                    <li>
                                        {/* <h4>{atendimento._id}</h4> */}
                                        <p>{atendimento.pedido}</p>
                                    </li>
                                ))}
                            </ul>
                    </Card>
                </div>
            </div>
        </TemplatePrivate>
        
    )
}

export default CriarAtendimento;