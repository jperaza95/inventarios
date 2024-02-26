
/* eslint-disable no-unused-vars */
import React from 'react'

import UpdateSuc from './UpdateSuc'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'



import FiltroNombreArea from './FiltroNombreArea'
import IrAlInicio from '../../../IrAlInicio'








const UpdateAreaContenido = () => {

    const dispatch = useDispatch();

    const filtro = useSelector(state => state.clientes.filtro)




    //useEffect(() => {

    //    FIJARSE QUE EL IDCLIENTE NO SEA CERO

    //}, [])

    return (


        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>
                        <IrAlInicio titulo="Modificar areas" descripcion="Modificacion de atributos de area" />
                        <FiltroNombreArea />
                        {<UpdateSuc />
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdateAreaContenido


