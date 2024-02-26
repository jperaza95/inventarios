
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

import { useDispatch } from 'react-redux';
import { updateUnaSucursal } from '../../../../features/sucursalesSlice';
//import { setSucursales, setIdCliente, setNombreCliente } from '../../../../features/sucursalesSlice';

import { useState } from "react";
import AlertSuccess from '../../../reutilizables/AlertSuccess';
import AlertDanger from '../../../reutilizables/AlertDanger';

import { updateUnaSucursalDeUnCliente } from "../../../../features/clientesSlice";



const SucursalUpdate = ({ idSucursal, numero, name, adress,ciudad, activo, inventarios }) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const [numeroUP, setNumeroUP] = useState(numero);
    const [nameUP, setNameUP] = useState(name);
    const [adressUP, setAdressUp] = useState(adress);
    const [activoUP, setActivoUP] = useState(activo);
    const [ciudadUP, setCiudadUP] = useState(ciudad);

    const handleNameChange = (event) => {
        setNameUP(event.target.value);
    }
    const handleNumeroChange = (event) => {
        setNumeroUP(event.target.value);
    }
    const handleActivoChange = (event) => {
        setActivoUP(event.target.checked);
    }
    const handleAdressChange = (event) => {
        setAdressUp(event.target.value);
    }
    const handleCiudadChange = (event) => {
        setCiudadUP(event.target.value);
    }





    const update = (IdSucursal) => {

        let objUpdate = {
            "idSucursal": IdSucursal,
            "numero": numeroUP,
            "name": nameUP,
            "adress": adressUP,

            "ciudad": ciudadUP,
            "activo": activoUP,
            "inventarios": inventarios


        } //Añadir a la url la idSucursal
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Sucursal/${idSucursal}`, {
            method: 'PUT',
            body: JSON.stringify(objUpdate),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    //dispatch(updateUnaSucursal({ id: IdSucursal, nuevaSucursal: json.o }));
                    dispatch(updateUnaSucursalDeUnCliente({ idSucursal: idSucursal, nuevaSucursal: json.o }));

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


    const verInventarios = (Inventarios) => {
        /*
                dispatch(setSucursales(Sucursales));
                dispatch(setIdCliente(IdCliente));
                dispatch(setNombreCliente(Name));
                */
        //falta el navigate al listado de sucursales
        navigate("/");
        return Inventarios
    }




    return (
        <>
            <table className="table table-striped">

                <thead>
                    <tr>
                        <th scope="col">Id Sucursal</th>
                        <th scope="col">Numero</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Ciudad</th>

                        <th scope="col">Activo</th>
                        <th scope="col">Modificar</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{idSucursal}</th>

                        <td><input type="text" id="numero" className="form-control" value={numeroUP} onChange={handleNumeroChange} /></td>

                        <td><input type="text" className="form-control" id="name" value={nameUP} onChange={handleNameChange} /></td>

                        <td><input type="text" className="form-control" id="adress" value={adressUP} onChange={handleAdressChange} /></td>

                        <td><input type="text" className="form-control" id="ciudad" value={ciudadUP} onChange={handleCiudadChange} /></td>

                        <td><div className="form-check">
                            <input className="form-check-input"
            type="checkbox"
            id="checkBoxSucActivo"
            value="activo"
            checked={activoUP}
            onChange={handleActivoChange} />

                        </div>
                        </td>


                        <td>
                            <input type="button" className="btn btn-outline-secondary" onClick={() => update(idSucursal)} value='Modificar' />
                        </td>
                    </tr>

                </tbody>




            </table>

            {error && <AlertDanger mensaje={message} />}
            {success && <AlertSuccess mensaje={message} />}

        </>
    )
}

export default SucursalUpdate