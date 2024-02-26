/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux';
import { borrarUnaSucursal, setFiltroSucursal } from '../../../../features/sucursalesSlice';
import AlertDanger from '../../../reutilizables/AlertDanger';
import { useState } from 'react';
import { setIdCliente } from "../../../../features/inventariosSlice";
import { setIdSucursal } from "../../../../features/inventariosSlice";
import ModalEliminacion from "../../../reutilizables/ModalEliminacion";
import { borrarUnaSucursalDeUnCliente } from "../../../../features/clientesSlice";

const Sucursal = ({ idSucursal, numero, name, adress, ciudad, activo, inventarios, setExito, setError, setMessage }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const [error, setError] = useState(false);
    /*const [message, setMessage] = useState("");*/

    const idCliente = useSelector(state => state.sucursales.idCliente);

    const updateSucursal = () => {

        navigate(`/updateSucursal/${idSucursal}`);
    }

    const eliminar = () => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Sucursal/${idSucursal}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    setError(false);

                    setExito(true);
                    setMessage(json.mensaje);

                    dispatch(borrarUnaSucursal(idSucursal));
                    dispatch(borrarUnaSucursalDeUnCliente({ idSucursal: idSucursal }));
                } else {
                    console.log(setError);
                    console.log(setMessage);
                    setExito(false);

                    setError(true);
                    setMessage(json.mensaje)

                }


            });

    }



    const verInventarios = () => {
        //dispatch(setInventarios(Inventarios));
        dispatch(setIdCliente(idCliente));
        dispatch(setIdSucursal(idSucursal));
        //-----------------------------------

        navigate(`/listarinventarios/${idSucursal}`);

    }




    return (
        <>
            <tr>
                <th scope="row">{idSucursal}</th>
            
                <td>{numero}</td>
                <td>{name}</td>
            <td>{adress}</td>
            <td>{ciudad}</td>

                <td>{activo ? "Activo" : "Inactivo"}</td>
            <td>{inventarios != null && <input type="button" className="btn btn-outline-info" onClick={() => verInventarios()} value='Ver Inventarios' />}</td>
                <td><input type="button" className="btn btn-outline-secondary" onClick={() => updateSucursal()} value='Modificar' /></td>
                {/*<td><input type="button" className="btn btn-outline-danger" onClick={() => eliminar()} value='Eliminar' /></td>*/}



            <td>

            <ModalEliminacion
                title="Eliminar sucursal"
                onSave={eliminar}
                setExito={setExito}
                    body={`¿Desea borrar a la sucursal ${name}, Numero: ${numero}? `}

            />
            </td>


            </tr>

        </>


    )
}

export default Sucursal

