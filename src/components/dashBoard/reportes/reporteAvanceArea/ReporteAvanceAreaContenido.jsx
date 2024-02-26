import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ReporteDeAvanceDeAreaContenido = ({ idInventario }) => {

    const [reporteAvance, setReporteAvance] = useState(null);



    const fetchAvanceAreas = async () => {


        try {

            const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteAvanceAreas/${idInventario}`);
            const data = await response.json();
                console.log("data de avance: ",data);

            if (data.o && data.o !== undefined) {

                setReporteAvance(data.o);
            }

        } catch (error) {
            console.error('Error en el fetch de areas no contadas:', error);
        }


    };

    useEffect(() => {
        fetchAvanceAreas();

    }, [idInventario]);

    if (!reporteAvance) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mt-5">
            <p>Total de &Aacute;reas: {reporteAvance.totalDeAreas}</p>
            <p>&Aacute;reas Contadas: {reporteAvance.areasContadas}</p>
            <p>&Aacute;reas Restantes: {reporteAvance.totalDeAreas-reporteAvance.areasContadas}</p>

            <p>Porcentaje de Avance: {(((reporteAvance.areasContadas) / reporteAvance.totalDeAreas) * 100).toFixed(0)}%</p>

        </div>
    );
}

export default ReporteDeAvanceDeAreaContenido;