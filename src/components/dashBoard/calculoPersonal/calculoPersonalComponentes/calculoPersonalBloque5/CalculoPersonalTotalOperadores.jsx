import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CalculoPersonalTotalOperadores = () => {
    

    const totalOperadores = useSelector(state => state.calculosPersonales.totalOperadores) //operadores



    const totalOperadoresN = useSelector(state => state.calculosPersonales.totalOperadores)


    // Este efecto se ejecutará cada vez que el valor de 'totalOperadoresN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('operadoresCalculo');
        if (selectElement) {
            selectElement.textContent = totalOperadoresN;
        }
    }, [totalOperadoresN]); // La dependencia del efecto es 'totalOperadoresN'
    
    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="operadoresCalculo">Total de operadores </label>
            <p id="operadoresCalculo" name="operadoresCalculo">{totalOperadores}</p>

        </div>
    )
};

export default CalculoPersonalTotalOperadores;





