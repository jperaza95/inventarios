import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasExtrasDiurnasOp } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';
import { useEffect } from 'react';

const CalculoPersonalHorasExtraDiurnasOperadores = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasMapeoExDChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasExtrasDiurnasOp(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };




    const horasExtrasDiurnasOp = useSelector(state => state.calculosPersonales.horasExtrasDiurnasOp)


    // Este efecto se ejecutará cada vez que el valor de 'horasExtrasDiurnasOp' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasExtraDiurnasCalculo');
        if (selectElement) {
            selectElement.value = horasExtrasDiurnasOp;
        }
    }, [horasExtrasDiurnasOp]); // La dependencia del efecto es 'horasExtrasDiurnasOp'

    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="horasExtraDiurnasCalculo">Horas extra diurnas operadores</label>
            <input
                type="number"
                id="horasExtraDiurnasCalculo"
                name="horasExtraDiurnasCalculo"
                step="0.01" // Permitir decimales
                onChange={handleHorasMapeoExDChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasExtraDiurnasOperadores;
