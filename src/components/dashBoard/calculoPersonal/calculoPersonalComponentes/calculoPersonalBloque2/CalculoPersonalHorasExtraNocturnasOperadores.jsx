import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasExtrasNocturnasOp } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalHorasExtraNocturnasOperadores = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasMapeoExNChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasExtrasNocturnasOp(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const horasExtrasNocturnasOp = useSelector(state => state.calculosPersonales.horasExtrasNocturnasOp)


    // Este efecto se ejecutará cada vez que el valor de 'horasExtrasNocturnasOp' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasExtraNocturnasCalculo');
        if (selectElement) {
            selectElement.value = horasExtrasNocturnasOp;
        }
    }, [horasExtrasNocturnasOp]); // La dependencia del efecto es 'horasExtrasNocturnasOp'
    return (
        <div className="form-group col-md-8 "> 
            <label htmlFor="horasExtraNocturnasCalculo">Horas extra nocturnas operadores</label>
            <input
                type="number"
                id="horasExtraNocturnasCalculo"
                name="horasExtraNocturnasCalculo"
                step="0.01" // Permitir decimales
                onChange={handleHorasMapeoExNChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasExtraNocturnasOperadores;
