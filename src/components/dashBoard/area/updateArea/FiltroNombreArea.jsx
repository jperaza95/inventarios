/*import React from 'react'*/
import { useDispatch } from 'react-redux';
import { setFilterArea } from '../../../../features/areasSlice';

const FiltroNombreArea = () => {
    const dispatch = useDispatch();

    const guardarFiltro = (event) => {
        dispatch(setFilterArea(event.target.value))

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

export default FiltroNombreArea