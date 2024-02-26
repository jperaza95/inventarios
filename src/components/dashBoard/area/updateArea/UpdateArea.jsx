/*import React from 'react'*/
import { } from 'react';
import { useSelector } from 'react-redux';
import AreaUpdate from './AreaUpdate';       
import {useParams} from 'react-router-dom';




const UpdateArea = () => {

    const { idInventario,idArea } = useParams();
    const areas = useSelector(state => state.areas.areas);
    const area = areas.find(a => a.idArea === parseInt(idArea));



    return (
        <div className="tarjetas">


            {areas && area && <AreaUpdate key={area.idArea} {...area} idInventario={idInventario} />}


        </div>
    )
}

export default UpdateArea



