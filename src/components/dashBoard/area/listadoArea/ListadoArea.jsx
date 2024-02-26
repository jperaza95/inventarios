/*import React from 'react'*/
import { } from 'react'
import { useSelector } from 'react-redux'
import Area from './Area'
import { useState } from 'react';

import IrAlInicio from '../../../IrAlInicio'




const ListadoArea = () => {


    const areas = useSelector(state => state.areas.areas)
    const filterValue = useSelector(state => state.areas.filterArea)
    const [exito, setExito] = useState(false);

    return (
        <>
        { exito && <div className="alert alert-success col-md p-2 text-center" role="alert" id="EliminarAreaExitoso">
            Eliminado correctamente
        </div>}

        <div>

            {areas.filter(areas => {
                // Verificar si el nombre del cliente contiene el valor del filtro
                // Usamos toLowerCase() para hacer la comparación insensible a mayúsculas y minúsculas
                return areas && areas.name.toLowerCase().includes(filterValue.toLowerCase());
            }).map(area => <Area key={area.idArea} {...area} setMsjExito={setExito} />)
            }


        </div>
        </>
    )
}

export default ListadoArea



