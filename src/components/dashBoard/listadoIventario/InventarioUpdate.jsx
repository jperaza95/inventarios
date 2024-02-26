
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';


import { useState } from "react";
import AlertSuccess from '../../reutilizables/AlertSuccess';
import AlertDanger from '../../reutilizables/AlertDanger';
import { updateUnInventario } from "../../../features/inventariosSlice";
import { updateUnInventarioDeUnaSuc } from "../../../features/sucursalesSlice";





const InventarioUpdate = ({ idInventario, nombreInventario, dateInventario, maestroDeProductos, areas }) => {



    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("")

    const [nameUP, setNameUP] = useState(nombreInventario);
    const [fechaUP, setFechaUp] = useState(dateInventario);



    const handleNameChange = (event) => {
        setNameUP(event.target.value);
    }

    const handleFechaChange = (event) => {
        setFechaUp(event.target.value);
    }



    const update = () => {


        let objUpdate = {
            "idInventario": idInventario,
            "nombreInventario": nameUP,
            "dateInventario": fechaUP,
            "maestroDeProductos": maestroDeProductos,
            "areas": areas


        } //Añadir a la url la dCliente
        console.log("objupdate: ", objUpdate);
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Inventario/${idInventario}`, {
            method: 'PUT',
            body: JSON.stringify(objUpdate),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    
                    dispatch(updateUnInventario({ id: idInventario, nuevoInventario: json.o }));
                    dispatch(updateUnInventarioDeUnaSuc({ id: idInventario, nuevoInventario: json.o }));

                    
                    setError(false);
                    setSuccess(true);
                    setMessage(json.mensaje);
                    console.log(json.mensaje);
                } else {
                    setSuccess(false);
                    setError(true);
                    setMessage(json.mensaje)

                }


            });





        }

return (
    <>

        <table className="table table-striped">

            <thead>
                <tr>

                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Maestro</th>
                    <th scope="col">Areas</th>
                    <th scope="col">Modificar</th>

                </tr>
            </thead>
            <tbody>

                <tr>
                    <th scope="row">{idInventario}</th>
                    <td><input type="text" className="form-control" id="name" value={nameUP} onChange={handleNameChange} /></td>
                    <td>
                        <input type="datetime-local" id="fecha" className="form-control" value={fechaUP} onChange={handleFechaChange} />
                    </td>

                    <td></td>
                    <td></td>




                    <td>
                        <input type="button" className="btn btn-outline-secondary" onClick={() => update()} value='Modificar' />
                    </td>
                </tr>

            </tbody>

        </table>


        {error && <AlertDanger mensaje={message} />}
        {success && <AlertSuccess mensaje={message} />}
    </>
);

    }
export default InventarioUpdate