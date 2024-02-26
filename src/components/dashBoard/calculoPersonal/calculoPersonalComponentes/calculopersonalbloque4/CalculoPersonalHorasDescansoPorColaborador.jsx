import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasDescanso } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useEffect } from 'react';

const CalculoPersonalHorasDescansoPorColaborador = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasDescansoChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasDescanso(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const horasDescanso = useSelector(state => state.calculosPersonales.horasDescanso)


    // Este efecto se ejecutará cada vez que el valor de 'horasDescanso' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasDescXColaborador');
        if (selectElement) {
            selectElement.value = horasDescanso;
        }
    }, [horasDescanso]); // La dependencia del efecto es 'horasDescanso'

    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="horasDescXColaborador">Horas descanso por colaborador</label>
            <input
                type="number"
                id="horasDescXColaborador"
                name="horasDescXColaborador"
                step="0.01" // Permitir decimales
                onChange={handleHorasDescansoChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasDescansoPorColaborador;
