/*import React from 'react'*/
import { } from 'react'
import { useSelector } from 'react-redux'
import Cliente from './Cliente'
import { useState } from 'react';




const ListadoClientes = () => {

    const clientes = useSelector(state => state.clientes.clientes)
    const filterValue = useSelector(state => state.clientes.filtro)
    console.log("clientes llegando a listadoclientes: ", clientes);
    const [exito, setExito] = useState(false);


    return (
        <>

            {exito && <div className="alert alert-success col-md p-2 text-center" role="alert" id="EliminarClienteExitoso">
                Eliminado correctamente
            </div>}

            <table className="table table-striped">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Rubro</th>
                        <th scope="col">Tipo de Empresa</th>
                        <th scope="col">Activo</th>
                        <th scope="col">Accion</th>
                        <th scope="col">Modificar</th>
                        <th scope="col">Eliminar</th>

                    </tr>
                </thead>
                <tbody>

                    {clientes
                        .filter(cliente => {
                            // Verificar si el nombre del cliente contiene el valor del filtro
                            // Usamos toLowerCase() para hacer la comparación insensible a mayúsculas y minúsculas
                            return cliente && cliente.name && cliente.name.toLowerCase().includes(filterValue.toLowerCase());
                        })
                        .map(cliente => <Cliente key={cliente.idCliente} {...cliente} setExito={setExito} />)
                    }
                </tbody>



            </table>

        </>
    )



}

export default ListadoClientes



