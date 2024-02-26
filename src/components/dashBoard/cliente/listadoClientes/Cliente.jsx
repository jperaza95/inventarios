/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { borrarUnCliente, setFiltro } from '../../../../features/clientesSlice'; 
import { setSucursales, setIdCliente, setNombreCliente } from '../../../../features/sucursalesSlice'; 

import AlertDanger from '../../../reutilizables/AlertDanger';
import { useState } from 'react';
import ModalEliminacion from "../../../reutilizables/ModalEliminacion";




const Cliente = ({ idCliente, name, rubro, tipoEmpresa, activo, sucursales, setExito }) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    



    const borrar = () => {
        eliminar(idCliente);
    }

    const eliminar = (idCliente) => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Cliente/${idCliente}`, {

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
                    dispatch(borrarUnCliente(idCliente));
                } else {
                    setError(true);
                    setMessage(json.mensaje)

                }
            });

    }

    //Falta terminar
    const verSucursales = () => {
        /*
        dispatch(setSucursales(sucursales));
        //el setId es para saber de que cleinte son las sucursales en update / add
        dispatch(setIdCliente(idCliente));
        dispatch(setNombreCliente(name)); 

       
        navigate("/listadosucursales");
        */

        navigate(`/listadosucursales/${idCliente}`);
    }


    const updateCliente = () => {

        /*dispatch(setFiltro(name));
        navigate("/updateCliente");*/
        navigate(`/updateCliente/${idCliente}`);


    }


    return (


        <>
            {error && <AlertDanger mensaje={message} />}
        <tr>
            <th scope="row">{idCliente}</th>
            <td>{name}</td>
            <td>{rubro}</td>
            <td>{tipoEmpresa}</td>
                <td>{activo ? "Activo" : "Inactivo"}</td>
                <td>{<input type="button" className="btn btn-outline-secondary" onClick={() => updateCliente()} value='Modificar' />}</td>

                <td>{sucursales != null && <input type="button" className="btn btn-outline-primary" onClick={() => verSucursales() /*verSucursales(sucursales)*/} value='Ver sucursales' />}</td>
                {/* <td>{<input type="button" className="btn btn-outline-danger" onClick={() => eliminar(idCliente)} value='Eliminar'/>}</td>*/}
                <td>
                    <ModalEliminacion
                        title="Eliminar cliente"
                        onSave={borrar}
                        setExito={setExito}
                        body={`¿Desea borrar al cliente ${name}, Id: ${idCliente}? `} 
                        
                    />
                </td>

        </tr>

        </>




    )
}

export default Cliente