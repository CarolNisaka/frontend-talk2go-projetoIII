import Nav from "react-bootstrap/Nav";
import "./TemplatePrivate.css";
import { a } from "react-router-dom";
import {AiFillHome} from "react-icons/ai";
import {BsPersonCircle} from "react-icons/bs"
import {RiDashboardFill} from "react-icons/ri"
import {IoIosPeople} from "react-icons/io"
import {FaPeopleArrows} from "react-icons/fa"
import {FaFunnelDollar} from "react-icons/fa"
import {GiJourney} from "react-icons/gi"
import {MdOutlineAttachMoney} from "react-icons/md"
import {MdOutlineLocalLibrary} from "react-icons/md"
import { ImExit } from "react-icons/im"

function TemplatePrivate ({ children}) {
    return (
        <div className="template-private-container">
            <div className="NavBar">
                
                <Nav defaultActiveKey="/home" className="flex-column">

                    <a className="home"
                    href="/home"
                    >
                    <AiFillHome size="35px"/>
                    </a>

                    <br/>

                    <a className="dashboard"
                    >
                    <RiDashboardFill size="35px"/>
                    </a>

                    <br/>

                    <a 
                    className="cliente"
                    href="/clientes"
                    >
                    <IoIosPeople size="35px"/>
                    </a>

                    <br/>

                    <a 
                    className="atender"
                    href="/atendimentoloja"
                    >
                    <FaPeopleArrows size="35px" />
                    </a>

                    <br/>

                    <a className="funil"
                    >
                    <FaFunnelDollar size="35px"/>
                    </a>

                    <br/>

                    <a className="jornada"
                    >
                    <GiJourney size="35px"/>
                    </a>

                    <br/>

                    <a className="financeiro"
                    >
                    <MdOutlineAttachMoney size="35px"/>
                    </a>

                    <br/>

                    <a className="treinamento"
                    >
                    <MdOutlineLocalLibrary size="35px"/>
                    </a>

                    <br/>

                    <a className="meu_perfil"
                    >
                    <BsPersonCircle size="35px"/>
                    </a>

                    <br/>
                    
                    <a className="sair"
                    href="/"
                    >
                    <ImExit size="35px"/>
                    </a>
                </Nav>
                
            </div>
            <div className="template-private-content">
                {children}
            </div>
        </div>
    );
}

export default TemplatePrivate;