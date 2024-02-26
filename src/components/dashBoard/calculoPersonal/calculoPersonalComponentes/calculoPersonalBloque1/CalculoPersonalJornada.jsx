

/* eslint-disable react/prop-types */
//import { useSelector } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux';
import { setJornada } from '../../../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

//import { useState } from "react";
//import alertsuccess from '../../../../reutilizables/alertsuccess';





const CalculoPersonalJornada = () => {

    const dispatch = useDispatch();


    //const idCliente = useSelector(state => state.sucursales.idCliente)




    const handleJornadaChange = (event) => {

        dispatch(setJornada(event.target.value));

    }



    const jornada = useSelector(state => state.calculosPersonales.jornada)

    // Este efecto se ejecutará cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('jornadaCalculo');
        if (selectElement) {
            selectElement.value = jornada;
        }
    }, [jornada]); // La dependencia del efecto es 'jornada'

    return (
        <div className="form-group col-md-4 "> 
            <label htmlFor="jornadaCalculo">Jornada</label>

            <select id="jornadaCalculo" name="jornadaCalculo" onChange={handleJornadaChange}>
                <option value={0}>A CONFIRMAR</option>
                <option value={1}>MATUTINA</option>
                <option value={2}>DIURNA</option>
                <option value={3}>NOCTURNA</option>

            </select>
        </div>
    )
}

export default CalculoPersonalJornada