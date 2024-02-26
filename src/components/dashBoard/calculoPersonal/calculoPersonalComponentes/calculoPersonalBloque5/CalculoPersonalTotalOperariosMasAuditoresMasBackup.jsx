import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CalculoPersonalTotalOperariosMasAuditoresMasBackup = () => {


    const totalOperariosMasAuditoresMasBackupMasLider = useSelector(state => state.calculosPersonales.totalOperariosMasAuditoresMasBackupMasLider) //auditores



    const totalOperariosMasAuditoresMasBackupMasLiderN = useSelector(state => state.calculosPersonales.totalOperariosMasAuditoresMasBackupMasLider)


    // Este efecto se ejecutará cada vez que el valor de 'totalOperariosMasAuditoresMasBackupMasLiderN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('totalOperariosMasAuditoresMasBackup');
        if (selectElement) {
            selectElement.textContent = totalOperariosMasAuditoresMasBackupMasLiderN;
        }
    }, [totalOperariosMasAuditoresMasBackupMasLiderN]); // La dependencia del efecto es 'totalOperariosMasAuditoresMasBackupMasLiderN'

    return (
        <div className="form-group col-md-12 "> 
            <label htmlFor="totalOperariosMasAuditoresMasBackup">Total operarios mas auditores mas backup</label>
            <p id="totalOperariosMasAuditoresMasBackup" name="totalOperariosMasAuditoresMasBackup">{totalOperariosMasAuditoresMasBackupMasLider}</p>

        </div>
    )
};

export default CalculoPersonalTotalOperariosMasAuditoresMasBackup;





