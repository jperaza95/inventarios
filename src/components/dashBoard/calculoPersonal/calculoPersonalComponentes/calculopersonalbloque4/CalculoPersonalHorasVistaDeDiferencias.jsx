import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasVistaDeDiferencia } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useEffect } from 'react';

const CalculoPersonalHorasVistaDeDiferencias = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasVistaChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasVistaDeDiferencia(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const horasVistaDeDiferencia = useSelector(state => state.calculosPersonales.horasVistaDeDiferencia)


    // Este efecto se ejecutará cada vez que el valor de 'horasVistaDeDiferencia' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasVistaDeDiferencias');
        if (selectElement) {
            selectElement.value = horasVistaDeDiferencia;
        }
    }, [horasVistaDeDiferencia]); // La dependencia del efecto es 'horasVistaDeDiferencia'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="horasVistaDeDiferencias">Horas vista de diferencias</label>
            <input
                type="number"
                id="horasVistaDeDiferencias"
                name="horasVistaDeDiferencias"
                step="0.01" // Permitir decimales
                onChange={handleHorasVistaChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasVistaDeDiferencias;
