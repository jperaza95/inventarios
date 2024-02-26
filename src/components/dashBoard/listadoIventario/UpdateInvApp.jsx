
import UpdateInvContenido from './UpdateInvContenido'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateInvApp = () => {

    const { idInventario } = useParams();

    const inventarios = useSelector((state) => state.inventarios.inventarios);

    const inventarioExistente = inventarios.find((inventario) => inventario.idInventario === parseInt(idInventario));
    console.log(inventarioExistente);

    return (

        <>
            {inventarioExistente ? (
                <UpdateInvContenido inventario={inventarioExistente} />

            ) : (
                <div className="container mt-5">
                    <div className='form-row justify-content-center'>
                        <div className='form-group col-md-10'>
                            <p>El inventario con id:{idInventario} no existe.</p>
                        </div>
                    </div>
                </div>
            )}


        </>


    )
}

export default UpdateInvApp