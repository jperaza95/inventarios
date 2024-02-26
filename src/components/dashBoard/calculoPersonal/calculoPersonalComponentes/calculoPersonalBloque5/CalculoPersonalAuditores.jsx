import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CalculoPersonalAuditores = () => {


    const auditores = useSelector(state => state.calculosPersonales.auditores) //auditores



    const auditoresN = useSelector(state => state.calculosPersonales.auditores)


    // Este efecto se ejecutará cada vez que el valor de 'auditoresN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('auditoresCalculo');
        if (selectElement) {
            selectElement.textContent = auditoresN;
        }
    }, [auditoresN]); // La dependencia del efecto es 'auditoresN'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="auditoresCalculo">Auditores</label>
            <p id="auditoresCalculo" name="auditoresCalculo">{auditores}</p>

        </div>
    )
};

export default CalculoPersonalAuditores;





