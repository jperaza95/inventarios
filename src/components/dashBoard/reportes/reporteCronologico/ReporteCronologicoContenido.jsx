/* eslint-disable no-unused-vars */

import { useSelector } from 'react-redux'
import IrAlInicio from '../../../IrAlInicio'
import { useState, useEffect } from 'react'
import StockCrono from './StockCrono'
import Paginador from '../../../reutilizables/Paginador'
import ExportarPDFButton from '../../../reutilizables/ExportarPDFButton'



const ReporteCronologicoAppContenido = ({ idInventario }) => {


    const usuarios = useSelector((state) => state.usuarios.usuarios);

    //const [stockCronologicos,setStockCronologicos] = useState([]);
    const [stockCronologicosOrdenados, setStockCronologicosOrdenados] = useState([]);

    // Estado para almacenar la selección del usuario
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(-1);

    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [totalPages, setTotalPages] = useState(0);


    // Manejar el cambio de selección
    const handleSelectChange = (e) => {
        setUsuarioSeleccionado(e.target.value);
        //fetchReporteCronologico(currentPage);
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

    // Encuentra el usuario seleccionado basado en su ID
    const usuario = useSelector(state =>
        state.usuarios.usuarios.find(u => u.ci === parseInt(usuarioSeleccionado, 10))
    );




    const fetchReporteCronologico = async (pageNumber) => {
        if (usuario && usuario.ci) {

            try {
                console.log("numero pagina: ", pageNumber);
                const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteCronologico/${idInventario}/${usuario.ci}?numeroPagina=${pageNumber}&tamanioPagina=10`);

                const data = await response.json();

                if (data.o && data.o.reportePaginado !== undefined) {
                    console.log("data ", data);
                    setStockCronologicosOrdenados(data.o.reportePaginado);
                    console.log(stockCronologicosOrdenados)
                }

                if (data.o && data.o.totalPages !== undefined) {
                    setTotalPages(data.o.totalPages);
                }

            } catch (error) {
                console.error('Error en el fetch del reporte cronologico:', error);
            }
        }

    };


    useEffect(() => {
        fetchReporteCronologico(currentPage);
    }, [idInventario, currentPage, usuario]); 

    if (!stockCronologicosOrdenados) {
        return <div>Cargando...</div>;
    }




    return (



        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>

                        <IrAlInicio titulo="Reporte cronol&oacute;gico" descripcion="Reporte cronol&oacute;gico de conteos con colector" />

                        <div className="form-group col-md-7 mt-5">

                            <select className="form-control selectpicker" value={usuarioSeleccionado} onChange={handleSelectChange}>
                                <option key={-1} value={-1} >Seleccione un usuario</option>
                                {usuarios.map(usuario => (
                                    <option key={usuario.ci} value={usuario.ci}>{usuario.name}</option>
                                ))}
                            </select>
                        </div>

                        {usuario && usuario.ci &&
           
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

                                        {stockCronologicosOrdenados.map(sc => (
                                            <StockCrono
                                                key={sc.idStockCronologico}
                                                producto={sc.producto}
                                                codProd={sc.producto}
                                                stockParcial={sc.stockParcial}
                                                horaStocked={sc.horaStocked}
                                                area={sc.area}

                                            />
                                        ))}

                                    </tbody>



                                </table>


                        }


                    </div>
                    {usuario && usuario.ci && <div className="d-flex p-2 justify-content-between">
                        <Paginador currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
                        <ExportarPDFButton ruta={`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteCronologicoPDF/${idInventario}/${usuario.ci}`} />

                    </div>}
                </div>
            </div>
        </div>

    )
}

export default ReporteCronologicoAppContenido