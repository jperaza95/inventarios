import { useDispatch } from 'react-redux'
//import { seleccionarDpto } from '../features/ciudadesSlice';
import {  useState } from 'react';
import { useEffect } from 'react';
import { setRol } from '../../features/rolesSlice';

const Roles = () => {

    //Busca los departamentos en el store.
    const [roles, setRoles] = useState([])
    const dispatch = useDispatch();


    //const rol = useRef(null); 

    const tomarDato = e => {
        console.log(e.target.value);
        dispatch(setRol(e.target.value));

    }

    useEffect(() => {
        fetch("https://inventarioswebapi1.azurewebsites.net/api/Rol")
            .then(response => response.json())
            .then(result => { setRoles(result.o); })
            .catch(error => console.log('error', error));

    }, [])
    return (
        <div className="form-group col-md-7">
            <label htmlFor="inputRoles">Roles</label>
            <select id="inputRoles" className="form-control selectpicker" name="comboRoles" onChange={tomarDato} required>
                <option key={-1} value={-1}>Seleccione un rol...</option>
                {roles.map(rol => <option key={rol.idRol} value={rol.idRol}> {rol.nombreRol}</option>)}
            </select>
        </div>
    )
}

export default Roles