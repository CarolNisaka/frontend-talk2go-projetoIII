import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';

import { Form, Col, Button } from "react-bootstrap";

import TemplatePublic from "../../templates/TemplatePublic/TemplatePublic";

import { login } from '../../../services/api';

import "./Login.css";

const loginSchema = yup.object().shape({
    email:yup.string().required('Campo obrigatório').email('Formato inválido').matches(/@agaxtur/, "Utilize seu e-mail coorporativo"),
    senha:yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(150, 'Máximo 10 caracteres'),
});


function Login () {

    const navigate = useNavigate();
    
    const { values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
    } = useFormik({
        initialValues: { email: '', senha: ''},//o initialvalues do formik cria o values, touched, errors e os Set deles
        validationSchema: loginSchema,
        onSubmit: async (formData) => { //aqui to usando as coisas da service/api
            try {
                console.log('formulario submetido', formData);

                const tokenResponse = await login(formData.email, formData.senha);

                console.log('resposta da API', tokenResponse);

                localStorage.setItem('token', tokenResponse.token); //para guardar o token no localstorage

                navigate('/home');
               
            } catch (error) {//NAO TA FUNCIONANDO MEU SET ERRORS!!!
                setErrors({
                    email: error.response.data.error,
                    senha: error.response.data.error,
                });
            }   
        },            
    });       
            

    return (
        <TemplatePublic>
            <h2 className="login-title">Agaxtur Shopping Metropole</h2>
            
            <p className="login-text">Acesse sua conta</p>

            <Form onSubmit={handleSubmit}>
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
                    Login
                </Button>
            </Form>

            <br/>

            <p>Não tem cadastro?</p>
            <Button className="register"
            variant="warning"
            a href="/register"
            >
                Clique aqui
            </Button>
        </TemplatePublic>
    );
};

export default Login;