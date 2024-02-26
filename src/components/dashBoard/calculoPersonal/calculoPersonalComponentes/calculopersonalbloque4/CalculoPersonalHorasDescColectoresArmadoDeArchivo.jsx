import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorasDescColectoresArmadoDeArchivo } from '../../../../../features/calculosPersonalesSlice';
import AlertDanger from '../../../../reutilizables/alertdanger';

const CalculoPersonalHorasDescColectoresArmadoDeArchivo = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleHorasDescColectoresArmadoDeArchivoChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);

        // Verificar si el valor es un número positivo o cero
        if (!isNaN(numericValue) && numericValue >= 0) {
            setError(false);
            dispatch(setHorasDescColectoresArmadoDeArchivo(numericValue));
        } else {
            setError(true);
            setMessage("Ingrese un valor numérico no negativo");
        }
    };


    const horasDescColectoresArmadoDeArchivo = useSelector(state => state.calculosPersonales.horasDescColectoresArmadoDeArchivo)


    // Este efecto se ejecutará cada vez que el valor de 'horasDescColectoresArmadoDeArchivo' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horasDescColectoresArmadoDeArchivo');
        if (selectElement) {
            selectElement.value = horasDescColectoresArmadoDeArchivo;
        }
    }, [horasDescColectoresArmadoDeArchivo]); // La dependencia del efecto es 'horasDescColectoresArmadoDeArchivo'

    return (
        <div className="form-group col-md-10"> 
            <label htmlFor="horasDescColectoresArmadoDeArchivo">Horas desc. colectores/armado de archivo</label>
            <input
                type="number"
                id="horasDescColectoresArmadoDeArchivo"
                name="horasDescColectoresArmadoDeArchivo"
                step="0.01" // Permitir decimales
                onChange={handleHorasDescColectoresArmadoDeArchivoChange}
            />
            {error && <AlertDanger mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalHorasDescColectoresArmadoDeArchivo;
