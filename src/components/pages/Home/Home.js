import React, { useState, useEffect } from 'react';
import './Home.css';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';


import Button from 'react-bootstrap/Button';

import {HiDesktopComputer} from 'react-icons/hi';
import { MdOutlineStorefront, MdStorefront } from 'react-icons/md';

import { getOneUsuario } from '../../../services/api';

//depois do login a api retorna esse codigo aqui - como coloca o nome no Front - linha 39. fazer na API?
// //{
//     _id: new ObjectId("61b4e78796e5c8e99ce09f09"),
//     pdvs: [],
//     atendimentos: [],
//     clientes: [],
//     viagens: [],
//     oportunidades: [],
//     nome: 'Carol Nisaka',
//     email: 'teste@agaxtur.com',
//     senha: '$2a$10$t7knFDNEHUFaY/JhQdCAMeEg3.9Vpp2zM84ZFyjQC8PMWoVRFQJqG',
//     cpf: '219.835.118-89',
//     role: 'Consultor',
//     createdAt: 2021-12-11T18:01:43.095Z,
//     updatedAt: 2021-12-11T18:01:43.095Z,
//     __v: 0
//   }

function Home (props) {

    
    return (
       <TemplatePrivate>
        
        <div className='welcome'>
            <h1>Ola,   !  Hoje é </h1>
            
            
        </div>
        


        <div className='chanel'>
            <br/>
            <h2>Canais de atendimento</h2>

            <Button className='button-chanel'
                variant="outline-primary"
                a href='/atendimentoloja'>
                Cliente na loja Eldorado 
                <MdOutlineStorefront/>
            </Button>
            
            <Button className='button-chanel'
                variant="outline-secondary">
                Cliente no Site Eldorado
                <HiDesktopComputer/>
            </Button>

            <Button className='button-chanel'
                variant="outline-success">
                Cliente no Site Agaxtur
                <HiDesktopComputer/>
            </Button>
        </div>

        

       </TemplatePrivate>

       
    );
}

export default Home;