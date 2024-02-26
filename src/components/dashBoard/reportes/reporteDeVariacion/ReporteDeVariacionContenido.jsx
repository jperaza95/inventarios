import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IrAlInicio from '../../../IrAlInicio';
import { useParams } from '../../../../../node_modules/react-router-dom/dist/index';
import Paginador from '../../../reutilizables/Paginador';
import ExportarPDFButton from '../../../reutilizables/ExportarPDFButton';



const ReporteDeVariacionContenido = () => {
    const inventarios = useSelector(state => state.inventarios.inventarios);
    const idInventario = useParams();

    // Estado para almacenar el inventario seleccionado
    const [inventarioSeleccionado, setInventarioSeleccionado] = useState(idInventario);
    const [mostrarSinDiferencia, setMostrarSinDiferencia] = useState(false);
    const [productosConDiferencia, setProductosConDiferencia] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [totalPages, setTotalPages] = useState(0);

    const [maestro, setMaestro] = useState([]);

    const handleInventarioChange = (e) => {
        setInventarioSeleccionado(e.target.value);
    };

    const toggleMostrarSinDiferencia = () => {
        setMostrarSinDiferencia(!mostrarSinDiferencia);
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


    const fetchMaestro = async (pageNumber) => {
        if (maestro) {


            const inventarioId = parseInt(inventarioSeleccionado, 10);
            console.log("inv seleccionado: ", inventarioId);
            if (!isNaN(inventarioId)&&inventarioId!=-1) {


                try {
                    const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/${inventarioId}?numeroPagina=${pageNumber}&tamanioPagina=10`);

                    const data = await response.json();
                    if (data.o && data.o.maestroPaginado) {
                        setMaestro(data.o.maestroPaginado);
                    }
                    if (data.o && data.o.totalPages !== undefined) {
                        setTotalPages(data.o.totalPages);
                    }


                } catch (error) {
                    console.error('Error en el fetch del reporte de productividad: ', error);
                }
            }
        }

    };



    useEffect(() => {
        fetchMaestro(currentPage);
    }, [inventarioSeleccionado]);

    if (!maestro) {
        return <div>Cargando...</div>;
    }





    return (
        <div className="container mt-5">


            <IrAlInicio titulo="Reporte de Variaci&oacute;n" descripcion="Variaci&oacute;n entre cantidades te&oacute;ricas y reales" />
            <br></br>
            {/* Selector de inventario */}
            <div className="form-group col-md-7">

                <select className="form-control selectpicker" value={inventarioSeleccionado} onChange={handleInventarioChange}>
                    <option key={-1} value={-1}>Seleccione un inventario</option>
                    {inventarios.map(inventario => (
                        <option key={inventario.idInventario} value={inventario.idInventario}>{inventario.nombreInventario}</option>
                    ))}
                </select>
            </div>


            {/* Checkbox para mostrar productos sin diferencia */}
            {/*<label>*/}
            {/*    <input*/}
            {/*        type="checkbox"*/}
            {/*        checked={mostrarSinDiferencia}*/}
            {/*        onChange={toggleMostrarSinDiferencia}*/}
            {/*    />*/}
            {/*    Mostrar productos sin diferencia*/}
            {/*</label>*/}

            {/* Tabla de productos con diferencias */}
            {inventarioSeleccionado !== "-1" && maestro && !isNaN(inventarioSeleccionado)?(
                maestro.length > 0 ? (
                    <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>C&oacute;digo Interno</th>
                                <th>Descripci&oacute;n</th>
                                <th>Stock Te&oacute;rico</th>
                                <th>Stock Real</th>
                                <th>Diferencia</th>
                                <th>Importe Diferencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maestro.map(producto => (
                                <tr key={producto.idProducto}>
                                    <td>{producto.codInterno}</td>
                                    <td>{producto.desc}</td>
                                    <td>{producto.stockTeorico}</td>
                                    <td>{producto.stockReal}</td>
                                    <td>{(producto.stockReal - producto.stockTeorico) > 0 ? "+" + (producto.stockReal - producto.stockTeorico) : (producto.stockReal - producto.stockTeorico)}</td>
                                    <td>{(producto.stockReal - producto.stockTeorico) > 0 ? "+$" + ((producto.stockReal - producto.stockTeorico) * producto.precio).toFixed(2) : "$-" + -((producto.stockReal - producto.stockTeorico) * producto.precio).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex p-2 justify-content-between">
                        <Paginador currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
                        <ExportarPDFButton ruta={`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteVariacionPDF/${idInventario}`} />

                    </div>
                    </>

                ) : (
                        <p>El inventario est&aacute; vac&iacute;o.</p>
                )
            ) : ""}

                    </div>

    );
}

export default ReporteDeVariacionContenido;