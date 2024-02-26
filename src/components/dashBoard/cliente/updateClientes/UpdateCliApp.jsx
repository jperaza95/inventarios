
import UpdateCliContenido from './UpdateCliContenido'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateCliApp = () => {

    const { idCliente } = useParams();

    const clientes = useSelector((state) => state.clientes.clientes);

    const clienteExistente = clientes.find((cliente) => cliente.idCliente === parseInt(idCliente));


    return (

        <>
            {clienteExistente ? (
                <UpdateCliContenido cliente={clienteExistente} />

            ) : (
                <div className="container mt-5">
                    <div className='form-row justify-content-center'>
                        <div className='form-group col-md-10'>
                                <p>El cliente con id:{idCliente} no existe.</p>
                        </div>
                    </div>
                </div>
            )}


        </>


    )
}

export default UpdateCliApp