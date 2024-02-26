/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import ListadoArea from './ListadoArea'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFiltroSucursal, } from '../../../../features/sucursalesSlice'
import FiltroNombreArea from '../updateArea/FiltroNombreArea'
import IrAlInicio from '../../../IrAlInicio'
import Area from './Area'
import AddArea from '../agregarArea/addArea'
import AlertDanger from '../../../reutilizables/AlertDanger'
import AlertSuccess from '../../../reutilizables/AlertSuccess'





const ListadoAreaContenido = ({ idInventario }) => {

    const dispatch = useDispatch();

    const inventarios = useSelector(state => state.inventarios.inventarios);

    const inventarioEncontrado = inventarios.find(inventario => inventario.idInventario === parseInt(idInventario));

    const [exito, setExito] = useState(false);
    const [error, setError] = useState(false);
    const [msj, setMsj] = useState("");




    let areas = [];


    if (inventarioEncontrado) {
        areas = inventarioEncontrado.areas;
    }


    //const areas = useSelector(state => state.areas.areas)
    const filterValue = useSelector(state => state.areas.filterArea);


    return (
        <>

        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>

                        <IrAlInicio titulo="Area" descripcion="Listado de Area" />

                        <FiltroNombreArea />


                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th scope="col">Cod Area</th>

                                    <th scope="col">Nombre</th>
                                    {/*<th scope="col">Productos</th>*/}
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>


                                </tr>
                            </thead>
                            <tbody>

                                    {areas.filter(area => {
                                        // Verificar si el nombre del area contiene el valor del filtro
                                        // Usamos toLowerCase() para hacer la comparación insensible a mayúsculas y minúsculas
                                        return area && area.name.toLowerCase().includes(filterValue.toLowerCase());
                                    }).sort((a, b) => a.codigo - b.codigo).map(area => <Area key={area.idArea} {...area} setMsjExito={setExito} setError={setError} setMsj={setMsj} idInventario={idInventario} />)
                                }

                            </tbody>



                        </table>
            {
                exito && <AlertSuccess mensaje={msj} />
            }
            {error && <AlertDanger mensaje={msj} />}
                            <AddArea idInventario={idInventario} setSuccess={setExito} setError={setError} setMessage={setMsj}/>

                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default ListadoAreaContenido