import React from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';
import { editOneCliente } from '../../../services/api';
import { Form, FormGroup, Modal, Button, Col} from 'react-bootstrap';

function FormularioEditar (props) {
    const { dados, handleCloseProp, buscaclienteProps } = props;
   


    const editarClienteSchema = yup.object().shape({
        apelido: yup.string().required('Campo obrigatorio').max(50, 'Máximo 50 caracteres'),
        nome: yup.string().max(100, 'Máximo 100 caracteres'),
        telefonePrincipal: yup.string(),
        telefoneSecundario: yup.string(),
        email: yup.string().email(),
        endereco: yup.string(),
        rg: yup.string(),
        cpf: yup.string(),
        nascimento: yup.string(),
        passaporte: yup.string(),
        validadePassaporte: yup.string(),
        vacina: yup.string(),
    });

    const { values, touched, errors, handleChange, handleBlur, handleSubmit, setErros 
    } = useFormik({
            initialValues: { 
                apelido: dados.apelido, 
                nome: dados.nome, 
                telefonePrincipal: dados.telefonePrincipal, 
                telefoneSecundario: dados.telefoneSecundario,
                email: dados.email, 
                endereco: dados. endereco,
                rg: dados.rg,
                cpf: dados.cpf,
                nascimento: dados.nasciment,
                passaporte: dados.passaporte,
                validadePassaporte: dados.validadePassaport,
                vacina: dados.vacina,
            },
            validationSchema: editarClienteSchema,
            onSubmit: async (formData) => {
               
                try {
                    const token = localStorage.getItem('token');

                    console.log('formulario submetido', formData);

                    await editOneCliente (dados._id, formData,  token);

                    await buscaclienteProps();
                    handleCloseProp();

                    
                   
                    
                    
                } catch (error) {
                    console.log(error)
                    
                    
                }
            }
        });

        console.log(errors);

    return (
        <Form onSubmit={handleSubmit}>

            <Modal.Body>
                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="apelido"
                        placeholder='digite o apelido a editar'
                        value={values.apelido}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="nome"
                        placeholder='Digite o nome a editar'
                        value={values.nome}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="telefonePrincipal"
                        placeholder='Digite o telefone a editar'
                        value={values.telefonePrincipal}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="telefoneSecundario"
                        placeholder='Digite o telefone alternativo a editar'
                        value={values.telefoneSecundario}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder='Digite o email a editar'
                        value={values.email}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="endereco"
                        placeholder='Digite o endereço a editar'
                        value={values.endereco}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="rg"
                        placeholder='Digite o rg a editar'
                        value={values.rg}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="cpf"
                        placeholder='Digite o CPF a editar'
                        value={values.cpf}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="nascimento"
                        placeholder='Digite a data de nascimento a editar'
                        value={values.nascimento}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="passaporte"
                        placeholder='Digite o passaporte a editar'
                        value={values.passaporte}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="validadePassaporte"
                        placeholder='Digite a validade do passaporte a editar'
                        value={values.validadePassaporte}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup as={Col} md='12' controlId="login-form">
                    <Form.Control
                        type="text"
                        name="vacina"
                        placeholder='Digite a vacina a editar'
                        value={values.vacina}
                        onChange={handleChange}
                    />
                </FormGroup>

            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProp}>
                Close
            </Button>
            <Button 
            type="submit"
            variant="primary" >
                Salvar Alteraçoes
            </Button>
            </Modal.Footer>
        </Form>
    );
}

export default FormularioEditar;