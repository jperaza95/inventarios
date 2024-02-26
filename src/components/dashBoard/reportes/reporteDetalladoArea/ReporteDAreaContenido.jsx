/* eslint-disable no-unused-vars */
import React from 'react'
import IrAlInicio from '../../../IrAlInicio'
import { useState, useEffect } from 'react';

import ExportarPDFButton from '../../../reutilizables/ExportarPDFButton';
import Paginador from '../../../reutilizables/Paginador';
import AreaConStocks from './AreaConStocks';






const ReporteDAreaContenido = ({ idInventario }) => {

    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [totalPages, setTotalPages] = useState(0);

    const handlePageClick = (pageNumber) => {
        if (pageNumber <= 0) {
            pageNumber = 1;
        }
        if (pageNumber === totalPages + 1) {
            pageNumber = totalPages;
        }

        setCurrentPage(pageNumber);
    };


    const [exito, setExito] = useState(false);

    const [areaInicio, setAreaInicio] = useState('');
    const [areaFin, setAreaFin] = useState('');

    const [areasConStocksOrdenados, setAreasConStocksOrdenados] = useState([]);


    useEffect(() => {
        fetchReporteDetalladoArea(currentPage);

    }, [idInventario, currentPage, areaInicio, areaFin]);

    const fetchReporteDetalladoArea = async (pageNumber) => {
        try {
            if (areaInicio && areaInicio != "" && areaFin && areaFin != "") {


                const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteDetalladoAreas/${idInventario}?numeroPagina=${pageNumber}&tamanioPagina=10&areaDesde=${areaInicio}&areaHasta=${areaFin}`);

                const data = await response.json();

                if (data.o && data.o.reportePaginado !== undefined) {
                    console.log("Reporte detallado areas ", data);
                    setAreasConStocksOrdenados(data.o.reportePaginado);
                }

                if (data.o && data.o.totalPages !== undefined) {
                    setTotalPages(data.o.totalPages);
                }
            }

        } catch (error) {
            console.error('Error en el fetch del reporte inventario:', error);
        }
    };


    if (!areasConStocksOrdenados) {
        return <div>Cargando...</div>;
    }


    return (



        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>

                        {/*<IrAlInicio titulo="Sucursales" descripcion={`Listado de sucursales del cliente ${clienteEncontrado && clienteEncontrado.name}`} />*/}
                        <IrAlInicio titulo="Reporte detallado por &aacute;reas" descripcion="Reporte de inventario por &aacute;reas" />
                        <div className="form-group col-md-3">
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                placeholder="&Aacute;rea Inicio"
                                value={areaInicio}
                                onChange={e => setAreaInicio(e.target.value)}
                                min="0"
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                placeholder="&Aacute;rea Fin"
                                value={areaFin}
                                onChange={e => setAreaFin(e.target.value)}
                                min="0"
                            />
                        </div>


                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">CodProd</th>
                                    <th scope="col">Forma de ingreso</th>
                                    <th scope="col">Stock parcial</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">#&Aacute;rea</th>
                                    <th scope="col">Nombre &Aacute;rea</th>
                                </tr>
                            </thead>
                            <tbody>
                                {areasConStocksOrdenados && areasConStocksOrdenados.map(areaConSt => (

                                    <AreaConStocks key={areaConSt.codigoArea} areaSt={areaConSt} setExito={setExito}></AreaConStocks>

                                ))}
                            </tbody>
                        </table>




                    </div>
                        <div className="d-flex p-2 justify-content-between">
                            
                        <Paginador currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
                        <ExportarPDFButton ruta={`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteDetalladoAreasPDF/${idInventario}?areaDesde=${areaInicio}&areaHasta=${areaFin}`} />
                        </div>
                </div>
            </div>
        </div>

    )
}

export default ReporteDAreaContenido