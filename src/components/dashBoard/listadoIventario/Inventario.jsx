/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import { setIdClienteArea, setIdSucursalArea, setIdInventarioArea } from "../../../features/areasSlice";
   

import AlertDanger from '../../reutilizables/AlertDanger';
import { useState } from 'react';
import ModalEliminacion from "../../reutilizables/ModalEliminacion";

import { borrarUnInventario, setIdInventario, setMaestro } from "../../../features/inventariosSlice";
import { borrarUnInventarioDeUnaSucursal } from "../../../features/sucursalesSlice";
import { formatearFecha } from "../../reutilizables/Utilidades";


const Inventario = ({ idInventario, nombreInventario, dateInventario, activo, tieneMaestro, areas, setExito, hayInventarioActivo, seleccionarInventario }) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    //const [exito, setExito] = useState(false);
   

    const borrar = () => {
        eliminar(idInventario);
    }

    //const seleccionarInventario = () => {
    //    fetch(`https://inventarioswebapi1.azurewebsites.net/api/ImportarMaestro/${idInventario}`, {
    //        method: 'PUT', // Usamos PUT para actualizar el inventario específico
    //        headers: {
    //            'Content-Type': 'application/json; charset=UTF-8'
    //        },
    //    })
    //        .then((response) => response.json())
    //        .then((json) => {
    //            console.log(json);
    //            if (json.codigo === 200) {
    //                alert("Inventario seleccionado");
    //            } else {
    //                alert("No se pudo seleccionar el inventario/maestro");
    //            }
    //        });
    //}


    const eliminar = (idInventario) => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Inventario/${idInventario}`, {

            method: 'DELETE',
            //body: JSON.stringify(objEliminar),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.codigo === 200) {
                    setExito(true);
                    //dispatch(borrarUnInventario(idInventario));
                    dispatch(borrarUnInventarioDeUnaSucursal({ idInventario: idInventario }));

                } else {
                    setError(true);
                    setMessage(json.mensaje)

                }
            });

    }

    //Falta terminar
    const cargarMaestro = () => {

        //dispatch(setMaestro(maestroDeProductos));
        navigate(`/maestros/${idInventario}`);
    }

    const verMaestro = () => {


        //dispatch(setMaestro(maestroDeProductos));

        navigate(`/vermaestro/${idInventario}`);


    }
    const idCliente = useSelector(state => state.inventarios.idCliente);
    const idSucursal = useSelector(state => state.inventarios.idSucursal);

    const verAreas = () => {
        
        dispatch(setIdClienteArea(idCliente));
        dispatch(setIdSucursalArea(idSucursal));
        dispatch(setIdInventarioArea(idInventario));

        //-----------------------------------
        console.log(tieneMaestro);

        navigate(`/listarareas/${idInventario}`);
    }

    const updateInventario = () => {

        
        
        //dispatch(setFiltro(name));
        navigate(`/updateInventario/${idInventario}`);
    }

    // ({ idInventario, nombreInventario, dateInventario, maestroDeProductos, areas, setExito })
    return (


        <>
        <tr>
                <th scope="row">{idInventario}</th>
                <td>{nombreInventario}</td>
                <td>{formatearFecha(dateInventario)}</td>
                <td>{(!tieneMaestro||tieneMaestro===undefined) ? (
                    <input type="button" className="btn btn-outline-primary" onClick={() => cargarMaestro()} value='Cargar maestro' />
                ) : (
                        <input type="button" className="btn btn-outline-primary" onClick={() => verMaestro()} value='Ver maestro' />)
                }
                </td>
                <td>{areas != null && <input type="button" className="btn btn-outline-primary" onClick={() => verAreas(areas)} value='Ver areas' />}</td>
                <td>{<input type="button" className="btn btn-outline-secondary" onClick={() => updateInventario()} value='Modificar' />}</td>

                
                {/* <td>{<input type="button" className="btn btn-outline-danger" onClick={() => eliminar(idCliente)} value='Eliminar'/>}</td>*/}
                <td>
                    <ModalEliminacion
                        title="Eliminar inventario"
                        onSave={borrar}
                        setExito={setExito}
                        body={`¿Desea borrar al inventario ${nombreInventario}, Id: ${idInventario}? `} 
                        
                    />
                </td>

                {/*<td>*/}
                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="btn btn-success mb-3"*/}

                {/*    onClick={seleccionarInventario}*/}
                {/*>*/}

                {/*    Comenzar*/}
                {/*    </button>*/}
                {/*</td>*/}

        <td>
            <input
                type="button"
                className="btn btn-success mb-3"
                        onClick={() => seleccionarInventario(idInventario)}
                        value={activo ? 'Terminar' : (hayInventarioActivo ? 'Comenzar' : 'Comenzar')}
                        disabled={activo ? false : (hayInventarioActivo ? true : false)}
            />
        </td>


        </tr>
            {error && <AlertDanger mensaje={message} />}

        </>




    )
}

export default Inventario