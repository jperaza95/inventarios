/*import React from 'react'*/
import { } from 'react';

import InventarioUpdate from './InventarioUpdate';


const UpdateInventarios = ({ inventario }) => {



    return (

        <InventarioUpdate key={inventario.idInventario} {...inventario} />
        //<>


        //    {clientes
        //        .filter(cliente => {
        //            // Verificar si el nombre del cliente contiene el valor del filtro
        //            // Usamos toLowerCase() para hacer la comparaci�n insensible a may�sculas y min�sculas
        //            return cliente&&cliente.name.toLowerCase().includes(filterValue.toLowerCase());
        //        })
        //        .map(cliente => <ClienteUpdate key={cliente.idCliente} {...cliente} />)
        //    }


        //</>
    )
}

export default UpdateInventarios



