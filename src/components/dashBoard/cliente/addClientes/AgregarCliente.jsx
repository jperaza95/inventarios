import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregarMovimiento } from '../../../../features/movimientosSlice';
import MiModal from '../../../MiModal';
import IrAlInicio from '../../../IrAlInicio';
import { useOutletContext } from "react-router-dom";


const AgregarCliente = ({ tipo }) => {


    //Errores:
    const [errorCliente, setErrorCliente] = useState(false);

    const nombre = useRef(null);
    const rubro = useRef(null);
    const tipoempresa = useRef(null);
    const [mensajeApi, setMensajeApi] = useState("");

    
    const [exito, setExito] = useState(false);

    const dispatch = useDispatch();

    const [cargarClientes] = useOutletContext();


    const existeError = () => {

        if (nombre.current.value === null || nombre.current.value == "" || rubro.current.value === null || rubro.current.value == "" || tipoempresa.current.value === null || tipoempresa.current.value == "") {
            setErrorCliente(true);
            return true;
        }

    }



    const nuevoMovimiento = () => {


        if (!existeError()) {

            let objCliente = {
                "name": nombre.current.value,
                "rubro": rubro.current.value,
                "tipoEmpresa": tipoempresa.current.value,
                "activo": true
            }


            let requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objCliente),
                redirect: 'follow'
            };

            fetch("https://inventarioswebapi1.azurewebsites.net/api/Cliente", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(objCliente);
                    console.log(result);
                    dispatch(agregarMovimiento(result));
                    //limpia el rubro seleccionado
                    //dispatch(seleccionarRubro(-1));
                    cargarClientes();
                    setExito(true);
                    setMensajeApi(result.mensaje); 
                    limpiarCampos();
                    

                })
                .catch(error => console.log('error', error));
        }
    }



    const limpiarCampos = () => {
        document.querySelector("#inputNombre").value = "";
        document.querySelector("#inputRubro").value = "";
        document.querySelector("#inputTipoEmpresa").value = "";
    }


    const hayError = () => errorCliente;



    const mostrarError = () => {
        if (errorCliente) {
            return "Completar todos los campos";
        }




    }

    const mostrarDatosFormulario = () => {

        return {
            "Nombre de la empresa": nombre.current.value,
            "Rubro": rubro.current.value,
            "Tipo de empresa": tipoempresa.current.value
        }



    }



    return (


            <div className="container mt-5 componente">
                <div className='form-row justify-content-center'>
                    <div className='form-group col-md-10'>
                        <div className='form-row'>

                        <IrAlInicio titulo={"Agregar Cliente"} descripcion="Formulario para registro de clientes"></IrAlInicio>


                        <div className="form-group col-md-8 mt-4" >
                            <label htmlFor="inputNombre">Nombre</label>
                            <input ref={nombre} type="text" className="form-control" id="inputNombre" placeholder="Nombre del cliente" />
                        </div>

                        <div className="form-group col-md-8 mt-4" >
                            <label htmlFor="inputRubro">Rubro</label>
                            <input ref={rubro} type="text" className="form-control" id="inputRubro" placeholder="Rubro del cliente" />
                        </div>

                        <div className="form-group col-md-8 mt-4" >
                            <label htmlFor="inputTipoEmpresa">Tipo de empresa</label>
                            <input ref={tipoempresa} type="text" className="form-control" id="inputTipoEmpresa" placeholder="Tipo de empresa" />
                        </div>

                       {/*EVALUAR AGREGAR TIPOS DE EMPRESA Y RUBROS DESDE UN DESPLEGABLE*/}



                        {(hayError()) && <div className="alert alert-danger col-md-8 p-2" role="alert" data-aria-autofocus="true">
                            {mostrarError()}
                        </div>
                        }

                        {exito && !hayError() && <div className="alert alert-success col-md-8 p-2" role="alert" id="clienteExitoso">
                            {mensajeApi}
                        </div>}

                        <div className="form-group col-md-8 " >

                            <MiModal
                                tipoBoton="button"
                                title="Agregar"
                                onSave={nuevoMovimiento}
                                error={existeError}
                                body="¿Desea agregar el cliente?"
                                setExito={setExito}
                                mostrarDatosFormulario={mostrarDatosFormulario}

                            />

                        </div>
                        </div>
                    </div>
                </div>
            </div>






    )
}



export default AgregarCliente