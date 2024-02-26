/* eslint-disable react/prop-types */

import CalculoPersonalContenido from "./CalculoPersonalContenido";
import FiltroListadoCalculoPersonal from "./FiltroListadoCalculoPersonal";




const ListadoCalculoPersonal = () => {

    return (


        <div>
            
            <h1>Listado Calculo de Personal</h1>
            <FiltroListadoCalculoPersonal />
            <CalculoPersonalContenido/>
            
    

        </div>
    );
};

export default ListadoCalculoPersonal