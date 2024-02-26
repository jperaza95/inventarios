

/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';
import { setIdSucursal, setCiudad, setDireccion } from '../../../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalSucursal = () => {

    const dispatch = useDispatch();


    const sucursales = useSelector(state => state.calculosPersonales.sucursales)


    //const [error, setError] = useState(false)


    const handleSucursalChange = (event) => {
        dispatch(setIdSucursal(event.target.value));

        const idSucursal = event.target.value;
        // Buscar el sucursal correspondiente
        const sucursalSeleccionado = sucursales.find(sucursal => sucursal.idSucursal === parseInt(idSucursal));

        // Verificar si se encontró el sucursal
        if (sucursalSeleccionado) {
            // Obtener la ciudad del sucursal y enviarlas al estado
            dispatch(setCiudad(sucursalSeleccionado.ciudad));
            dispatch(setDireccion(sucursalSeleccionado.adress));

            
        } else {
            // Limpiar la ciudad si no se encuentra el cliente
            dispatch(setCiudad("Seleccione Sucursal"));
            dispatch(setDireccion("Seleccione Sucursal"));

        }

    }


    const idSucursalN = useSelector(state => state.calculosPersonales.idSucursal)


    // Este efecto se ejecutará cada vez que el valor de 'idSucursalN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('sucursalCalculo');
        if (selectElement) {
            selectElement.value = idSucursalN;
        }
    }, [idSucursalN]); // La dependencia del efecto es 'idSucursalN'

    return (
        <div className="form-group col-md-8 ">
            <label htmlFor="sucursalCalculo">Sucursal</label>
            <select className="form-select" id="sucursalCalculo" name="sucursalCalculo" onChange={handleSucursalChange}>
                <option value={0}>Seleccione una sucursal</option>
                {sucursales.map(sucursal => (
                    <option key={sucursal.idSucursal} value={sucursal.idSucursal}>
                        {sucursal.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CalculoPersonalSucursal