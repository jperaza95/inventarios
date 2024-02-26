import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IrAlInicio from '../../../IrAlInicio';
import ExportarPDFButton from '../../../reutilizables/ExportarPDFButton';
import Paginador from '../../../reutilizables/Paginador';

const ReporteDeAreasNoContadas = ({ idInventario }) => {

    const [areasNoContadas, setAreasNoContadas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [totalPages, setTotalPages] = useState(0);
    const [totalAreas, setTotalAreas] = useState(0);

    const handlePageClick = (pageNumber) => {
        if (pageNumber <= 0) {
            pageNumber = 1;
        }
        if (pageNumber === totalPages + 1) {
            pageNumber = totalPages;
        }

        setCurrentPage(pageNumber);
    };


    const fetchAreasNoContadas = async (pageNumber) => {


        try {

                const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteAreasNoContadas/${idInventario}?numeroPagina=${pageNumber}&tamanioPagina=10`);

                const data = await response.json();

                if (data.o && data.o !== undefined) {

                   setAreasNoContadas(data.o.areasNoContadas);
   
                }

                if (data.o && data.o.totalPages !== undefined) {
                    setTotalPages(data.o.totalPages);
                    setTotalAreas(data.o.totalAreas);

                }

            } catch (error) {
                console.error('Error en el fetch de areas no contadas:', error);
            }
        

    };

    useEffect(() => {
        fetchAreasNoContadas(currentPage);
        console.log(areasNoContadas);

    }, [idInventario, currentPage]);

    if (!areasNoContadas) {
        return <div>Cargando...</div>;
    }


    return (
        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>

                        <IrAlInicio titulo="&Aacute;reas no contadas" descripcion="Lista de &aacute;reas no contadas" />


                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th scope="col">C&oacute;digo</th>
                                    <th scope="col">Descripci&oacute;n</th>

                                </tr>
                            </thead>
                            <tbody>

                                {areasNoContadas && areasNoContadas.map(area => (
                                    <tr key={area.codigo}>
                                        <td>
                                            {area.codigo}
                                        </td>
                                        <td>
                                            {area.name}

                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                            <p>
                                Total de &aacute;reas no contadas: {totalAreas}
                        </p>

                    </div>

                    <div className="d-flex p-2 justify-content-between">

                     <Paginador currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />

                    <ExportarPDFButton ruta={`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ReporteAreasNoContadasPDF/${idInventario}`} />


                    </div>
                </div>
            </div>
        </div>

    );
}

export default ReporteDeAreasNoContadas;