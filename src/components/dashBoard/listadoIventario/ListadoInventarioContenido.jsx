/* eslint-disable no-unused-vars */
import React from 'react'
import ListadoInventarios from './ListadoInventarios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IrAlInicio from '../../IrAlInicio'
import BotonAddInventario from '../listadoIventario/BotonAddInventario'



const ListadoInventarioContenido = ({idSucursal}) => {

    const dispatch = useDispatch();

    const filtro = useSelector(state => state.clientes.filtro);

    //const idSucursal = useSelector(state => state.inventarios.idSucursal);

    const sucursales = useSelector(state => state.sucursales.sucursales);
    console.log(sucursales);
    const sucursalEncontrada = sucursales.find(sucursal => sucursal.idSucursal === parseInt(idSucursal));
    console.log("sucursalEncontrada", sucursalEncontrada);


    let inventariosDeLaSucursal = [];

    if (sucursalEncontrada) {

        //el setId es para saber de que cleinte son las sucursales en update / add
        //dispatch(setIdSucursal(idSucursal));
        console.log("sucursalEncontrada.inventarios ",sucursalEncontrada.inventarios );
        inventariosDeLaSucursal = sucursalEncontrada.inventarios;
    }

    //useEffect(() => {

    //    dispatch(setFiltro(""))

    //}, [])

    useEffect(() => {

        //fijarse que el listado de clientes no este vacia

    }, [])

    return (
        <div className="container mt-5 componente">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>



                        <IrAlInicio titulo="Inventarios" descripcion={`Listado de inventarios, sucursal: ${idSucursal}`} />

                        <BotonAddInventario idSucursal={idSucursal} />
                        
                        {inventariosDeLaSucursal.length > 0 ? (<ListadoInventarios inventarios={inventariosDeLaSucursal}/>) :
                        (<label>{`La sucursal ${idSucursal} no tiene inventarios`} </label>)
                        }
                            

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ListadoInventarioContenido