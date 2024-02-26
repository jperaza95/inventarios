
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
//import { setIdCliente, setSucursales, setNameCliente, setIdSucursal } from '../../../../../features/calculosPersonalesSlice';
//import { setSucursales as setSucursalesSucursales } from '../../../../../features/sucursalesSlice';

import { useEffect } from 'react';

//import { useState } from "react";
//import AlertSuccess from '../../../../reutilizables/AlertSuccess';
//import AlertDanger from '../../../../reutilizables/AlertDanger';




const InventarioCliente = ({idSucursal}) => {

    const dispatch = useDispatch();

    const clientes = useSelector(state => state.clientes.clientes);

    const clienteSeleccionado = clientes.find(cliente =>
        cliente.sucursales.some(sucursal => sucursal.idSucursal === parseInt(idSucursal))
    );
    //const idCliente = useSelector(state => state.inventarios.idCliente);
    //const idSucursal = useSelector(state => state.inventarios.idSucursal);


    //const clienteSeleccionado = clientes.find(cliente => cliente.idCliente === parseInt(idCliente));





    return (
        <div className="form-group col-md-8 ">
            
            <fieldset disabled>
                <label htmlFor="clienteInventario">Cliente</label>
                <input type="text" id="clienteInventario" className="form-control" placeholder={clienteSeleccionado && clienteSeleccionado.name} />
            </fieldset>


        </div>
    );
};


export default InventarioCliente