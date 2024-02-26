/* eslint-disable no-unused-vars */
import React from 'react'
import FiltroNombreCli from './FiltroNombreCli'
import ListadoClientes from './ListadoClientes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFiltro, } from '../../../../features/clientesSlice'
import IrAlInicio from '../../../IrAlInicio'



const ListadoCliContenido = () => {

    const dispatch = useDispatch();

    const filtro = useSelector(state => state.clientes.filtro)
    

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

                        <IrAlInicio titulo="Clientes" descripcion="Listado de clientes" />
                        <FiltroNombreCli />
                        {<ListadoClientes />
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ListadoCliContenido