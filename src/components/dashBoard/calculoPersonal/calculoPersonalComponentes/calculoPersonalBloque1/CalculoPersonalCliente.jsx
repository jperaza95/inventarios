
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setIdCliente, setSucursales, setNameCliente, setIdSucursal } from '../../../../../features/calculosPersonalesSlice';
import { setSucursales as setSucursalesSucursales} from '../../../../../features/sucursalesSlice';


import { useEffect } from 'react';

//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const CalculoPersonalCliente = () => {

    const dispatch = useDispatch();


    const clientes = useSelector(state => state.clientes.clientes);

    //Falta Hacer que mande para atrás si clientes es vacío
   // const [error, setError] = useState(false)


    const handleClienteChange = (event) => {
        const idCliente = event.target.value;
        dispatch(setIdCliente(idCliente));

        // Buscar el cliente correspondiente
        const clienteSeleccionado = clientes.find(cliente => cliente.idCliente === parseInt(idCliente));

        // Verificar si se encontró el cliente
        if (clienteSeleccionado) {
            console.log(clienteSeleccionado);
            // Obtener las sucursales del cliente y enviarlas al estado
            dispatch(setSucursales(clienteSeleccionado.sucursales));
            dispatch(setSucursalesSucursales(clienteSeleccionado.sucursales));

            dispatch(setNameCliente(clienteSeleccionado.name));
        } else {
            // Limpiar las sucursales si no se encuentra el cliente
            dispatch(setSucursales([]));
        }
        dispatch(setIdSucursal(0));
    };


    const idClienteN = useSelector(state => state.calculosPersonales.idCliente)

    // Este efecto se ejecutará cada vez que el valor de 'idClienteN' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'cena'
        const selectElement = document.getElementById('clienteCalculo');
        if (selectElement) {
            selectElement.value = idClienteN;
        }
    }, [idClienteN]); // La dependencia del efecto es 'idClienteN'




    return (
        <div className="form-group col-md-6 "> 
            <label htmlFor="clienteCalculo">Cliente</label>
            <select className="form-select" id="clienteCalculo" name="clienteCalculo" onChange={handleClienteChange}>
                <option value={0}>Seleccione un cliente</option>
                {clientes && clientes.map(cliente => (
                    <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.name}
                    </option>
                ))}
            </select>
        </div>
    );
};


export default CalculoPersonalCliente