

import { useDispatch, useSelector } from 'react-redux';
import { setSeccion } from '../../../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

const CalculoPersonalSeccion = () => {

    const dispatch = useDispatch();

    const handleSeccionChange = (event) => {

        dispatch(setSeccion(event.target.value));

    }

    const seccion = useSelector(state => state.calculosPersonales.seccion)

    // Este efecto se ejecutará cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('seccionCalculo');
        if (selectElement) {
            selectElement.value = seccion;
        }
    }, [seccion]); // La dependencia del efecto es 'seccion'
    return (
        <div className="form-group col-md-8 ">
            <label htmlFor="seccionCalculo" className="form-label">Seccion</label>
            <input className="form-control" type="text" id="seccionCalculo" name="seccionCalculo" onChange={handleSeccionChange} />
        </div>
    )
}

export default CalculoPersonalSeccion