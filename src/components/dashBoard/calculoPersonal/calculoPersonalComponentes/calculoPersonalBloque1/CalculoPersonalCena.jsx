

/* eslint-disable react/prop-types */
//import { useSelector } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux';
import { setCena } from '../../../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

//import { useState } from "react";
//import alertsuccess from '../../../../reutilizables/alertsuccess';





const CalculoPersonalCena = () => {

    const dispatch = useDispatch();


    const cena = useSelector(state => state.calculosPersonales.cena)




    const handleCenaChange = (event) => {

        dispatch(setCena(event.target.value));

    }
    


    // Este efecto se ejecutará cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('cenaCalculo');
        if (selectElement) {
            selectElement.value = cena;
        }
    }, [cena]); // La dependencia del efecto es 'cena'

    return (
        <div className="form-group col-md-4 "> 
            <label htmlFor="cenaCalculo">Cena</label>

            <select id="cenaCalculo" name="cenaCalculo" onChange={handleCenaChange}>
                <option value={0}>A CONFIRMAR</option>
                <option value={1}>SI</option>
                <option value={2}>NO</option>
                

            </select>
        </div>
    )
}

export default CalculoPersonalCena