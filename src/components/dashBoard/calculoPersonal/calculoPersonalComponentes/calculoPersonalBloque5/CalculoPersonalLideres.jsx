import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLideres } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalLideres = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleLidChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setLideres(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const lideres = useSelector(state => state.calculosPersonales.lideres)


    // Este efecto se ejecutará cada vez que el valor de 'lideres' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('lidCalculo');
        if (selectElement) {
            selectElement.value = lideres;
        }
    }, [lideres]); // La dependencia del efecto es 'lideres'
    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="lidCalculo">Lideres</label>
            <input
                type="number"
                id="lidCalculo"
                name="lidCalculo"
                onChange={handleLidChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalLideres;







