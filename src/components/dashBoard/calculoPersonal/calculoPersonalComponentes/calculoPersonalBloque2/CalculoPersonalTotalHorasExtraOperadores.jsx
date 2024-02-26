

/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'




//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalTotalHorasExtraOperadores = () => {

    

    const totalOperadoresParaConteo = useSelector(state => state.calculosPersonales.totalOperadoresParaConteo)
    const horasConteoDiurnoOp = totalOperadoresParaConteo * 1.5 // horas conteo Diurno

    const horasConteoPromedioXOperador = useSelector(state => state.calculosPersonales.horasConteoPromedioXOperador)
    const horasConteoNocturnoOp = (totalOperadoresParaConteo * horasConteoPromedioXOperador) - horasConteoDiurnoOp // Horas conteo Nocturno

    const horasExtrasDiurnasOp = useSelector(state => state.calculosPersonales.horasExtrasDiurnasOp) //Horas extra Diurnas
    const horasExtrasNocturnasOp = useSelector(state => state.calculosPersonales.horasExtrasNocturnasOp) //Horas extra Nocturnas

    const totalHorasOperadores = horasConteoDiurnoOp + horasConteoNocturnoOp + horasExtrasDiurnasOp + horasExtrasNocturnasOp //Total de horas


    const totalHorasOperadoresN = useSelector(state => state.calculosPersonales.totalHorasOperadores)


    // Este efecto se ejecutará cada vez que el valor de 'totalHorasOperadoresN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('totalHorasOperadoresCalculo');
        if (selectElement) {
            selectElement.textContent = totalHorasOperadoresN;
        }
    }, [totalHorasOperadoresN]); // La dependencia del efecto es 'totalHorasOperadoresN'


    return (
        <div className="form-group col-md-12 "> 
            <label htmlFor="totalHorasOperadoresCalculo">Total de horas operadores</label>
            <p id="totalHorasOperadoresCalculo" name="totalHorasOperadoresCalculo">{totalHorasOperadores}</p>

        </div>
    )
}

export default CalculoPersonalTotalHorasExtraOperadores