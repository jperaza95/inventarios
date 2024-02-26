

/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'



//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalHorasConteoNocturnoOperadores = () => {




    const totalOperadoresParaConteo = useSelector(state => state.calculosPersonales.totalOperadoresParaConteo)
    const horasConteoDiurnoOp = totalOperadoresParaConteo * 1.5
    const horasConteoPromedioXOperador = useSelector(state => state.calculosPersonales.horasConteoPromedioXOperador)

    const horasConteoNocturnoOp = (totalOperadoresParaConteo * horasConteoPromedioXOperador) - horasConteoDiurnoOp


    const horasConteoNocturnoOpN = useSelector(state => state.calculosPersonales.horasConteoNocturnoOp)


    // Este efecto se ejecutará cada vez que el valor de 'horasConteoNocturnoOpN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasConteoNocturnoOperadoresCalculo');
        if (selectElement) {
            selectElement.textContent = horasConteoNocturnoOpN;
        }
    }, [horasConteoNocturnoOpN]); // La dependencia del efecto es 'horasConteoNocturnoOpN'

    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="horasConteoNocturnoOperadoresCalculo">Horas conteo nocturno operadores</label>
            <p id="horasConteoNocturnoOperadoresCalculo" name="horasConteoNocturnoOperadoresCalculo">{horasConteoNocturnoOp}</p>

        </div>
    )
}

export default CalculoPersonalHorasConteoNocturnoOperadores