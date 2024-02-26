import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCantPersonasVista } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalCantPersonasVistaDiferencias10Porciento = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleCPVChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setCantPersonasVista(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };

    const cantPersonasVista = useSelector(state => state.calculosPersonales.cantPersonasVista)


    // Este efecto se ejecutará cada vez que el valor de 'cantPersonasVista' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('cpvCalculo');
        if (selectElement) {
            selectElement.value = cantPersonasVista;
        }
    }, [cantPersonasVista]); // La dependencia del efecto es 'cantPersonasVista'

    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="cpvCalculo">Cant. personas vista diferencias (10%)</label>
            <input
                type="number"
                id="cpvCalculo"
                name="cpvCalculo"
                onChange={handleCPVChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalCantPersonasVistaDiferencias10Porciento;







