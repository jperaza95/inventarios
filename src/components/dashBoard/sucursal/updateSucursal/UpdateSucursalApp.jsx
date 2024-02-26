/* eslint-disable react/prop-types */

import UpdateSucContenido from './UpdateSucContenido'
import { useParams } from 'react-router-dom';

const UpdateSucursalesApp = () => {
    const {idSucursal} = useParams();
    return (
        <div>
            <UpdateSucContenido idSucursal = {idSucursal}/>
        </div>
    );
};

export default UpdateSucursalesApp