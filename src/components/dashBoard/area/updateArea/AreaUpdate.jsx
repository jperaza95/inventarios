
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { updateUnArea } from '../../../../features/areasSlice';
import { useState } from "react";
import AlertSuccess from '../../../reutilizables/AlertSuccess';
import AlertDanger from '../../../reutilizables/AlertDanger';





const AreaUpdate = ({ idArea, codigo, name, idInventario }) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    
    const [nameUP, setNameUP] = useState(name);
   

    const handleNameChange = (event) => {
        setNameUP(event.target.value);
    }
    

    const update = () => {

        let objUpdate = {

            "idArea": idArea,
            "codigo": codigo,
            "name": nameUP,


        } //Añadir a la url la IdArea
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Area/${idArea}`, {
            method: 'PUT',
            body: JSON.stringify(objUpdate),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    dispatch(updateUnArea({ id: idArea, nuevaSucursal: json.o }));
                    //Esto creo que FALTA dispatch(updateAreaDeUnInventariosDeUnaSucursalDeUnCliente({ }));


                    setError(false);
                    setSuccess(true);
                    setMessage(json.mensaje)

                    setTimeout(() => {
                        navigate(`/listarareas/${idInventario}`);
                    }, 2000);

                } else {
                    setSuccess(false);
                    setError(true);
                    setMessage(json.mensaje)

                }


            });

    }


    const verConteoReal = (ConteoReal) => {

        navigate("/");
        return ConteoReal
    }




    return (
        <>
            <table className="table table-striped">

                <thead>
                    <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Modificar</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{codigo}</th>


                        <td><input type="text" className="form-control" id="name" value={nameUP} onChange={handleNameChange} /></td>

 
                        

                        <td>
                            <input type="button" className="btn btn-outline-secondary" onClick={() => update()} value='Modificar' />
                        </td>
                    </tr>

                </tbody>




            </table>

            {error && <AlertDanger mensaje={message} />}
            {success && <AlertSuccess mensaje={message} />}

        </>
    )
}

export default AreaUpdate