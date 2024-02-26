

/* eslint-disable react/prop-types */
//import { useSelector } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux';
import { setHorasMapD } from '../../../../../features/calculosPersonalesSlice';

//import { useState } from "react";
//import alertsuccess from '../../../../reutilizables/alertsuccess';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useEffect, useState } from 'react';




const CalculoPersonalHorasMapeoDiurno = () => {

    const dispatch = useDispatch();
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")


    const handleHorasMapeoDChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasMapD(event.target.value));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    }

    const horasMapD = useSelector(state => state.calculosPersonales.horasMapD)


    // Este efecto se ejecutará cada vez que el valor de 'horasMapD' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('HMapeoDCalculo');
        if (selectElement) {
            selectElement.value = horasMapD;
        }
    }, [horasMapD]); // La dependencia del efecto es 'horasMapD'



    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="HMapeoDCalculo">Horas mapeo diurno</label>
            <input type="number" id="HMapeoDCalculo" name="HMapeoDCalculo"
                step="0.01" // Permitir decimales
                onChange={handleHorasMapeoDChange} />
            {error && <AlertDanger mensaje={message} />}
        </div>
    )
}

export default CalculoPersonalHorasMapeoDiurno