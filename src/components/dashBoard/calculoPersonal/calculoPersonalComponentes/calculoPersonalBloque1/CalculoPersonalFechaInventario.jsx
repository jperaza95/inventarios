
/* eslint-disable react/prop-types */
//import { useSelector } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalFechaInventario = () => {

    const dispatch = useDispatch();


    //const idCliente = useSelector(state => state.sucursales.idCliente)


    //const [error, setError] = useState(false)


    const handleFechaChange = (event) => {
        dispatch(setDate(event.target.value));
    }
    

    const date = useSelector(state => state.calculosPersonales.date)

    // Este efecto se ejecutará cada vez que el valor de 'cena' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('fechaCalculo');
        if (selectElement) {
            selectElement.value = date;
        }
    }, [date]); // La dependencia del efecto es 'date'


    return (
        <div className="form-group col-md-12 "> 
            <label htmlFor="fechaCalculo">Fecha</label>
            <input type="date" id="fechaCalculo" name="fechaCalculo"   onChange={handleFechaChange}/>
        </div>
    )
}

export default CalculoPersonalFechaInventario


