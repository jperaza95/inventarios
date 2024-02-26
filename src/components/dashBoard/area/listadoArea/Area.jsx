/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

import { useDispatch } from 'react-redux';
import { borrarUnArea } from '../../../../features/areasSlice';
import AlertDanger from '../../../reutilizables/AlertDanger';
import { useState } from 'react';
import MiModal from "../../../MiModal";
import { borrarUnAreaAInventario } from "../../../../features/inventariosSlice";





const Area = ({ idArea, codigo, name, setMsjExito, setError,setMsj, idInventario }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const updateArea = () => {

        navigate(`/updateArea/${idInventario}/${idArea}`);
    }

    const eliminar = (idArea) => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Area/${idArea}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8', 
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    dispatch(borrarUnArea(idArea));
                    dispatch(borrarUnAreaAInventario({ idInv: idInventario, idArea: idArea }))
                    setMsjExito(true);
                    setMsj(json.mensaje);
                    setError(false);

                } else {
                    setError(true);
                    setMsj(json.mensaje);
                    setMsjExito(false);

                }


            });

    }



    const mostrarDatosFormulario = () => {

        return {
            "Desea eliminar el area?": idArea

        }



    }



    return (

        <tr>

            
            

            <th scope="row">{codigo}</th>

            {/*<th scope="row">{idArea}</th>*/}


            <td>{name}</td>

            {/*<td>{conteoReal != null && <input type="button" className="btn btn-outline-info" onClick={() => verConteoReal(conteoReal)} value='Ver Productos Area' />}</td>*/}
            <td><input type="button" className="btn btn-outline-secondary" onClick={() => updateArea()} value='Modificar' /></td>
            {<td><input type="button" className="btn btn-outline-danger" onClick={() => eliminar(idArea)} value='Eliminar' /></td>
            }

            <td>


            </td>


        </tr>


    )
}

export default Area

