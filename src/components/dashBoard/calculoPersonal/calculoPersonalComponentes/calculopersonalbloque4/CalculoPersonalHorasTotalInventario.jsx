
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'




const CalculoPersonalHorasDescansoTotal = () => {

    const auditores = useSelector(state => state.calculosPersonales.auditores) //Auditores
    const operadoresBackup = useSelector(state => state.calculosPersonales.operadoresBackup) //Operadores backup
    const totalOperadoresParaConteo = useSelector(state => state.calculosPersonales.totalOperadoresParaConteo) //Total operadores

    const totalAuditoresOperadoresYBackup = auditores + operadoresBackup + totalOperadoresParaConteo  //Total de operadores + backup + auditores
    const horasConteoPromedioXOperador = useSelector(state => state.calculosPersonales.horasConteoPromedioXOperador) //Horas conteo promedio x operador

    const horasMapD = useSelector(state => state.calculosPersonales.horasMapD) //Horas mapeo diurno
    const horasMapN = useSelector(state => state.calculosPersonales.horasMapN) //Horas mapeo nocturno


    const totalHorasInventario = totalAuditoresOperadoresYBackup * horasConteoPromedioXOperador + (horasMapD + horasMapN)// horas total inventario


    const totalHorasInventarioN = useSelector(state => state.calculosPersonales.totalHorasInventario)

    // Este efecto se ejecutará cada vez que el valor de 'totalHorasInventarioN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasInventarioTotalCalculo');
        if (selectElement) {
            selectElement.textContent = totalHorasInventarioN;
        }
    }, [totalHorasInventarioN]); // La dependencia del efecto es 'totalHorasInventarioN'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="horasInventarioTotalCalculo">Total de horas Inventario</label>
            <p id="horasInventarioTotalCalculo" name="horasInventarioTotalCalculo">{totalHorasInventario}</p>

        </div>
    )
}

export default CalculoPersonalHorasDescansoTotal