import React, { useState, useEffect } from 'react';
import './Home.css';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import { date } from 'yup';

import Button from 'react-bootstrap/Button';

import {HiDesktopComputer} from 'react-icons/hi';
import { MdOutlineStorefront, MdStorefront } from 'react-icons/md';

function Home () {

    
    return (
       <TemplatePrivate>
        
        <div className='welcome'>
            <h1>Ola,  !  Hoje é </h1>
            
            
        </div>
        

        <div className='chanel'>
            <h2>Canais de atendimento</h2>

            <Button className='button-chanel'
                variant="outline-primary">
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