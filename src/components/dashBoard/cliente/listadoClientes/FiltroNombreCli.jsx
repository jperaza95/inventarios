/*import React from 'react'*/
import { useDispatch } from 'react-redux';
import { setFiltro } from '../../../../features/clientesSlice';

const FiltroNombreCli = () => {
    const dispatch = useDispatch();

    const guardarFiltro = (event) => {
        dispatch(setFiltro(event.target.value))

    }

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Buscar nombre..." aria-label="Buscar nombre..." onChange={guardarFiltro} />
                </form>
            </nav>

        </div>
    )
}

export default FiltroNombreCli