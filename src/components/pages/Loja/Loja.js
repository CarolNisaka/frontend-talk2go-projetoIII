import React from "react";
import './Loja.css';
import TemplatePrivate from "../../templates/TemplatePrivate/TemplatePrivate";
import { MdOutlineStorefront, MdStorefront } from 'react-icons/md';
import { useFormik } from "formik";


function Loja () {
    return (
        <TemplatePrivate>
            <div className="loja">
                <div className="title">
                    <h1> 
                        <MdOutlineStorefront/> 
                        Atendimento na loja Eldorado
                    </h1> 

                    <Form>
                        <div>
                            cliente
                        </div>

                        <div>
                            Pedido
                        </div>

                        <div>
                            Forma de atendimento
                        </div>
                    </Form>
                </div>

                <div>
                    Infos do cliente
                </div>

               
            </div>


        </TemplatePrivate>
    )
};

export default Loja;