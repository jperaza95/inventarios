import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CalculoPersonalUniPorPersona = () => {


    const uniPorPersona = useSelector(state => state.calculosPersonales.uniPorPersona) //

    const uniPorPersonaN = useSelector(state => state.calculosPersonales.uniPorPersona)


    // Este efecto se ejecutará cada vez que el valor de 'uniPorPersonaN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('unidadesPorPersonaCalculoPersonal');
        if (selectElement) {
            selectElement.textContent = uniPorPersonaN;
        }
    }, [uniPorPersonaN]); // La dependencia del efecto es 'uniPorPersonaN'


     
    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="unidadesPorPersonaCalculoPersonal">Unidades por persona</label>
            <p id="unidadesPorPersonaCalculoPersonal" name="unidadesPorPersonaCalculoPersonal">{uniPorPersona}</p>

        </div>
    )
};

export default CalculoPersonalUniPorPersona;





