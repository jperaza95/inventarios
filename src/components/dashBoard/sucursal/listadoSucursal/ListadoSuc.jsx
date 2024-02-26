/*import React from 'react'*/
import { } from 'react'
import { useSelector } from 'react-redux'
import Sucursal from './Sucursal'
import IrAlInicio from '../../../IrAlInicio'




const ListadoSuc = () => {


    const sucursales = useSelector(state => state.sucursales.sucursales)
    const filterValue = useSelector(state => state.sucursales.filtroSucursal)
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");






    return (


        <div>
            {error && <AlertDanger mensaje={message} />}

            {sucursales.filter(sucursal => {
                // Verificar si el nombre del cliente contiene el valor del filtro
                // Usamos toLowerCase() para hacer la comparación insensible a mayúsculas y minúsculas
                return sucursal && sucursal.name.toLowerCase().includes(filterValue.toLowerCase());
            }).map(sucursal => <Sucursal key={sucursal.idSucursal} {...sucursal} setError={setError} setMessage={setMessage} />)
            }


        </div>
    )
}

export default ListadoSuc



