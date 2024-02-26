/* eslint-disable no-unused-vars */
import React from 'react'

import ListadoSuc from './ListadoSuc'
import { useDispatch, useSelector } from 'react-redux'
import { setFiltroSucursal, } from '../../../../features/sucursalesSlice'
import FiltroNombreSuc from '../updateSucursal/FiltroNombreSuc'
import AddSucursal from '../agregarSucursal/addSucursal'
import IrAlInicio from '../../../IrAlInicio'
import Sucursal from './Sucursal'
import { setIdCliente } from '../../../../features/sucursalesSlice'; 
import { setSucursales } from '../../../../features/sucursalesSlice'
import { useState } from 'react'
import AlertSuccess from '../../../reutilizables/AlertSuccess'
import AlertDanger from '../../../reutilizables/AlertDanger'



const ListadoSucContenido = ({ idCliente }) => {

    const dispatch = useDispatch();

    const filtro = useSelector(state => state.clientes.filtro);

    const [exito, setExito] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    //
    //const sucursales = useSelector(state => state.sucursales.sucursales)
    const filterValue = useSelector(state => state.sucursales.filtroSucursal)

    const clientes = useSelector((state) => state.clientes.clientes);
    console.log(clientes);  

    const clienteEncontrado = clientes.find(cliente => cliente.idCliente === parseInt(idCliente));
    console.log(clienteEncontrado);  

    let sucursalesDelCliente = [];

    if (clienteEncontrado) {

        //el setId es para saber de que cleinte son las sucursales en update / add
        //dispatch(setIdCliente(idCliente));
        sucursalesDelCliente = clienteEncontrado.sucursales;
        //console.log(sucursalesDelCliente);
        
    }


    return (
        <>
            {
                //exito && <div className="alert alert-success col-md p-2 text-center" role="alert" id="EliminarClienteExitoso">
                //Eliminado correctamente
                //</div>
                        }
            
        

        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>

                                
                        <IrAlInicio titulo="Sucursales" descripcion={`Listado de sucursales del cliente ${clienteEncontrado && clienteEncontrado.name}`} />

                        <FiltroNombreSuc />


                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th scope="col">Id Suc</th>
                                    <th scope="col">Numero</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Ciudad</th>
                                    <th scope="col">Activo</th>
                                    <th scope="col">Inventarios</th>
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>

                                </tr>
                            </thead>
                            <tbody>

                                {sucursalesDelCliente.filter(sucursal => {
                                    // Verificar si el nombre del cliente contiene el valor del filtro
                                    // Usamos toLowerCase() para hacer la comparación insensible a mayúsculas y minúsculas
                                    return sucursal && sucursal.name.toLowerCase().includes(filterValue.toLowerCase());
                                }).map(sucursal => <Sucursal key={sucursal.idSucursal} {...sucursal} setExito={setExito} setError={setError} setMessage={setMessage} />)
                                }

                            </tbody>



                        </table>
                            <AddSucursal idCliente={idCliente} setExito={setExito} setError={setError} setMessage={setMessage} />
                            {
                                exito && <AlertSuccess mensaje={message} />

                            }
                            {
                                error && <AlertDanger mensaje={message} />
                            }
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}

export default ListadoSucContenido