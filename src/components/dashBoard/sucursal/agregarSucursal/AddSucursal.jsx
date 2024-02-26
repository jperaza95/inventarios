
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';
import { agregarUnaSucursal } from '../../../../features/sucursalesSlice';
import { agregarSucursalAlCliente, updateSucursalesDeUnCliente } from '../../../../features/clientesSlice';
import { useState } from "react";

import MiModal from '../../../MiModal';
import { useRef } from 'react';

const AddSucursal = ({ idCliente, setExito, setError, setMessage }) => {

    const dispatch = useDispatch();


    //const idCliente = useSelector(state => state.sucursales.idCliente);
    const clientes = useSelector(state => state.clientes.clientes);

    const clienteEncontrado = clientes.find(cliente => cliente.idCliente === parseInt(idCliente));

  
    //const nombreCliente = useSelector(state => state.sucursales.nombreCliente);
    const sucursales = useSelector(state => state.sucursales.sucursales);




    

    const [numeroUP, setNumeroUP] = useState(0);
    const [nameUP, setNameUP] = useState("");
    const [adressUP, setAdressUp] = useState("")
    const [activoUP, setActivoUP] = useState(true)
    const [ciudadUP, setCiudadUP] = useState("")

    const numero = useRef(null);
    const nombre = useRef(null);
    const adress = useRef(null);
    const ciudad = useRef(null);



    const handleNameChange = (event) => {
        setNameUP(event.target.value);
    }
    const handleNumeroChange = (event) => {
        setNumeroUP(event.target.value);
    }
    const handleActivoChange = () => {
        setActivoUP(!activoUP);
    }
    const handleAdressChange = (event) => {
        setAdressUp(event.target.value);
    }

    const handleCiudadChange = (event) => {
        setCiudadUP(event.target.value);
    }


    //useEffect(() => {
    //    dispatch(updateSucursalesDeUnCliente({ id:idCliente, nuevasSucursales : sucursales }));
    //    console.log("sucursales: ", sucursales);

    //}, [sucursales]); 



    const add = () => {

        let objAdd = {

            "numero": numeroUP,
            "name": nameUP,
            "adress": adressUP,
            "ciudad": ciudadUP,
            "activo": activoUP,
            "clienteId": idCliente


        }
        console.log(objAdd); 
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Sucursal`, {
            method: 'POST',
            body: JSON.stringify(objAdd),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    console.log(json.o);

                    dispatch(agregarUnaSucursal(json.o));
                    dispatch(agregarSucursalAlCliente({ idCliente, nuevaSucursal: json.o }));

                    setError(false);
                    setExito(true);
                    setMessage(json.mensaje);
                    limpiarCampos();

                } else {
                    setExito(false);
                    setError(true);
                    setMessage(json.mensaje);
                }


            });

    }

    const existeError = () => {
        
        if (vacioOnull(numero) || vacioOnull(nombre) || vacioOnull(adress) || vacioOnull(ciudad)) {
            setError(true);
            return true;
        }

    }

    const vacioOnull = (valor) => valor.current.value === null || valor.current.value === ""; 


    const limpiarCampos = () => {

        setNumeroUP(0);
        setNameUP("");
        setAdressUp("");
        setCiudadUP("");
    }



    const mostrarDatosFormulario = () => {

        return {
            "Numero de la sucursal": numero.current.value,
            "Nombre": nombre.current.value,
            "Dirección": adress.current.value,
            "Ciudad": ciudad.current.value
        }
    }

    

    return (

        <>
            <div className="col-12">
                <h1>Registrar sucursal</h1>
                <p>Agregar una sucursal al cliente {clienteEncontrado && clienteEncontrado.idCliente} : {clienteEncontrado &&clienteEncontrado.name}</p>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Numero</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Activo</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>


                <tbody>
                    <tr>
                        <td>
                            <input ref={numero} type="number" min="0" id="numero" className="form-control" value={numeroUP} onChange={handleNumeroChange} />
                        </td>
                        <td>
                            <input ref={nombre} type="text" id="name" className="form-control" value={nameUP} onChange={handleNameChange} />
                        </td>
                        <td>
                            <input ref={adress} type="text" id="adress" className="form-control" value={adressUP} onChange={handleAdressChange} />
                        </td>
                        <td>
                            <input ref={ciudad} type="text" id="ciudad" className="form-control" value={ciudadUP} onChange={handleCiudadChange} />

                        </td>

                        <td>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="checkBoxSucActivo" value="activo" checked={activoUP} onChange={handleActivoChange} />

                            </div>

                        </td>



                        <td>
                            {/*<input type="button" className="btn btn-outline-primary" onClick={() => add()} value='Agregar' />*/}

                            <MiModal
                                tipoBoton="button"
                                title="Agregar"
                                onSave={add}
                                error={existeError}
                                body="¿Desea agregar la sucursal?"
                                setExito={setExito}
                                mostrarDatosFormulario={mostrarDatosFormulario}

                            />
                        </td>

                    </tr>

                </tbody>

            </table>

            


        </>
    )
}

export default AddSucursal