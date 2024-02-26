/*import React from 'react'*/
import { useDispatch } from 'react-redux';
import { setFiltroSucursal } from '../../../../features/sucursalesSlice';

const FiltroNombreSuc = () => {
    const dispatch = useDispatch();

    const guardarFiltro = (event) => {
        dispatch(setFiltroSucursal(event.target.value))

    }

    return (


        <div>
            <nav className="navbar navbar-light bg-light">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Filtrar por nombre" aria-label="Filtrar por nombre" onChange={guardarFiltro} />
                </form>
            </nav>

        </div>
    )
}

export default FiltroNombreSuc