import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CalculoPersonalOperadoresBackup = () => {

    const backups = useSelector(state => state.calculosPersonales.backups) //operadores backup (10% del total de operadores)
    


    const operadoresBackup = useSelector(state => state.calculosPersonales.operadoresBackup)


    // Este efecto se ejecutar� cada vez que el valor de 'operadoresBackup' en el estado cambie
    useEffect(() => {
        // Aqu� actualizas el valor seleccionado del select seg�n el valor de 'cena'
        const selectElement = document.getElementById('backupsCalculo');
        if (selectElement) {
            selectElement.textContent = operadoresBackup;
        }
    }, [operadoresBackup]); // La dependencia del efecto es 'operadoresBackup'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="backupsCalculo">Operadores backup</label>
            <p id="backupsCalculo" name="backupsCalculo">{backups}</p>

        </div>
    )
}

export default CalculoPersonalOperadoresBackup;

