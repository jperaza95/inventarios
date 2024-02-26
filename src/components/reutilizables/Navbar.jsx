import React from 'react';
import { useSelector } from 'react-redux';

import { Link} from "react-router-dom"


function Navbar() {

    const cerrarSesion = () => {
        localStorage.clear();
    }
    const inventarioActivo = useSelector(state => state.inventarios.inventarioActivo);

    const usuarioActivoCi = localStorage.getItem("ci");

    const usuarioActivo = useSelector(state =>
        state.usuarios.usuarios.find(u => u.ci === parseInt(usuarioActivoCi, 10))
    );

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <button type="button" id="sidebarCollapse" className="btn btn-info">
                        <i className="fas fa-align-left"></i>
                        <span>Mostrar/Ocultar Men&uacute;</span>
                    </button>
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">

                            {usuarioActivo && <li className="nav-item">
                                
                                <span className="nav-link">
                                    Bienvenido, {usuarioActivo.name}.
                                </span>

                            </li>}

                            {console.log("activo " + usuarioActivo)}

                            {inventarioActivo &&<li className="nav-item">
                                <Link to={`/reporteInventario/${inventarioActivo.idInventario}`} className="nav-link">Reportes</Link>


                            </li>}
                            <li className="nav-item">
                                <Link to="/calculoPersonal" className="nav-link">Calculos</Link>

                            </li>
                            <li className="nav-item">

                                <Link to="/listadoclientes" className="nav-link">Clientes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={cerrarSesion}>Cerrar Sesion</Link>



                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
    

    export default Navbar;
