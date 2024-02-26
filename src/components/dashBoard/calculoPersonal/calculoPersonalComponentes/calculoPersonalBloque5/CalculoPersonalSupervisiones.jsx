import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSupervisores } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalSupervisiones = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleSupChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setSupervisores(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };
    const supervisores = useSelector(state => state.calculosPersonales.supervisores)


    // Este efecto se ejecutará cada vez que el valor de 'supervisores' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('supCalculo');
        if (selectElement) {
            selectElement.value = supervisores;
        }
    }, [supervisores]); // La dependencia del efecto es 'supervisores'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="supCalculo">Supervisores</label>
            <input
                type="number"
                id="supCalculo"
                name="supCalculo"
                onChange={handleSupChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalSupervisiones;







