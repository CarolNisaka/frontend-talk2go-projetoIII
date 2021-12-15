import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';

import { Form, Col, Button } from "react-bootstrap";

import TemplatePublic from "../../templates/TemplatePublic/TemplatePublic";

import { register, login } from '../../../services/api';


import "./Register.css";

const registerSchema = yup.object().shape({
    nome:yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(100, 'Máximo 10 caracteres'),
    cpf: yup.string().required('Campo obrigatório').min(14, 'Digite um CPF válido').max(14, 'Digite um CPF válido'),
    email:yup.string().required('Campo obrigatório').email('Formato inválido').matches(/@agaxtur/, "Utilize seu e-mail coorporativo"),
    senha:yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(150, 'Máximo 10 caracteres'),
    // role: yup.string(), 
    // // role: { type: String, enum: ['Adm', 'Gestor', 'Financeiro', 'Consultor'], default: 'Consultor'},
});


function Register () {

    const navigate = useNavigate();
    
    const { values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
    } = useFormik({
        initialValues: { nome: '', cpf: '', nome: '', senha: ''},//o initialvalues do formik cria o values, touched, errors e os Set deles
        validationSchema: registerSchema,
        onSubmit: async (formData) => { //aqui to usando as coisas da service/api
            try {
                await register(formData.nome, formData.cpf, formData.email, formData.senha);

                console.log('formulario submetido', formData);

                const tokenResponse = await login(formData.email,formData.senha);

                console.log('resposta da API', tokenResponse);

                localStorage.setItem('token', tokenResponse.token); //para guardar o token no localstorage

                navigate('/home');
               
            } catch (error) {//NAO TA FUNCIONANDO MEU SET ERRORS!!!
                console.log(error)
                setErrors({
                    nome: error.response.data.message,
                    cpf: error.response.data.message,
                    email: error.response.data.message,
                    senha: error.response.data.message,
                });
            }   
        },            
    });       
            

    return (
        <TemplatePublic>
            <h2 className="login-title">Agaxtur Shopping Metropole</h2>
            
            <p className="login-text">Cadastre-se</p>

            <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} md="12" controlId="login-form">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.nome && !errors.nome}
                        isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> {errors.nome}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="login-form">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        type="text"
                        name="cpf"
                        value={values.cpf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.cpf && !errors.cpf}
                        isInvalid={touched.cpf && errors.cpf}
                    />
                    <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> {errors.cpf}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="login-form">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> {errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="login-form">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="senha"
                        value={values.senha}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.senha && !errors.senha}
                        isInvalid={touched.senha && errors.senha}
                    />
                    <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> {errors.senha}</Form.Control.Feedback>
                </Form.Group>

                <Button 
                type="submit"
                size="lg"
                className="login-submit-button"
                >
                    Enviar
                </Button>
            </Form>

            
        </TemplatePublic>
    );
};

export default Register;
