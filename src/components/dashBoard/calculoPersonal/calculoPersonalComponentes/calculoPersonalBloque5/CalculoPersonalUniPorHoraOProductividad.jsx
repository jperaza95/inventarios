import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUniPorHora } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalUniPorHoraOProductividad = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleProductividadChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            

            dispatch(setUniPorHora(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const uniPorHora = useSelector(state => state.calculosPersonales.uniPorHora)


    // Este efecto se ejecutará cada vez que el valor de 'uniPorHora' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('productividadCalculo');
        if (selectElement) {
            selectElement.value = uniPorHora;
        }
    }, [uniPorHora]); // La dependencia del efecto es 'uniPorHora'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="productividadCalculo">Unidad por hora (Productividad)</label>
            <input
                type="number"
                id="productividadCalculo"
                name="productividadCalculo"
                step="0.01" // Permitir decimales
                onChange={handleProductividadChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalUniPorHoraOProductividad;







