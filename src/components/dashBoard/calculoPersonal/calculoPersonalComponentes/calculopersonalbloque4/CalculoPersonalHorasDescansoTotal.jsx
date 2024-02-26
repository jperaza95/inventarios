
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'




const CalculoPersonalHorasDescansoTotal = () => {

    

    const totalOperariosMasAuditoresMasBackupMasLider = useSelector(state => state.calculosPersonales.totalOperariosMasAuditoresMasBackupMasLider) //Total de operadores + backup + auditores + lideres

    const horasDescanso = useSelector(state => state.calculosPersonales.horasDescanso) //Horas descanso x operador
    
    

    const totalHorasDescanso = totalOperariosMasAuditoresMasBackupMasLider * horasDescanso //total horas descanso en el inventariado




    const totalHorasDescansoN = useSelector(state => state.calculosPersonales.totalHorasDescanso)


    // Este efecto se ejecutará cada vez que el valor de 'totalHorasDescansoN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasDescansoTotalCalculo');
        if (selectElement) {
            selectElement.textContent = totalHorasDescansoN;
        }
    }, [totalHorasDescansoN]); // La dependencia del efecto es 'totalHorasDescansoN'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="horasDescansoTotalCalculo">Total de horas descanso</label>
            <p id="horasDescansoTotalCalculo" name="horasDescansoTotalCalculo">{totalHorasDescanso}</p>

        </div>
    )
}

export default CalculoPersonalHorasDescansoTotal