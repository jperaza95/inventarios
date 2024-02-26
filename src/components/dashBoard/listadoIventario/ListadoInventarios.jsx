/*import React from 'react'*/
import { } from 'react'

import { useState } from 'react';
import Inventario from './Inventario';
import { useDispatch, useSelector } from 'react-redux';
import { setInventarioActivo } from '../../../features/inventariosSlice';
import { updateUnInventarioDeUnaSuc } from '../../../features/sucursalesSlice';






const ListadoInventarios = ({ inventarios }) => {
    //const [inventarioActivo, setInventarioActivo] = useState(null);
    const [exito, setExito] = useState(false);
    const dispatch = useDispatch();
    const inventarioActivo = useSelector(state => state.inventarios.inventarioActivo);


    const seleccionarInventario = (idInventario) => {
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/ImportarMaestro/${idInventario}`, {
            method: 'PUT', // Usamos PUT para actualizar el inventario específico
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.codigo === 200) {
                    alert("Inventario seleccionado");
                    if (json.o.activo) {
                        dispatch(setInventarioActivo(json.o));

                    } else {
                        dispatch(setInventarioActivo(null));
                    }

                } else {
                    alert("No se pudo seleccionar el inventario/maestro");
                }
            });
    }

    return (
        <>
           

            <table className="table table-striped">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Maestro</th>
                        <th scope="col">Areas</th>
                        <th scope="col">Modificar</th>
                        <th scope="col">Eliminar</th>
                        <th scope="col">Seleccionar</th>

          
                    </tr>
                </thead>
                <tbody>

                    {inventarios&&inventarios
                        .map(inventario => <Inventario
                            key={inventario.idInventario}
                            {...inventario}
                            activo={inventarioActivo && inventarioActivo.idInventario === inventario.idInventario}
                            hayInventarioActivo={inventarioActivo}
                            seleccionarInventario={() => seleccionarInventario(inventario.idInventario)}
                            setExito={setExito}
                        />)
                    }
                </tbody>



            </table>

            {exito && <div className="alert alert-success col-md p-2 text-center" role="alert" id="EliminarClienteExitoso">
                Eliminado correctamente
            </div>}
        </>
    )



}

export default ListadoInventarios



