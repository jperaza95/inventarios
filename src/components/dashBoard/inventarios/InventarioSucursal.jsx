

/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setIdSucursal, setCiudad, setDireccion } from '../../../features/calculosPersonalesSlice';
import { useEffect } from 'react';

//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const InventarioSucursal = ({ idSucursal }) => {

    const dispatch = useDispatch();


    //const sucursales = useSelector(state => state.calculosPersonales.sucursales);
    const sucursales = useSelector(state => state.sucursales.sucursales);
    const clientes = useSelector(state => state.clientes.clientes);


    //const idSucursal = useSelector(state => state.inventarios.idSucursal);

    const sucursalSeleccionado = sucursales.find(sucursal => sucursal.idSucursal === parseInt(idSucursal));




    //const [error, setError] = useState(false)


    //const handleSucursalChange = (event) => {
    //dispatch(setIdSucursal(event.target.value));


    // Buscar el sucursal correspondiente

    //    // Verificar si se encontró el sucursal
    //    if (sucursalSeleccionado) {
    //        // Obtener la ciudad del sucursal y enviarlas al estado
    //        dispatch(setCiudad(sucursalSeleccionado.ciudad));
    //        dispatch(setDireccion(sucursalSeleccionado.adress));


    //    } else {
    //        // Limpiar la ciudad si no se encuentra el cliente
    //        dispatch(setCiudad("Seleccione Sucursal"));
    //        dispatch(setDireccion("Seleccione Sucursal"));

    //    }

    //}


    //const idSucursalN = useSelector(state => state.calculosPersonales.idSucursal)


    //// Este efecto se ejecutará cada vez que el valor de 'idSucursalN' en el estado cambie
    //useEffect(() => {
    //    // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
    //    const selectElement = document.getElementById('sucursalCalculo');
    //    if (selectElement) {
    //        selectElement.value = idSucursalN;
    //    }
    //}, [idSucursalN]); // La dependencia del efecto es 'idSucursalN'

    return (

            <div className="form-group col-md-8">
                <fieldset disabled>

                    <label htmlFor="sucursalInventario">Sucursal</label>
                    <input type="text" id="sucursalInventario" className="form-control" placeholder={sucursalSeleccionado && sucursalSeleccionado.name} />
                </fieldset>

            </div>

    )
}

export default InventarioSucursal