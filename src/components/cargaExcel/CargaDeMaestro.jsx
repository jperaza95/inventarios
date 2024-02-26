import React, { useRef, useState } from 'react';
import IrAlInicio from '../IrAlInicio';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';

import AlertDanger from '../reutilizables/AlertDanger';
import AlertSuccess from '../reutilizables/AlertSuccess';

import { agregarMaestroAInventario } from '../../features/inventariosSlice';

import { agregarMaestroAInventarioYSucursal } from '../../features/sucursalesSlice';


function CargaDeMaestro() {

    const file = useRef(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const idInventario = useSelector(state => state.inventarios.idInventario);

    //--------------------------------------------------------------------------------------------------------------
    const { idInventario } = useParams();

    const inventarios = useSelector((state) => state.inventarios.inventarios);

    const inventarioExistente = inventarios.some((inventario) => inventario.idInventario === parseInt(idInventario));

    //--------------------------------------------------------------------------------------------------------------

    const subirExcel = () => {
        const selectedFile = file.current.files[0];

        if (!selectedFile) {
            setMessage("Selecciona un archivo antes de intentar subirlo.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('idInventario', idInventario);


        let requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        console.log(requestOptions);
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/CargarMaestro`, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.codigo === 200) {
                    setError(false);
                    setSuccess(true);
                    setMessage(result.mensaje);
                    dispatch(agregarMaestroAInventario({ idInventario, nuevoMaestro: result.o })); 
                    dispatch(agregarMaestroAInventarioYSucursal({ idInventario, nuevoMaestro: result.o })); 
                    console.log(result);

                    setTimeout(() => { //espera 2 segundos y redirige
                        navigate(`/vermaestro/${idInventario}`);
                    }, 2000);
                } else {
                    console.log(result);
                    setSuccess(false);
                    setError(true);
                    setMessage(result.mensaje);
                }


            })
            .catch(error => {
                setError(true);
                setSuccess(false);

                console.log(error);
                console.log('error', error);
            });
    }


    return (
        <>
            {inventarioExistente ? (
                <div className="container mt-5">
                    <div className='form-row justify-content-center'>
                        <div className='form-group col-md-10'>
                            <IrAlInicio titulo="Importar maestro" />
                            <hr></hr>
                            <div className='form-row'>
                                <label htmlFor="formFile" className="form-label">Carga de archivo maestro, inventario {idInventario}</label>
                                <input className="form-control" type="file" id="formFile" ref={file} />
                            </div>
                            <div className="form-group col-md-8 "><input type="button" className="btn btn-primary mt-4" value="Agregar" onClick={subirExcel} /></div>
                            {error && !success && <AlertDanger mensaje={message} />}
                            {success && !error && <AlertSuccess mensaje={message} />}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mt-5">
                    <div className='form-row justify-content-center'>
                        <div className='form-group col-md-10'>
                            <p>El inventario con ID {idInventario} no existe.</p>
                        </div>
                    </div>

                    </div>


            )}
        </>
    );
}

export default CargaDeMaestro;