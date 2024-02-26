

import { useDispatch, useSelector } from 'react-redux';
import { setHoraInicio } from '../../../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

const CalculoPersonalHoraInicio = () => {

    const dispatch = useDispatch();

    const handleHoraInicioChange = (event) => {
       
            dispatch(setHoraInicio(event.target.value));
        
    }

    const horaInicio = useSelector(state => state.calculosPersonales.horaInicio)

    // Este efecto se ejecutará cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('horaInicioCalculo');
        if (selectElement) {
            selectElement.value = horaInicio;
        }
    }, [horaInicio]); // La dependencia del efecto es 'horaInicio'
    return (
        <div className="form-group col-md-12 "> 
            <label htmlFor="horaInicioCalculo">Hora Inicio</label>
            <input type="text" id="horaInicioCalculo" name="horaInicioCalculo" onChange={handleHoraInicioChange} />
        </div>
    )
}

export default CalculoPersonalHoraInicio