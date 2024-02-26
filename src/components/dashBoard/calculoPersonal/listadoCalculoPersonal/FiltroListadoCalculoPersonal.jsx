/*import React from 'react'*/
import { } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setFilterCliente, setFilterDate, setFilterSucursal, setFilterSucursales } from '../../../../features/calculosPersonalesSlice';





const FiltroListadoCalculoPersonal = () => {

    const dispatch = useDispatch();


    const clientes = useSelector(state => state.clientes.clientes)

    const handleClienteChange = (event) => {
        const idCliente = event.target.value;
        dispatch(setFilterCliente(idCliente));
        
        // Buscar el cliente correspondiente
        const clienteSeleccionado = clientes.find(cliente => cliente.idCliente === parseInt(idCliente));

        // Verificar si se encontró el cliente
        if (clienteSeleccionado) {
            // Obtener las sucursales del cliente y enviarlas al estado
            dispatch(setFilterSucursales(clienteSeleccionado.sucursales));
        } else {
            // Limpiar las sucursales si no se encuentra el cliente
            dispatch(setFilterSucursales([]));
        }
        dispatch(setFilterSucursal(0));
    };
    
    const filterSucursales = useSelector(state => state.calculosPersonales.filterSucursales)

    const handleSucursalChange = (event) => {
        const idSucursal = event.target.value;
        dispatch(setFilterSucursal(idSucursal))
    }
    const handleFechaChange = (event) => {
        const date = event.target.value;
        dispatch(setFilterDate(date))
    }
    const setNullDate = () => {
        
        dispatch(setFilterDate(""))
        const selectElement = document.getElementById('fechaFiltroCalculo');
        
        selectElement.value = "";
        
    }
    return (
        <div className="tarjetas">

            <label htmlFor="clienteFiltroCalculo">Filtro por Cliente</label>
            <select id="clienteFiltroCalculo" name="clienteFiltroCalculo" onChange={handleClienteChange}>
                <option value={0}>Seleccione un cliente</option>
                {clientes&&clientes.map(cliente => (
                    <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.name}
                    </option>
                ))}
            </select>

            <label htmlFor="sucursalFiltroCalculo">Filtro por Sucursal</label>
            <select id="sucursalFiltroCalculo" name="sucursalFiltroCalculo" onChange={handleSucursalChange}>
                <option value={0}>Seleccione una sucursal</option>
                {filterSucursales&&filterSucursales.map(sucursal => (
                    <option key={sucursal.idSucursal} value={sucursal.idSucursal}>
                        {sucursal.name}
                    </option>
                ))}
            </select>

            <label htmlFor="fechaFiltroCalculo">Filtro por fecha</label>
            <input type="date" id="fechaFiltroCalculo" name="fechaFiltroCalculo" onChange={handleFechaChange} />

            <input type="button" onClick={() => setNullDate()} value='Limpiar filtro por fecha' />

        </div>
    )
}

export default FiltroListadoCalculoPersonal





  