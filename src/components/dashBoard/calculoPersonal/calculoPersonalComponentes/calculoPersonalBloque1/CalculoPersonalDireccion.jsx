

/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector } from 'react-redux'



//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalDireccion = () => {




    const direccion = useSelector(state => state.calculosPersonales.direccion)


    

    // Este efecto se ejecutar� cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aqu� actualizas el valor seleccionado del select seg�n el valor de 'cena'
        const selectElement = document.getElementById('direccionCalculo');
        if (selectElement) {
            selectElement.textContent = direccion;
        }
    }, [direccion]); // La dependencia del efecto es 'direccion'


    return (
        <div className="form-group col-md-12 "> 
            
            <p id="direccionCalculo" name="direccionCalculo">{direccion}</p>

        </div>
    )
}

export default CalculoPersonalDireccion