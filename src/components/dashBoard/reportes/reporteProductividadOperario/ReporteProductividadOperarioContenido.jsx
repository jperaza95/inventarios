import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IrAlInicio from '../../../IrAlInicio';

const ReporteProductividadOperarioContenido = ({ idInventario }) => {
    const usuarios = useSelector((state) => state.usuarios.usuarios);

    // Estado para almacenar la selección del usuario
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(-1);
    const [reporte, setReporte] = useState([]);

    // Maneja el cambio de selección
    const handleSelectChange = (e) => {
        setUsuarioSeleccionado(e.target.value);
    };

    // Encuentra el usuario seleccionado basado en su ID
    const usuario = useSelector(state =>
        state.usuarios.usuarios.find(u => u.ci === parseInt(usuarioSeleccionado, 10))
    );


    const fetchReporteProductividad = async () => {
        if (usuario && usuario.ci) {

            try {

                const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteProductividadUsuario/${idInventario}?ci=${usuario.ci}`);

                const data = await response.json();
                if (data.o !== undefined) {
                    setReporte(data.o);
                }

            } catch (error) {
                console.error('Error en el fetch del reporte de productividad: ', error);
            }
        }

    };



    useEffect(() => {
        fetchReporteProductividad();
    }, [idInventario, usuarioSeleccionado]);

    if (!reporte) {
        return <div>Cargando...</div>;
    }


    return (
        <div className="container mt-5">

            <div className="form-group col-md-7">

                <IrAlInicio titulo="Reporte de productividad por operario" descripcion={`Productividad por operario`} />


                <select className="form-control selectpicker" value={usuarioSeleccionado} onChange={handleSelectChange}>
                    <option key={-1} value={-1} >Seleccione un usuario</option>
                    {usuarios.map(usuario => (
                        <option key={usuario.ci} value={usuario.ci}>{usuario.name}</option>
                    ))}
                </select>
            </div>


            {reporte && usuario && (
                <div>
                    <p>Cedula: {reporte.cedula}</p>
                    <p>Nombre: {usuario.name}</p>
                    <p>Unidades Contadas: {reporte.unidadescontadas}</p>
                    <p>Horas de Conteo: {reporte.horasContando}</p>
                    <p>Promedio de Unidades por Hora: {reporte.promedioArticulosContadosPorHora}</p>
                </div>
            )}
        </div>
    );
}

export default ReporteProductividadOperarioContenido;