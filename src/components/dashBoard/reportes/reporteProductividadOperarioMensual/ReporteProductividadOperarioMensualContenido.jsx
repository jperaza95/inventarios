import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IrAlInicio from '../../../IrAlInicio';

const ReporteProductividadOperarioMensualContenido = () => {
    const usuarios = useSelector((state) => state.usuarios.usuarios);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('0');
    const [reporte, setReporte] = useState(null);

    const handleUserChange = (e) => {
        setUsuarioSeleccionado(e.target.value);
    };

    useEffect(() => {
        const usuarioCi = parseInt(usuarioSeleccionado, 10);
        const usuario = usuarios.find(u => u.ci === parseInt(usuarioCi));

        if (usuario && usuario.conteos) {
            const hoy = new Date();
            const hace30Dias = new Date(hoy);
            hace30Dias.setDate(hoy.getDate() - 30);

            let unidadesContadas = 0;
            let totalHoras = 0;
            usuario.conteos.forEach(conteo => {
                if (conteo.startTime && conteo.endTime) {
                    const startTime = new Date(conteo.startTime);
                    const endTime = new Date(conteo.endTime);
                    if (startTime >= hace30Dias && endTime <= hoy) {
                        unidadesContadas += conteo.totalDeItemsContados.reduce((acc, stockCrono) => acc + stockCrono.stockParcial, 0);
                        totalHoras += (endTime - startTime) / (1000 * 60 * 60);
                    }
                }
            });

            const promedio = totalHoras > 0 ? (unidadesContadas / totalHoras).toFixed(2) : 0;

            setReporte({
                ci: usuario.ci,
                nombre: usuario.name,
                unidadesContadas,
                totalHoras: totalHoras.toFixed(2),
                promedio,
                rol: usuario.rol
            });
        } else {
            setReporte(null);

        }
    }, [usuarios, usuarioSeleccionado]);

    return (
        <div className="container mt-5">


            <div className="form-group col-md-7">

                <IrAlInicio titulo="Reporte de productividad por operario mensual" descripcion={`Productividad por operario mensual`} />


                <select className="form-control selectpicker" value={usuarioSeleccionado} onChange={handleUserChange}>
                    <option value='0' >Seleccione un usuario</option>
                    {usuarios.map(usuario => (
                        <option key={usuario.ci} value={usuario.ci}>{usuario.name}</option>
                    ))}
                </select>
            </div>

            {reporte && (
                <div>
                    <p>C&eacute;dula: {reporte.ci}</p>
                    <p>Nombre: {reporte.nombre}</p>
                    <p>Rol: {reporte.rol===1? "Admin": "Operario"}</p>

                    <p>Unidades Contadas: {reporte.unidadesContadas}</p>
                    <p>Horas de Conteo: {reporte.totalHoras}</p>
                    <p>Promedio de Unidades por Hora: {reporte.promedio}</p>
                </div>
            )}
        </div>
    );
}


export default ReporteProductividadOperarioMensualContenido;