/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';
import { agregarUnArea } from '../../../../features/areasSlice';

import { useEffect, useState,useRef } from "react";
import AlertSuccess from '../../../reutilizables/AlertSuccess';
import AlertDanger from '../../../reutilizables/AlertDanger';
import { modificarAreasInventario } from '../../../../features/inventariosSlice';
import MiModal from '../../../MiModal';




const AddArea = ({ idInventario, setSuccess, setError, setMessage }) => {


    const dispatch = useDispatch();


    const nombreCliente = useSelector(state => state.areas.nombreCliente);

    //const idInventario = useSelector(state => state.areas.idInventario);
    const areas = useSelector(state => state.areas.areas);



    const [nameUP, setNameUP] = useState("");
    const [desde, setDesde] = useState(0);
    const [hasta, setHasta] = useState(0);

    const nombreref = useRef(null);
    const desderef = useRef(null);
    const hastaref = useRef(null);



    const handleNameChange = (event) => {
        setNameUP(event.target.value);
    }


    const handleDesde = (event) => {
        setDesde(event.target.value);
        validarDesdeHasta();
    }
    const handleHasta = (event) => {
        setHasta(event.target.value);
        validarDesdeHasta();
    }

    const validarDesdeHasta = () => {
        const valorDesde = parseInt(desde, 10); //base 10
        const valorHasta = parseInt(hasta, 10);
        console.log(valorDesde, " - ", valorHasta);
        if (isNaN(valorDesde) || isNaN(valorHasta) || valorDesde > valorHasta) {
            setSuccess(false);
            setError(true);
            setMessage('"Desde" debe ser menor o igual que "Hasta".');
        } else {
            setMessage('');

            setError(false);

        }
    }

    const existeError = () => {

        if (vacioOnull(desderef) || vacioOnull(hastaref) || vacioOnull(nombreref)) {
            setError(true);
            return true;
        }

    }

    const vacioOnull = (valor) => valor.current.value === null || valor.current.value === ""; 


    const add = () => {

        let objAdd = {

            "name": nameUP,
            "idInventario": idInventario,

            "areaDesde": desde,
            "areaHasta":hasta

        }

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Area/AgregarRango`, {

            method: 'POST',
            body: JSON.stringify(objAdd),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {

                    //dispatch(agregarUnArea(json.o));
                    //dispatch(agregarUnAreaAInventario({ id: idInventario, nuevaArea: json.o }));
                    console.log(json);

                    dispatch(agregarUnArea(json.o));
                    dispatch(modificarAreasInventario({ id: idInventario, nuevasAreas: json.o }));

                    setError(false);
                    setSuccess(true);
                    setMessage(json.mensaje);
                    limpiarCampos();

                } else {
                    setSuccess(false);
                    setError(true);
                    setMessage(json.mensaje);
                }


            });

    }


    const limpiarCampos = () => {


        setNameUP("");

    }


    const mostrarDatosFormulario = () => {

        return {

            "Rango de áreas": "",

            "Desde": desderef.current.value,
            "Hasta": hastaref.current.value,


        }
    }





    return (



        <>
            <div className="col-12">
                <h1>Registrar &aacute;reas</h1>
                <p>Agregar un rango de &aacute;reas al inventario {idInventario}</p>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>

                        <th scope="col">Desde</th>
                        <th scope="col">Hasta</th>
                        <th scope="col">Acci&oacute;n</th>

                    </tr>
                </thead>


                <tbody>
                    <tr>

                        <td>

                            <input type="text" id="name" className="form-control" value={nameUP} onChange={handleNameChange} ref={nombreref} />
                        </td>

                        <td>
                            <input type="number" id="desde" className="form-control" value={desde} onChange={handleDesde} onBlur={validarDesdeHasta} min={0} ref={desderef} />
                        </td>

                        <td>
                        {/*onBlur se ejecuta luego de que el campo pierde el foco*/}
                            <input type="number" id="hasta" className="form-control" value={hasta} onChange={handleHasta} onBlur={validarDesdeHasta} min={0} ref={hastaref} />
                        </td>

                        <td>
                          
                            <MiModal
                                tipoBoton="button"
                                title="Agregar"
                                onSave={add}
                                error={existeError}
                                body="¿Desea agregar las areas?"
                                setExito={setSuccess}
                                mostrarDatosFormulario={mostrarDatosFormulario}

                            />

                        </td>



                    </tr>

                </tbody>

            </table>

        </>
    )
}

    export default AddArea