import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUnidades } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalUnidades = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleUnidChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setUnidades(numericValue));
            

        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const unidades = useSelector(state => state.calculosPersonales.unidades)


    // Este efecto se ejecutará cada vez que el valor de 'unidades' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('unidadesCalculo');
        if (selectElement) {
            selectElement.value = unidades;
            

        }
    }, [unidades]); // La dependencia del efecto es 'unidades'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="unidadesCalculo">Unidades</label>
            <input
                type="number"
                id="unidadesCalculo"
                name="unidadesCalculo"
                onChange={handleUnidChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalUnidades;







