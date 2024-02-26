

/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector } from 'react-redux'



//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalCiudad = () => {

   


    const ciudad = useSelector(state => state.calculosPersonales.ciudad)


    // Este efecto se ejecutará cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('ciudadCalculo');
        if (selectElement) {
            selectElement.textContent = ciudad;
        }
    }, [ciudad]); // La dependencia del efecto es 'cena'

    return (
        <div className="form-group col-md-12 "> 
            <p id="ciudadCalculo" name="ciudadCalculo">{ciudad}</p>
            
        </div>
    )
}

export default CalculoPersonalCiudad