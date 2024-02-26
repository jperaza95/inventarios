
    /* eslint-disable react/prop-types */
    import { useEffect } from 'react'
import { useSelector } from 'react-redux'




const CalculoPersonalTotalHorasAuditores = () => {



    const auditores = useSelector(state => state.calculosPersonales.auditores)
    const horasConteoDiurnoAud = auditores * 1.5 // horas conteo Diurno Aud

    const horasConteoPromedioXOperador = useSelector(state => state.calculosPersonales.horasConteoPromedioXOperador)
    const horasConteoNocturnoAud = (auditores * horasConteoPromedioXOperador) - horasConteoDiurnoAud // Horas conteo Nocturno Aud

    const horasExtrasDiurnasAud = useSelector(state => state.calculosPersonales.horasExtrasDiurnasAud) //Horas extra Diurnas Aud
    const horasExtrasNocturnasAud = useSelector(state => state.calculosPersonales.horasExtrasNocturnasAud) //Horas extra Nocturnas Aud

    const totalHorasAud = horasConteoDiurnoAud + horasConteoNocturnoAud + horasExtrasDiurnasAud + horasExtrasNocturnasAud //Total de horas Aud


    const totalHorasAudN = useSelector(state => state.calculosPersonales.totalHorasAud)
    


    // Este efecto se ejecutará cada vez que el valor de 'totalHorasAudN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('totalHorasAudCalculo');
        if (selectElement) {
            selectElement.textContent = totalHorasAudN;
        }
    }, [totalHorasAudN]); // La dependencia del efecto es 'totalHorasAudN'

        return (
            <div className="form-group col-md-6 "> 
                <label htmlFor="totalHorasAudCalculo">Total de horas auditores</label>
                <p id="totalHorasAudCalculo" name="totalHorasAudCalculo">{totalHorasAud}</p>

            </div>
        )
    }

export default CalculoPersonalTotalHorasAuditores