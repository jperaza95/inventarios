

/* eslint-disable react/prop-types */
//import { useSelector } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux';
import { setDuracion } from '../../../../../features/calculosPersonalesSlice';

//import { useState } from "react";
//import alertsuccess from '../../../../reutilizables/alertsuccess';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useState } from 'react';
import { useEffect } from 'react';




const CalculoPersonalDuracion = () => {

    const dispatch = useDispatch();


    //const idCliente = useSelector(state => state.sucursales.idCliente)


    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")


    const handleDuracionChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setDuracion(event.target.value));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    }


    const duracion = useSelector(state => state.calculosPersonales.duracion)


    // Este efecto se ejecutará cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('duracionCalculo');
        if (selectElement) {
            selectElement.value = duracion;
        }
    }, [duracion]); // La dependencia del efecto es 'duracion'



    return (
        <div className="form-group col-md-12 "> 
            <label htmlFor="duracionCalculo">Duracion</label>
            <input type="number" id="duracionCalculo" name="duracionCalculo" step="0.01" // Permitir decimales
                onChange={handleDuracionChange} min="0"/>
            {error && <AlertDanger mensaje={message} />}
        </div>
    )
}

export default CalculoPersonalDuracion