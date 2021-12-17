import React, { useState, useEffect} from "react";

import { Link, useParams} from 'react-router-dom';

import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";

import { getOneCliente } from '../../../services/api';
import { getAtendimentos } from "../../../services/api";

import './CilenteDetails.css';

import { Button } from 'react-bootstrap';



function ClienteDetails () {

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

    return(
        <div>
            <TemplatePrivate>
            <div className="full-page-details">

            
                <Link className="cliente-card" to="anything">
                    <h1>Detalhe do cliente</h1>
                </Link>
                <h1>{clienteDetail.nome}</h1>
                <p>{clienteDetail.telefonePrincipal}</p>
                <p>{clienteDetail.telefoneSecundario}</p>
                <p>{clienteDetail.email}</p>
                <p>{clienteDetail.endereço}</p>
                <p>{clienteDetail.rg}</p>
                <p>{clienteDetail.cpf}</p>
                <p>{clienteDetail.nascimento}</p>
                <p>{clienteDetail.passaporte}</p>
                <p>{clienteDetail.validadePassaporte}</p>
                <p>{clienteDetail.vacina}</p>

                <div>
                    {/* <ul>
                        {clienteDetail.atendimentos.map((atendimento)=> {
                            <li>
                                <h3>{atendimento.tipo}</h3>
                                <h2>{atendimento.pedido}</h2>
                                <p>{atendimento.status}</p>

                            </li>
                        })}
                    </ul> */}
                </div>

                <div>
                    <Button
                    a href="/clientes/:clienteId/atendimento">
                        Criar novo atendimento
                    </Button>
                
                </div>
                </div>
            </TemplatePrivate>
        </div>
    );
}

export default ClienteDetails;