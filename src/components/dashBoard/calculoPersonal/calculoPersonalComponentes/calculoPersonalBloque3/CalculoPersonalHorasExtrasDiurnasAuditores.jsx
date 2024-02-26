import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasExtrasDiurnasAud } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useEffect } from 'react';

const CalculoPersonalHorasExtrasDiurnasAuditores = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasExDAudChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasExtrasDiurnasAud(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const horasExtrasDiurnasAud = useSelector(state => state.calculosPersonales.horasExtrasDiurnasAud)


    // Este efecto se ejecutará cada vez que el valor de 'horasExtrasDiurnasAud' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasExtraDiurnasAudCalculo');
        if (selectElement) {
            selectElement.value = horasExtrasDiurnasAud;
        }
    }, [horasExtrasDiurnasAud]); // La dependencia del efecto es 'horasExtrasDiurnasAud'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="horasExtraDiurnasAudCalculo">Horas extra diurnas auditores</label>
            <input
                type="number"
                id="horasExtraDiurnasAudCalculo"
                name="horasExtraDiurnasAudCalculo"
                step="0.01" // Permitir decimales
                onChange={handleHorasExDAudChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasExtrasDiurnasAuditores 
;
