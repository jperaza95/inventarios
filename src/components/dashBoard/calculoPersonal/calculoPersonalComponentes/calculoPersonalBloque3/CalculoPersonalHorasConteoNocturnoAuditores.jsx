

/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'



//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalHorasConteoNocturnoAuditores = () => {




    const auditores = useSelector(state => state.calculosPersonales.auditores)
    const horasConteoDiurnoAud = auditores * 1.5
    const horasConteoPromedioXOperador = useSelector(state => state.calculosPersonales.horasConteoPromedioXOperador)

    const horasConteoNocturnoAud = (auditores * horasConteoPromedioXOperador) - horasConteoDiurnoAud


    const horasConteoNocturnoAudN = useSelector(state => state.calculosPersonales.horasConteoNocturnoAud)


    // Este efecto se ejecutará cada vez que el valor de 'horasConteoDiurnoAudN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasConteoNocturnoAuditoresCalculo');
        if (selectElement) {
            selectElement.textContent = horasConteoNocturnoAudN;
        }
    }, [horasConteoNocturnoAudN]); // La dependencia del efecto es 'horasConteoDiurnoAudN'

    return (
        <div className="form-group col-md-12 "> 
            <label htmlFor="horasConteoNocturnoAuditoresCalculo">Horas conteo nocturno auditores</label>
            <p id="horasConteoNocturnoAuditoresCalculo" name="horasConteoNocturnoAuditoresCalculo">{horasConteoNocturnoAud}</p>

        </div>
    )
}

export default CalculoPersonalHorasConteoNocturnoAuditores