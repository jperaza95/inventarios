/* eslint-disable react/prop-types */

import CalculoPersonalAddButton from './CalculoPersonalAddButton';
import CalculoPersonalBloques from './CalculoPersonalBloques'
import ListadoCalculoPersonal from './ListadoCalculoPersonal/ListadoCalculoPersonal'
import Navbar from '../../reutilizables/Navbar'

const CalculoPersonalApp = () => {
    return (



        <div className="container mt-5 componente">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>
            <div>
                            <h1>Calculo de Personal</h1>
                 <CalculoPersonalBloques />
                 <CalculoPersonalAddButton/>
            </div>
            <div>
                <ListadoCalculoPersonal/>
            </div>

                        </div></div></div></div>


    );
};

export default CalculoPersonalApp