import React, { useState, useEffect } from 'react';
import IrAlInicio from '../../../IrAlInicio';
import ProdsPorArea from './ProdsPorArea';
import Paginador from '../../../reutilizables/Paginador';
import ExportarPDFButton from '../../../reutilizables/ExportarPDFButton';

const ReporteProductoContenido = ({ idInventario }) => {

    const [reportePorProducto, setReportePorProducto] = useState([]);

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


    //useEffect(() => {
    //    const stockPorAreaYProducto = {};

    //    usuarios.forEach(usuario => {
    //        usuario.conteos.forEach(conteo => {
    //            if (conteo.inventory && conteo.inventory.idInventario === parseInt(idInventario)) {
    //                conteo.totalDeItemsContados.forEach(stock => {
    //                    const areaKey = stock.area.name;
    //                    const productoKey = stock.producto.codInterno;

    //                    if (!stockPorAreaYProducto[areaKey]) {
    //                        stockPorAreaYProducto[areaKey] = {};
    //                    }
    //                    if (!stockPorAreaYProducto[areaKey][productoKey]) {
    //                        stockPorAreaYProducto[areaKey][productoKey] = {
    //                            codInterno: stock.producto.codInterno,
    //                            desc: stock.producto.desc,
    //                            stockTotal: 0,
    //                            precio: stock.producto.precio,
    //                            costoTotal: 0
    //                        };
    //                    }
    //                    stockPorAreaYProducto[areaKey][productoKey].stockTotal += stock.stockParcial;
    //                    stockPorAreaYProducto[areaKey][productoKey].costoTotal = stockPorAreaYProducto[areaKey][productoKey].stockTotal * stockPorAreaYProducto[areaKey][productoKey].precio;
    //                });
    //            }
    //        });
    //    });

    //    setReportePorArea(stockPorAreaYProducto);
    //}, [usuarios, idInventario]);


    useEffect(() => {
        fetchReporteProducto(currentPage);

    }, [idInventario, currentPage]);

    const fetchReporteProducto = async (pageNumber) => {
        try {

            const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReportePorProducto/${idInventario}?numeroPagina=${pageNumber}&tamanioPagina=10`);

                const data = await response.json();

                if (data.o && data.o.reportePaginado !== undefined) {
                    console.log("Reporte detallado areas ", data);
                    setReportePorProducto(data.o.reportePaginado);
                }

                if (data.o && data.o.totalPages !== undefined) {
                    setTotalPages(data.o.totalPages);
                }
            

        } catch (error) {
            console.error('Error en el fetch del reporte inventario:', error);
        }
    };

    return (

            <div className="container mt-5">
                <div className='form-row justify-content-center'>
                    <div className='form-group col-md-10'>
                        <div className='form-row'>

                            {/*<IrAlInicio titulo="Sucursales" descripcion={`Listado de sucursales del cliente ${clienteEncontrado && clienteEncontrado.name}`} />*/}
                            <IrAlInicio titulo="Reporte por productos" descripcion="Reporte por productos, separado por &aacute;reas" />


                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">#&Aacute;rea</th>
                                    <th scope="col">Descripci&oacute;n</th>

                                    <th scope="col">Cod Prod</th>
                                    <th scope="col">Cod Barras</th>

                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Costo total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {reportePorProducto && reportePorProducto.map(reportePorProducto => (

                                    <ProdsPorArea key={reportePorProducto.codigoArea} reportePorProducto={reportePorProducto} setExito={setExito}></ProdsPorArea>

                                    ))}
                                </tbody>
                            </table>


                    </div>
                    <div className="d-flex p-2 justify-content-between">

                        <Paginador currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
                        <ExportarPDFButton ruta={`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReportePorProductoPDF/${idInventario}`}/>
                    </div>
                    </div>
                </div>
            </div>


    );
}

export default ReporteProductoContenido;
