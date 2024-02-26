
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

import { useDispatch } from 'react-redux';
import { updateUnCliente } from '../../../../features/clientesSlice';
import { setSucursales, setIdCliente, setNombreCliente } from '../../../../features/sucursalesSlice';

import { useState } from "react";
import AlertSuccess from '../../../reutilizables/AlertSuccess';
import AlertDanger from '../../../reutilizables/AlertDanger';




const ClienteUpdate = ({ idCliente, name, rubro, tipoEmpresa, activo, sucursales }) => {
    
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("")

    const [nameUP, setNameUP] = useState(name);
    const [rubroUP, setRubroUp] = useState(rubro)
    const [tipoEmpresaUP, setTipoEmpresa] = useState(tipoEmpresa);
    const [activoUP, setActivoUP] = useState(activo);


    const handleNameChange = (event) => {
        setNameUP(event.target.value);
    }

    const handleRubroChange = (event) => {
        setRubroUp(event.target.value);
    }
    const handleTipoEmpresaChange = (event) => {
        setTipoEmpresa(event.target.value);
    }

    const handleActivoChange = () => {
        setActivoUP(!activoUP);
    }


    

    const update = (idCliente) => {


        let objUpdate = {
            "idCliente": idCliente,
            "name": nameUP,
            "rubro": rubroUP,
            "tipoEmpresa": tipoEmpresaUP,
            "activo": activoUP,
            "sucursales": sucursales


        } //Añadir a la url la dCliente
        console.log("objupdate: ",objUpdate);
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Cliente/${idCliente}`, {
            method: 'PUT',
            body: JSON.stringify(objUpdate),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    dispatch(updateUnCliente({ id: idCliente, nuevoCliente: json.o }));

                    setError(false);
                    setSuccess(true);
                    setMessage(json.mensaje)

                } else {
                    setSuccess(false);
                    setError(true);
                    setMessage(json.mensaje)

                }


            });

    }


    const verSucursales = (Sucursales) => {

        dispatch(setSucursales(Sucursales));
        dispatch(setIdCliente(idCliente));
        dispatch(setNombreCliente(name));

        //falta el navigate al listado de sucursales
        navigate("/");
    }




    return (
        <>

            <table className="table table-striped">

                <thead>
                    <tr>
                        <th scope="col">Id Cliente</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Rubro</th>
                        <th scope="col">Tipo de empresa</th>
                        <th scope="col">Activo</th>

                        <th scope="col">Modificar</th>

                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th scope="row">{idCliente}</th>
                        <td><input type="text" className="form-control" id="name" value={nameUP} onChange={handleNameChange} /></td>

                        <td><input type="text" id="rubro" className="form-control" value={rubroUP} onChange={handleRubroChange} /></td>

                        <td><input type="text" id="tipoEmpresa" className="form-control" value={tipoEmpresaUP} onChange={handleTipoEmpresaChange} /></td>

                        <td>
                        {/*    <select id="activo" className="form-control" value={activoUP} onChange={handleActivoChange}>*/}
                        {/*    <option value={true}>Si</option>*/}
                        {/*    <option value={false}>No</option>*/}
                        {/*</select>*/}


                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="checkBoxActivo" value="activo" checked={activoUP} onChange={() => handleActivoChange()} />
                                
                            </div>
                                
                        </td>
                        <td>
                            <input type="button" className="btn btn-outline-secondary" onClick={() => update(idCliente)} value='Modificar' />
                        </td>
                    </tr>

                </tbody>

            </table>


            {error && <AlertDanger mensaje={message} />}
            {success && <AlertSuccess mensaje={message} />}
        </>
    )

}

export default ClienteUpdate