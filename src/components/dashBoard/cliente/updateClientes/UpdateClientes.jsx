/*import React from 'react'*/
import { } from 'react'
import { useSelector } from 'react-redux'
import ClienteUpdate from './ClienteUpdate'





const UpdateClientes = ({cliente}) => {

    console.log(cliente);
    //const clientes = useSelector(state => state.clientes.clientes)
    //const filterValue = useSelector(state => state.clientes.filtro)


    return (

        <ClienteUpdate key={cliente.idCliente} {...cliente} />
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

export default UpdateClientes



