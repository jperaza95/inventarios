

/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'




//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalHorasConteoDiurnoOperadores = () => {




    const totalOperadoresParaConteo = useSelector(state => state.calculosPersonales.totalOperadoresParaConteo)
    const horasConteoDiurnoOp = totalOperadoresParaConteo * 1.5
    



    const horasConteoDiurnoOpN = useSelector(state => state.calculosPersonales.horasConteoDiurnoOp)


    // Este efecto se ejecutará cada vez que el valor de 'horasConteoDiurnoOpN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasConteoDiurnoOperadoresCalculo');
        if (selectElement) {
            selectElement.textContent = horasConteoDiurnoOpN;
        }
    }, [horasConteoDiurnoOpN]); // La dependencia del efecto es 'horasConteoDiurnoOpN'
    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="horasConteoDiurnoOperadoresCalculo">Horas conteo diurno operadores</label>
            <p id="horasConteoDiurnoOperadoresCalculo" name="horasConteoDiurnoOperadoresCalculo">{horasConteoDiurnoOp}</p>

        </div>
    )
}

export default CalculoPersonalHorasConteoDiurnoOperadores