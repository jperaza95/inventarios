import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientes } from "../features/clientesSlice";
import { setCalculosPersonales } from "../features/calculosPersonalesSlice";
import { caducarSesion } from "../features/sesionSlice";
import Login from "./login/Login";
import { setInventarioActivo, setInventarios } from "../features/inventariosSlice";
import { setSucursales } from "../features/sucursalesSlice";
import Navbar from "./reutilizables/Navbar";
import { setUsuarios } from "../features/usuariosSlice";
import LiReporte from "./reutilizables/LiReporte";
import { setAreas } from "../features/areasSlice";

const Dashboard = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();



    const idInvActual = useSelector(state => state.inventarios.idInventarioActual);



    useEffect(() => {

        if (/*localStorage.getItem("apiKey") !== null && */localStorage.getItem("usuarioId") !== null && localStorage.getItem("usuarioId") !== 0) {

            cargarClientes();
            cargarCalculos();
            cargarInventarios();
            cargarSucursales();
            cargarUsuarios();
            cargarInventarioActivo();
            cargarAreas();


        } else {

            navigate("/login"); //Si el usuario no esta logueado lo manda al login
        }


    }, [])



    const idUsuario = localStorage.getItem("idUsuario");

    const cargarUsuarios = () => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log("usuarios ", result);
                if (result.codigo === 401) {
                    // alert("Sesion caduco");
                    dispatch(caducarSesion(true));
                    localStorage.clear();
                    //navigate("/login"); comentao

                } else {
                    console.log("Codigo diferente a 401: usuarios ", result)

                    dispatch(setUsuarios(result.o));
                }


            })
            .catch(error => console.log('error', error));

    }

    const cargarClientes = () => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Cliente`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.codigo === 401) {
                    dispatch(caducarSesion(true));
                    localStorage.clear();

                } else {
                    console.log("Codigo diferente a 401: ", result)
                    dispatch(setClientes(result.o));
                }


            })
            .catch(error => console.log('error', error));

        //}


    }

    const cargarCalculos = () => {
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/CalculoPersonal`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.codigo === 200) {
                    //console.log("Codigo igual a 200 en cargar calculos: ", result);

                    dispatch(setCalculosPersonales(result.o));
                } else {
                    console.log("Codigo diferente a 200: ", result);
                }


            })
            .catch(error => console.log('error', error));

    }



    const cargarSucursales = () => {
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Sucursal`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.codigo === 200) {
                    //console.log("Codigo igual a 200 en cargar calculos: ", result);

                    dispatch(setSucursales(result.o));
                } else {
                    console.log("Codigo diferente a 200: ", result);
                }


            })
            .catch(error => console.log('error', error));

    }


    const cargarInventarios = () => {
        //if (localStorage.getItem("apiKey") === null) {
        //  //navigate("/login"); comentao y suplantado con useEffect
        //} else {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Inventario`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log("Inventarios", result);
                if (result.codigo === 200) {
                    console.log("Codigo igual a 200 en cargar inventarios: ", result)
                    dispatch(setInventarios(result.o));

                } else {
                    // alert("Sesion caduco");
                    dispatch(caducarSesion(true));
                    localStorage.clear();
                    //navigate("/login"); comentao
                }


            })
            .catch(error => console.log('error', error));



    }


    const cargarInventarioActivo = () => {


        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Inventario/InventarioActivo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(result => {

                if (result.codigo === 200) {
                    console.log("Codigo igual a 200 en cargar inventario activo: ", result)
                    dispatch(setInventarioActivo(result.o));

                } else {
                    dispatch(setInventarioActivo(null));
                }


            })
            .catch(error => console.log('error', error));



    }

    const cargarAreas = () => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Area`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(result => {

                if (result.codigo === 200) {
                    dispatch(setAreas(result.o));

                } else {

                    console.log("Codigo diferente a 200 en cargar areas: ", result);
                }


            })
            .catch(error => console.log('error', error));



    }

    const toggleMostrarReportes = (idInventario) => {
        // se evalua idInventario como booleano
        setMostrarReportes(!!idInventario);
        console.log("mostrar reportes", idInventario);
    };


    const cerrarSesion = () => {
        localStorage.clear();
    }


    return (
        <>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Inventarios App</h3>
                </div>

                <ul className="list-unstyled components">
                    <p>Bienvenido</p>

                    <li className="active">
                        <a href="#clientesSubMenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Clientes</a>
                        <ul className="collapse list-unstyled" id="clientesSubMenu">
                            <li>
                                <Link to="/agregarcliente" className="nav-link">Agregar cliente<span className="sr-only">(current)</span></Link>
                            </li>
                            <li>
                                <Link to="/listadoclientes" className="nav-link">Listado de clientes</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/calculoPersonal" className="nav-link">Calculos</Link>
                    </li>

                    <li>
                        <Link to="/registro" className="nav-link">Registro de usuario</Link>
                    </li>


                    <li className={`active ${idInvActual > 0 ? 'show' : 'hide'}`}>
                        <a href="#reportesSubMenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Reportes</a>
                        <ul className={`collapse list-unstyled`} id="reportesSubMenu">


                            <LiReporte dirReporte="reporteInventario" titulo="Reporte de inventarios" idInventario={idInvActual} />
                            <LiReporte dirReporte="reporteCronologico" titulo="Reporte cronol&oacute;gico" idInventario={idInvActual} />
                            <LiReporte dirReporte="reporteDeArea" titulo="Reporte detallado por &aacute;reas" idInventario={idInvActual} />
                            <LiReporte dirReporte="reporteDeAreasNoContadas" titulo="Reporte de &aacute;reas no contadas" idInventario={idInvActual} />
                            <LiReporte dirReporte="reporteAvanceAreas" titulo="Reporte de avance de &aacute;reas" idInventario={idInvActual} />
                            <LiReporte dirReporte="reporteProductividadOperario" titulo="Reporte de productividad por operario" idInventario={idInvActual} />
                            {/*<LiReporte dirReporte="reporteProductividadOperarioMensual" titulo="Reporte de prod. mensual por operario" idInventario={idInvActual} />*/}
                            <LiReporte dirReporte="reporteDeVariacion" titulo="Reporte de variaci&oacute;n" idInventario={idInvActual} />
                            <LiReporte dirReporte="reportePorProducto" titulo="Reporte por producto" idInventario={idInvActual} />
                            {/*<LiReporte dirReporte="reporteProdNoReg" titulo="Reporte de alta de productos" idInventario={idInvActual} />*/}



                        </ul>
                    </li>
                </ul>

                <ul className="list-unstyled CTAs">

                    <li>

                        <Link to="/login" className="nav-link configuracion" onClick={cerrarSesion}>Cerrar Sesion</Link>
                    </li>
                </ul>
            </nav>


            <div className="content" id="fondo">


                <Navbar/>
                <Outlet context={[cargarClientes, cargarCalculos, toggleMostrarReportes]} />

            </div>

        </>


    )
}

export default Dashboard