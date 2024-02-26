
/* eslint-disable no-unused-vars */
import React from 'react'

import UpdateSuc from './UpdateSuc'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { setFiltroSucursal, } from '../../../../features/sucursalesSlice'

import IrAlInicio from '../../../IrAlInicio'








const UpdateSucContenido = ({idSucursal}) => {

    const dispatch = useDispatch();

    const filtro = useSelector(state => state.clientes.filtro);




    //useEffect(() => {

    //    dispatch(setFiltroSucursal("")) FIJARSE QUE EL IDCLIENTE NO SEA CERO

    //}, [])

    return (


        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>
                        <IrAlInicio titulo="Modificar sucursales" descripcion="Modificacion de atributos de sucursal" />

                        {<UpdateSuc idSucursal={idSucursal}/>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdateSucContenido


