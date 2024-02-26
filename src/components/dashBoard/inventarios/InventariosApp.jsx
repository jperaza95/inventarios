import { useRef, useState} from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import IrAlInicio from '../../IrAlInicio';
import AlertDanger from '../../reutilizables/AlertDanger';
import AlertSuccess from '../../reutilizables/AlertSuccess';
import CalculoPersonalSucursal from "../calculoPersonal/calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalSucursal"
import CalculoPersonalCliente from "../calculoPersonal/calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalCliente"


import { Button } from 'react-bootstrap';
import { updateInventariosDeUnaSucursalDeUnCliente } from '../../../features/clientesSlice';
import { agregarUnInventario } from '../../../features/inventariosSlice';
import InventarioCliente from './InventarioCliente';
import InventarioSucursal from './InventarioSucursal';    
import { useParams } from 'react-router-dom';
import { updateInventariosDeUnaSucursal } from '../../../features/sucursalesSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function InventariosApp() {
    const nombre = useRef(null);
/*    const fecha = useRef(null);*/

    //const [mensajeApi, setMensajeApi] = useState("");
    const [errorInventario, setErrorInventario] = useState(false);
    const [mensajeApi, setMensajeApi] = useState("");
    const [exito, setExito] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

    const handleChangeFecha = date => {
        setFechaSeleccionada(date);
    };




    const { idSucursal } = useParams();


    const dispatch = useDispatch();


    const hayError = () => errorInventario;

    const mostrarError = () => {
        if (errorInventario) {
            return "Completar todos los campos";
        }
    }

    const limpiarCampos = () => {
        document.querySelector("#inputNombre").value = "";
        document.querySelector("#inputFecha").value = "";
    }

    const nuevoInventario = () => {


        if (!existeError()) {
            console.log("fecha seleccionada ",fechaSeleccionada);
            let objInventario = {
                "nombreInventario": nombre.current.value,
                //"dateInventario": fecha.current.value,
                "dateInventario": fechaSeleccionada,
                "idSucursal": idSucursal
            }


            let requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objInventario),
                redirect: 'follow'
            };

            fetch("https://inventarioswebapi1.azurewebsites.net/api/Inventario", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log("objinventario: ", objInventario);
                    console.log(result);

                    dispatch(agregarUnInventario(result.o));    
                    
                    //dispatch(updateInventariosDeUnaSucursalDeUnCliente({ idCliente: idCliente, idSucursal: idSucursal, nuevosInventarios: listaInventarios })); //REVISAR

                    dispatch(updateInventariosDeUnaSucursal({ id: idSucursal, nuevoInventario: result.o })); //REVISAR



                    //actualizarSucursalInventarios(result.o);

                    setExito(true);
                    setMensajeApi(result.mensaje);
                    limpiarCampos();


                })
                .catch(error => console.log('error', error));
        }
    }


    const existeError = () => {

        if (nombre.current.value === null || nombre.current.value == "" || fechaSeleccionada === null || fechaSeleccionada == "") {
            setErrorInventario(true);
            return true;
        }

    }

    return (
        <div className="container mt-5 componente">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>


                        <IrAlInicio titulo={"Agregar Inventario"} descripcion="Formulario para registro de inventario"></IrAlInicio>


                        <div className="form-group col-md-8 mt-4" >
                            <label htmlFor="inputNombre">Nombre</label>
                            <input ref={nombre} type="text" className="form-control" id="inputNombre" placeholder="Nombre del inventario" />
                        </div>

                        <div className="form-group col-md-8 mt-4" >
                            <label htmlFor="inputFecha">Fecha</label>
                            <DatePicker
                                selected={fechaSeleccionada}
                                onChange={handleChangeFecha}
                                dateFormat="dd/MM/yyyy"
                                showTimeInput={false} // Desactiva la selección de hora
                                className="form-control"
                                id="inputFecha"
                            />

                            {/*<input ref={fecha} type="datetime-local" className="form-control" id="inputFecha" />*/}

                        </div>

                        <InventarioCliente idSucursal={idSucursal} />
                        <InventarioSucursal idSucursal = {idSucursal} />


                        <div className="form-group col-md-8 mt-4" >
                        {(hayError()) && <AlertDanger mensaje={mostrarError()} />}
                        {exito && !hayError() && <AlertSuccess mensaje={mensajeApi} />}

                        </div>




                        <div className="form-group col-md-8 mt-4" >
                            <Button variant="primary" onClick={() => nuevoInventario()} >
                                Confirmar
                            </Button>
                        </div>


                    </div>

                </div>

            </div>

        </div>


    );
}

export default InventariosApp;