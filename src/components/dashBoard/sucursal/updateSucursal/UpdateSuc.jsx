/*import React from 'react'*/
import { } from 'react'
import { useSelector } from 'react-redux'
import SucursalUpdate from './SucursalUpdate'


const UpdateSuc = ({ idSucursal }) => {


    const sucursales = useSelector(state => state.sucursales.sucursales);
    const sucursal = sucursales.find(suc => suc.idSucursal === parseInt(idSucursal));
    //const filterValue = useSelector(state => state.sucursales.filtroSucursal)
    return (
        <div className="tarjetas">

            {/*{sucursales.filter(sucursal => {*/}
            {/*    // Verificar si el nombre del cliente contiene el valor del filtro*/}
            {/*    // Usamos toLowerCase() para hacer la comparación insensible a mayúsculas y minúsculas*/}
            {/*    return sucursal && sucursal.name.toLowerCase().includes(filterValue.toLowerCase());*/}
            {/*}).map(sucursal => <SucursalUpdate key={sucursal.idSucursal} {...sucursal} />)*/}
            {/*}*/}

            {sucursal && <SucursalUpdate key={sucursal.idSucursal} {...sucursal} />}


        </div>
    )
}

export default UpdateSuc



