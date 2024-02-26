import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasMapN } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useEffect } from 'react';

const CalculoPersonalHorasMapeoDiurno = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasMapeoDChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasMapN(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const horasMapN = useSelector(state => state.calculosPersonales.horasMapN)


    // Este efecto se ejecutará cada vez que el valor de 'horasMapN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasMapeoNCalculo');
        if (selectElement) {
            selectElement.value = horasMapN;
        }
    }, [horasMapN]); // La dependencia del efecto es 'horasMapN'

    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="horasMapeoNCalculo">Horas mapeo nocturno</label>
            <input
                type="number"
                id="horasMapeoNCalculo"
                name="horasMapeoNCalculo"
                step="0.01" // Permitir decimales
                onChange={handleHorasMapeoDChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasMapeoDiurno;
