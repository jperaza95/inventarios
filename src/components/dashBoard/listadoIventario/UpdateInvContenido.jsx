/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateInventarios from './UpdateInventarios';
import IrAlInicio from '../../IrAlInicio';


const UpdateInvContenido = ({ inventario }) => {
    
    const dispatch = useDispatch();

    //const filtro = useSelector(state => state.clientes.filtro)

    return (

        < div className="container mt-5" >
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>

                        <IrAlInicio titulo={"Modificar inventario"} descripcion="Modificacion de atributos del inventario" />

                        <UpdateInventarios inventario={inventario} />

                    </div>
                </div>
            </div>
        </div >

    )
}

export default UpdateInvContenido