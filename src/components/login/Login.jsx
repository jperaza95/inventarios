import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { caducarSesion } from '../../features/sesionSlice';


import Spinner from 'react-bootstrap/Spinner';


const Login = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const sesionCaduco = useSelector(state => state.sesion.sesionCaduco);


    useEffect(() => {
        sesionCaduco && setError("La sesión ha caducado");
    }, [sesionCaduco]);

    useEffect(() => {
        if (/*localStorage.getItem("apiKey") !== null && */localStorage.getItem("usuarioId") !== null && localStorage.getItem("usuarioId") !== 0) {

            navigate("/dashboard"); //Si hay un usuario logueado que lo mande al dashboard
        }
    }, [])

    useEffect(() => {
        // al montar el componente loging, el div con id root pasa a tener display "block"
        const divRoot = document.getElementById('root');
        if (divRoot) {
            divRoot.style.display = 'block';
        }
        // al desmontar el componente, el div root vuelve a flex
        return () => {
            if (divRoot) {
                divRoot.style.display = 'flex';
            }
        };
    }, []); // array vacío para que se ejecute solo al montar el componente


    const [error, setError] = useState(null);

    const [cargando, setCargando] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const isDisabled = !username || !password;

    const realizarLogin = () => {

        if (isNaN(username)) {
            setError("Formato inválido. Ingrese cédula sin puntos ni guiones");
            return;
        }

        setCargando(true);

        let objUsuario = {
            "ci": username,
            "password": password,
        }


        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objUsuario),
            redirect: 'follow'
        };

        fetch("https://inventarioswebapi1.azurewebsites.net/api/Login", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.codigo === 200) {
                    /*localStorage.setItem("apiKey", result.apiKey);*/
                    localStorage.setItem("usuarioId", result.o.usuarioId);
                    localStorage.setItem("rol", result.o.rol.nombreRol);
                    localStorage.setItem("ci", result.o.ci);
                    dispatch(caducarSesion(false));
                    console.log("navegando");
                    console.log(result);

                    navigate("/");
                } else {
                    console.log(result);

                    setError(result.mensaje);
                    setCargando(false);

                }
            })


    }


    return (

        <div className="sidenav-main-container">
            <div className="sidenav">

                <div className="login-main-text">
                    <h2>Sistema de Inventarios<br /> Bienvenido</h2>
                    <p>Ingrese sus credenciales para acceder al sistema</p>
                </div>
            </div>

            <div className='main'>
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">

                        <form>
                            <div className="form-group " >
                                <label htmlFor="inputEmail4">Usuario</label>
                                <input type="text" className="form-control" id="inputUsuario" placeholder="Cedula sin puntos ni guiones" value={username} onChange={handleUsernameChange} />
                            </div>



                            <div className="form-group">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={handlePasswordChange} />

                                {(error !== null) && <div className="alert alert-danger col-md mt-3" role="alert" data-aria-autofocus="true">
                                    {error}
                                </div>}
                                <button type="button" className="btn btn-primary mt-4" onClick={realizarLogin} disabled={isDisabled}>
                                    {cargando ? <Spinner as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true">
                                    </Spinner> : "Iniciar sesión"}</button>

                            </div>

                        </form>

                    </div>
                </div>

            </div>

        </div>



    )
}

export default Login