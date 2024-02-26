
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IrAlInicio from '../../../IrAlInicio';
import ExportarPDFButton from '../../../reutilizables/ExportarPDFButton';
import Paginador from '../../../reutilizables/Paginador';

const ReporteInventarioContenido = ({ idInventario }) => {


    const [incluirManuales, setIncluirManuales] = useState(false);
    const [productosReporte, setProductosReporte] = useState(null);

    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [totalPages, setTotalPages] = useState(0);


    const toggleIncluirManuales = () => {
        setIncluirManuales(!incluirManuales);
    };

    const handlePageClick = (pageNumber) => {
        if (pageNumber <= 0) {
            pageNumber = 1;
        }
        if (pageNumber === totalPages + 1) {
            pageNumber = totalPages;
        }

        setCurrentPage(pageNumber);
    };

    const fetchReporteInventario = async (pageNumber) => {
        try {
            const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteInventarios/${idInventario}?numeroPagina=${pageNumber}&tamanioPagina=10`);

            const data = await response.json();

            if (data.o && data.o.reportePaginado !== undefined) {
                console.log("data ", data);
                setProductosReporte(data.o.reportePaginado);
            }

            if (data.o && data.o.totalPages !== undefined) {
                setTotalPages(data.o.totalPages);

            }

        } catch (error) {
            console.error('Error en el fetch del reporte inventario:', error);
        }
    };

    useEffect(() => {
        fetchReporteInventario(currentPage);
    }, [idInventario, currentPage]); // Agregar currentPage como dependencia

    if (!productosReporte) {
        return <div>Cargando...</div>;
    }



    return (
        <div className="container mt-5">
            <IrAlInicio titulo="Reporte de inventarios" descripcion={`Inventario: ${idInventario ? idInventario : "No existe el inventario con id " + idInventario}`} />
            {productosReporte && productosReporte.length > 0 ? (
                <div>
                    <div className="d-flex align-items-center">
                        <input
                            className="p-2 mr-2"
                            type="checkbox"
                            checked={incluirManuales}
                            onChange={toggleIncluirManuales}
                        />
                        <label className="mb-2 mt-2">Incluir productos dados de alta manualmente</label>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>C&oacute;digo Interno</th>
                                <th>Descripci&oacute;n</th>
                                <th>Cantidad Contada</th>
                                <th>Precio Unitario</th>
                                <th>Importe Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosReporte.map(prod => (
                                <tr key={prod.idProducto}>
                                    <td>{prod.codInterno}</td>
                                    <td>{prod.desc}</td>
                                    <td>{prod.stockReal}</td>
                                    <td>{prod.precio.toFixed(2)}</td>
                                    <td>{(prod.stockReal * prod.precio).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex p-2 justify-content-between">
                    <Paginador currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
                    <ExportarPDFButton ruta={`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteInventariosPDF/${idInventario}`} />
                    </div>

                </div>
            ) : (
                <p>El usuario a&uacute;n no hizo conteos</p>
            )}
        </div>
    );
}

export default ReporteInventarioContenido;
