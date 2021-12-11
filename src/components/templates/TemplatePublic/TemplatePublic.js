import react from "react";
import PropTypes from "prop-types";

import './TemplatePublic.css';
import logo from '../../../Images/logoMap.jpeg';

//problemas - enfiar um footer e o logo nao carrega

function TemplatePublic ({ children }) {
    return(
            <div className="template-public-container">
                <div className="template-public-background">
                    <h1 className='text'>Bem Vindo a Map2Go</h1>
                    <img scr={logo} alt="logo"/>
                </div>
                <div className="template-public-content">
                    {children}
                </div>
            </div>
    );
};

TemplatePublic.propTypes = {
    children: PropTypes.node.isRequired,
    
};



export default TemplatePublic;