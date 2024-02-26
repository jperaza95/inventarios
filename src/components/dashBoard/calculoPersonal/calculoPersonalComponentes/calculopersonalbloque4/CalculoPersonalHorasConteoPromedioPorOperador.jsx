import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasPromedioXOperador } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useEffect } from 'react';

const CalculoPersonalHorasConteoPromedioPorOperador = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasPromChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasPromedioXOperador(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const horasConteoPromedioXOperador = useSelector(state => state.calculosPersonales.horasConteoPromedioXOperador)


    // Este efecto se ejecutará cada vez que el valor de 'horasConteoPromedioXOperador' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasPromCalculo');
        if (selectElement) {
            selectElement.value = horasConteoPromedioXOperador;
        }
    }, [horasConteoPromedioXOperador]); // La dependencia del efecto es 'horasConteoPromedioXOperador'

    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="horasPromCalculo">Horas conteo promedio por operador</label>
            <input
                type="number"
                id="horasPromCalculo"
                name="horasPromCalculo"
                step="0.01" // Permitir decimales
                onChange={handleHorasPromChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasConteoPromedioPorOperador;
