import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CalculoPersonalTotalOperadoresParaConteo = () => {


    const totalOperadoresParaConteo = useSelector(state => state.calculosPersonales.totalOperadoresParaConteo) //auditores


    const totalOperadoresParaConteoN = useSelector(state => state.calculosPersonales.totalOperadoresParaConteo)


    // Este efecto se ejecutará cada vez que el valor de 'totalOperadoresParaConteoN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('totalOperadoresParaConteoCalculo');
        if (selectElement) {
            selectElement.textContent = totalOperadoresParaConteoN;
        }
    }, [totalOperadoresParaConteoN]); // La dependencia del efecto es 'totalOperadoresParaConteoN'


    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="totalOperadoresParaConteoCalculo">Total operadores para conteo</label>
            <p id="totalOperadoresParaConteoCalculo" name="totalOperadoresParaConteoCalculo">{totalOperadoresParaConteo}</p>

        </div>
    )
};

export default CalculoPersonalTotalOperadoresParaConteo;





