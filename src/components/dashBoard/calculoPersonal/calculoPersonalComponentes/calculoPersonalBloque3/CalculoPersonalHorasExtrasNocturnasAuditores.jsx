import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasExtrasNocturnasAud } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalHorasExtrasNocturnasAuditores = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasExNAudChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasExtrasNocturnasAud(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const horasExtrasNocturnasAud = useSelector(state => state.calculosPersonales.horasExtrasNocturnasAud)


    // Este efecto se ejecutará cada vez que el valor de 'horasExtrasNocturnasAud' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasExtraNocturnasAudCalculo');
        if (selectElement) {
            selectElement.value = horasExtrasNocturnasAud;
        }
    }, [horasExtrasNocturnasAud]); // La dependencia del efecto es 'horasExtrasNocturnasAud'

    return (
        <div className="form-group col-md-7 "> 
            <label htmlFor="horasExtraNocturnasAudCalculo">Horas extra nocturnas auditores</label>
            <input
                type="number"
                id="horasExtraNocturnasAudCalculo"
                name="horasExtraNocturnasAudCalculo"
                step="0.01" // Permitir decimales
                onChange={handleHorasExNAudChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasExtrasNocturnasAuditores;
