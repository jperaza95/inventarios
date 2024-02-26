/* eslint-disable no-unused-vars */
import React from 'react'
import FiltroNombreCli from '../listadoClientes/FiltroNombreCli'
import UpdateClientes from './UpdateClientes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFiltro, } from '../../../../features/clientesSlice'
import IrAlInicio from '../../../IrAlInicio'




const ListadoCliContenido = ({cliente}) => {

    const dispatch = useDispatch();

    const filtro = useSelector(state => state.clientes.filtro)




    useEffect(() => {

        //fijarse que el listado de clientes no este vacia

    }, [])

    return (

        < div className="container mt-5" >
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>
                        {/*Consultar si usamos FiltroNombreCli*/}
                        <IrAlInicio titulo={"Modificar clientes"} descripcion="Modificacion de atributos del cliente"/>
{/*                        <FiltroNombreCli />*/}
                        <UpdateClientes cliente={cliente} />

                    </div>
                </div>
            </div>
        </div >

    )
}

export default ListadoCliContenido