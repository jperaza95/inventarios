import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJornadas } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalUnidades = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handlejorChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);
        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setJornadas(numericValue));

            
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const cantJornadas = useSelector(state => state.calculosPersonales.cantJornadas)


    // Este efecto se ejecutará cada vez que el valor de 'cantJornadas' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('jornadasCalculo');
        if (selectElement) {
            selectElement.value = cantJornadas;
        }
    }, [cantJornadas]); // La dependencia del efecto es 'cantJornadas'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="jornadasCalculo">Jornadas</label>
            <input
                type="number"
                id="jornadasCalculo"
                name="jornadasCalculo"
                onChange={handlejorChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalUnidades;







