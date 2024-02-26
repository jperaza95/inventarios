/* eslint-disable react/prop-types */

import ListadoSucContenido from './ListadoSucContenido'
import { useParams } from 'react-router-dom';

const ListadoSucursalesApp = () => {
    const { idCliente } = useParams();

    return (
        <div>
            <ListadoSucContenido idCliente={idCliente}/>
        </div>
    );
};

export default ListadoSucursalesApp