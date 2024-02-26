

/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'




//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalHorasConteoDiurnoAuditores = () => {




    const auditores = useSelector(state => state.calculosPersonales.auditores)
    const horasConteoDiurnoAud = auditores * 1.5



    const horasConteoDiurnoAudN = useSelector(state => state.calculosPersonales.horasConteoDiurnoAud)


    // Este efecto se ejecutar� cada vez que el valor de 'horasConteoDiurnoAudN' en el estado cambie
    useEffect(() => {
        // Aqu� actualizas el valor seleccionado del select seg�n el valor de 'cena'
        const selectElement = document.getElementById('horasConteoDiurnoAuditoresCalculo');
        if (selectElement) {
            selectElement.textContent = horasConteoDiurnoAudN;
        }
    }, [horasConteoDiurnoAudN]); // La dependencia del efecto es 'horasConteoDiurnoAudN'

    return (
        <div className="form-group col-md-12 "> 
            <label htmlFor="horasConteoDiurnoAuditoresCalculo">Horas conteo diurno auditores</label>
            <p id="horasConteoDiurnoAuditoresCalculo" name="horasConteoDiurnoAuditoresCalculo">{horasConteoDiurnoAud}</p>

        </div>
    )
}

export default CalculoPersonalHorasConteoDiurnoAuditores