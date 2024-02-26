

/* eslint-disable react/prop-types */
//import { useSelector } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux';
import { setTransporte } from '../../../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

//import { useState } from "react";
//import alertsuccess from '../../../../reutilizables/alertsuccess';





const CalculoPersonalTransporte = () => {

    const dispatch = useDispatch();


    //const idCliente = useSelector(state => state.sucursales.idCliente)




    const handleTransporteChange = (event) => {

        dispatch(setTransporte(event.target.value));

    }



    const transporte = useSelector(state => state.calculosPersonales.transporte)


    // Este efecto se ejecutará cada vez que el valor de 'transporte' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('transporteCalculo');
        if (selectElement) {
            selectElement.value = transporte;
        }
    }, [transporte]); // La dependencia del efecto es 'transporte'

    return (
        <div className="form-group col-md-4 ">
            <label htmlFor="transporteCalculo">Transporte</label>
            
            <select id="transporteCalculo" name="transporteCalculo" onChange={handleTransporteChange}>
                <option value={0}>A CONFIRMAR</option>
                <option value={1}>SI</option>
                <option value={2}>NO</option>
            </select>
        </div>
    )
}

export default CalculoPersonalTransporte