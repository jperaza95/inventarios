
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Roles from './Roles';
import Spinner from 'react-bootstrap/Spinner';
import IrAlInicio from '../IrAlInicio';

const Registro = () => {


    const rol = useSelector(state => state.roles.rolId);
    const usuario = useRef(null);
    const pass = useRef(null);
    const ci = useRef(null);


    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("")


    const [cargando, setCargando] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("rol") === "user") {
            //Register de usuarios pueden hacer los admins
            navigate("/") //lo lleva al dashboard si no tiene permisos

        }
    }, [])

    // Realiza el registro
    const realizarRegistro = () => {
        setCargando(true);
        setError(false);
        setSuccess(false);

        if (validarRegistro()) {
            let objUsuario = {
                "ci": ci.current.value,
                "name": usuario.current.value,
                "password": pass.current.value,
                "rolDTO": rol,
            }
            console.log(objUsuario);
            let requestOptions = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objUsuario),
                redirect: 'follow'
            };

            fetch("https://inventarioswebapi1.azurewebsites.net/api/UsuarioRegister", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);

                    if (result.codigo === 200) {
                        setSuccess(true);
                        setMessage(result.mensaje)
                        //navigate("/");

                        setTimeout(() => { //espera 2 segundos y redirige
                            navigate("/");
                        }, 2000);

                    } else {
                        setError(true);
                        setMessage(result.mensaje)


                    }

                    setTimeout(() => {
                        setCargando(false);
                        setError(false);
                        setSuccess(false);
                        setMessage("");
                    }, 2000);
                }).catch(error => {
                    setError(true);
                    setMessage("Ocurrió un error al procesar la solicitud.");

                    // Despu�s de 3 segundos, restablece los estados
                    setTimeout(() => {
                        setCargando(false);
                        setError(false);
                        setSuccess(false);
                        setMessage("");
                    }, 2000);
                });

        } else {
            // Despu�s de 3 segundos, restablece los estados
            setSuccess(false);
            setError(true);
            setMessage("Verifique los datos ingresados y vuelva a intentar");

            setTimeout(() => {
                setCargando(false);
                setError(false);
                //setSuccess(false);
                setMessage("");
            }, 2000);
        }


    }
    const validarRegistro = () => {



        return rol > 0 && usuario.current.value.length > 3 && pass.current.value.length > 5 && ci.current.value.length>6;
    }

    return (

        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>

                        <IrAlInicio titulo="Registro" descripcion="Registro de usuario" />
                        <div className='col-6 p-3'>

                            <div className="form-group" >
                                <label htmlFor="inputNombreRegistro">Nombre</label>
                                <input type="text" ref={usuario} className="form-control" id="inputNombreRegistro" placeholder="Nombre del Usuario" required/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="inputPasswordRegistro">Contrase&ntilde;a</label>
                                <input type="password" ref={pass} className="form-control" id="inputPasswordRegistro" placeholder="Contrase&ntilde;a" required />
                                <small id="passwordHelpBlock" className="form-text text-muted">
                                    Tu contrase&ntilde;a debe tener al menos 6 caracteres, una may&uacute;scula, una min&uacute;scula y un n&uacute;mero.
                                </small>
                            </div>


                            <div className="form-group">
                                <label htmlFor="inputCedulaRegistro">Cedula</label>
                                <input type="text" ref={ci} className="form-control" id="inputCedulaRegistro" placeholder="Cedula" required/>
                            </div>




                            <div className="form-group">

                                <div className='form-row justify-content-start'>

                                    <Roles />


                                </div>

                                    {error && <div className="alert alert-danger col-md" role="alert" data-aria-autofocus="true">
                                        {message}
                                    </div>}

                                    {success && <div className="alert alert-success col-md" role="alert" data-aria-autofocus="true">
                                        {message}
                                    </div>
                                    }
                                <div>

                                    <button type="button" className="btn btn-primary mt-4" onClick={realizarRegistro}>
                                        {cargando ? <Spinner as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true">
                                        </Spinner> : "Registro"}
                                    </button>
                                </div>

                                <hr />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>


    )
}

export default Registro



