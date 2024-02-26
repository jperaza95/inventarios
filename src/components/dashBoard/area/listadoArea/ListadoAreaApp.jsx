/* eslint-disable react/prop-types */

import ListadoAreaContenido from './ListadoAreaContenido'
import { useParams } from 'react-router-dom';


const ListadoAreaApp = () => {
    const { idInventario } = useParams();


    return (
        <div>
            <ListadoAreaContenido idInventario={idInventario} />
        </div>
    );
};

export default ListadoAreaApp