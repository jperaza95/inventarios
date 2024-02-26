
import IrAlInicio from '../../IrAlInicio';
import { useDispatch, useSelector } from 'react-redux';
import Producto from './Producto';
import { useParams, useNavigate } from 'react-router-dom';
import { borrarUnMaestro, setIdInventarioActual } from '../../../features/inventariosSlice';
import { useEffect, useRef, useState } from 'react';
import AlertDanger from '../../reutilizables/AlertDanger';
import AlertSuccess from '../../reutilizables/AlertSuccess';

import { agregarMaestroAInventario } from '../../../features/inventariosSlice';

import { agregarMaestroAInventarioYSucursal } from '../../../features/sucursalesSlice';
import ExportarPDFButton from '../../reutilizables/ExportarPDFButton';
import Paginador from '../../reutilizables/Paginador';




function VerMaestro() {
    let dispatch = useDispatch();

    let navigate = useNavigate();

    //const inventarios = useSelector(state => state.inventarios.inventarios);
    const file = useRef(null);
    const fileCargarConteo = useRef(null);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [collapseOpenCargarConteo, setCollapseOpenCargarConteo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        dispatch(setIdInventarioActual(idInventario));
        return () => {
            dispatch(setIdInventarioActual(0));
        }
    }, []);

    const { idInventario } = useParams();


    //const inventario = inventarios.find(inventario => inventario.idInventario === parseInt(idInventario));

    const [maestroDatos, setMaestroDatos] = useState(null);

    const inventario = maestroDatos;




    const fetchMaestro = async (pageNumber) => {
        try {
            const response = await fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/${idInventario}?numeroPagina=${pageNumber}&tamanioPagina=10`);

            const data = await response.json();

            if (data.o && data.o.maestroPaginado !== undefined) {
                console.log("data ", data);
                setMaestroDatos(data.o.maestroPaginado);
            }

            if (data.o && data.o.totalPages !== undefined) {
                setTotalPages(data.o.totalPages);
            }

        } catch (error) {
            console.error('Error en el fetch del maestro:', error);
        }
    };



    useEffect(() => {
        fetchMaestro(currentPage);
    }, [idInventario, currentPage]); // Agregar currentPage como dependencia

    if (!maestroDatos) {
        return <div>Cargando...</div>;
    }


    const eliminarMaestro = () => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/${idInventario}`, {

            method: 'DELETE',
            //body: JSON.stringify(objEliminar),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.codigo === 200) {
                    //setExito(true);
                    dispatch(borrarUnMaestro(idInventario));
                    console.log(json);
                    navigate(`/maestros/${idInventario}`);
                    alert("maestro eliminado");
                } else {
                    //setError(true);
                    //setMessage(json.mensaje)
                    alert("no se pudo eliminar el maestro");


                }
            });
    }

    const cargarStock = () => {
        const selectedFile = file.current.files[0];

        if (!selectedFile) {
            setMessage("Selecciona un archivo antes de intentar subirlo.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('idInventario', idInventario);
        console.log("cargar stock ", formData);


        let requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        console.log(requestOptions);
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/Maestro/CargarStock`, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.codigo === 200) {
                    setError(false);
                    setSuccess(true);
                    //dispatch(agregarUnMaestro(json.o)); TERMINAR - HACER SLICE MAESTRO
                    setMessage(result.mensaje);
                    dispatch(agregarMaestroAInventario({ idInventario, nuevoMaestro: result.o }));
                    dispatch(agregarMaestroAInventarioYSucursal({ idInventario, nuevoMaestro: result.o }));
                    // limpia el campo de entrada de archivo después de importar el archivo
                    file.current.value = null;
                    // cierra el collapse después de importar el archivo
                    setCollapseOpen(false);
                    console.log("collapse: " + collapseOpen);
                    console.log(result);
                    window.location.reload();

                } else {
                    console.log(result);
                    setSuccess(false);
                    setError(true);
                    setMessage(result.mensaje);
                }


            })
            .catch(error => {
                setError(true);
                setSuccess(false);

                console.log(error);
                console.log('error', error);
            });
    }

    const cargarConteo = () => {
        const selectedFile = fileCargarConteo.current.files[0];

        if (!selectedFile) {
            setMessage("Selecciona un archivo antes de intentar subirlo.");
            return;
        }

        const formData = new FormData();
        formData.append('ci', localStorage.getItem('ci'));
        formData.append('file', selectedFile);
        //formData.append('idInventario', idInventario);
        //formData.append('ci', localStorage.getItem('ci'));


        let requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/ConteoCronologico/CargarConteoPorExcel`, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.codigo === 200) {
                    setError(false);
                    setSuccess(true);
                    //dispatch(agregarUnMaestro(json.o)); TERMINAR - HACER SLICE MAESTRO
                    setMessage(result.mensaje);
                    //dispatch(agregarMaestroAInventario({ idInventario, nuevoMaestro: result.o }));
                    //dispatch(agregarMaestroAInventarioYSucursal({ idInventario, nuevoMaestro: result.o }));
                    // limpia el campo de entrada de archivo después de importar el archivo
                    file.current.value = null;
                    // cierra el collapse después de importar el archivo
                    setCollapseOpenCargarConteo(false);
                    console.log("collapse: " + collapseOpenCargarConteo);
                    console.log(result);
                    window.location.reload();

                } else {
                    console.log(result);
                    setSuccess(false);
                    setError(true);
                    setMessage(result.mensaje);
                }


            })
            .catch(error => {
                setError(true);
                setSuccess(false);

                console.log(error);
                console.log('error', error);
            });
    }

    if (!inventario) {
        //Caso donde inventario es undefined
        return <div>Cargando...</div>;
    }

    const handlePageClick = (pageNumber) => {
        if (pageNumber <= 0) {
            pageNumber = 1;
        }
        if (pageNumber === totalPages + 1) {
            pageNumber = totalPages;
        }

        setCurrentPage(pageNumber);
    };

    return (

        <div className="container mt-5">
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-10'>
                    <div className='form-row'>
                        <IrAlInicio titulo={"Maestro"} descripcion={`Maestro del inventario "${idInventario}"`}></IrAlInicio>
                        <div>
                            <button
                                type="button"
                                className="btn btn-danger mb-3"

                                onClick={eliminarMaestro}
                            >

                                Eliminar maestro
                            </button>

                            <p>

                                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#CargarStock`} aria-expanded="false" aria-controls={`CargarStock`} onClick={() => setCollapseOpen(!collapseOpen)}>
                                    Cargar Stock
                                </button>
                            </p>
                            <div className={`collapse`} id={`CargarStock`}>
                                <div className="card card-body form-row">
                                    <label htmlFor="formFile" className="form-label">Carga de stock, inventario {idInventario}</label>
                                    <input className="form-control" type="file" id="formFile" ref={file} />
                                </div>
                                <div className="form-group col-md-8 "><input type="button" className="btn btn-primary mt-4" value="Cargar" onClick={cargarStock} /></div>

                            </div>

                            <p>

                                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#CargarConteo`} aria-expanded="false" aria-controls={`CargarConteo`} onClick={() => setCollapseOpenCargarConteo(!collapseOpenCargarConteo)}>
                                    Cargar Conteo
                                </button>
                            </p>




                            <div className={`collapse mt-5`} id={`CargarConteo`}>
                                <div className="card card-body form-row">
                                    <label htmlFor="formFileCargarConteo" className="form-label">Carga de inventario por planilla, {idInventario}</label>
                                    <input className="form-control" type="file" id="formFileCargarConteo" ref={fileCargarConteo} />
                                </div>
                                <div className="form-group col-md-8 "><input type="button" className="btn btn-primary mt-4" value="Cargar" onClick={cargarConteo} /></div>

                            </div>

                            <ExportarPDFButton ruta={`https://inventarioswebapi1.azurewebsites.net/api/Maestro/ExportarPDF/${idInventario}`} />

                            {error && !success && <AlertDanger mensaje={message} />}
                            {success && !error && <AlertSuccess mensaje={message} />}

                        </div>




                        <table className="table table-striped mt-3" >
                            <thead>
                                <tr>
                                    <th scope="col">Cod. Interno</th>
                                    <th scope="col">Cod. de barra</th>
                                    <th scope="col">Descripci&oacute;n</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Familia</th>
                                    <th scope="col">Stock Te&oacute;rico</th>
                                    <th scope="col">Stock Real</th>

                                </tr>
                            </thead>
                            <tbody>


                                {/*{inventario && inventario.maestroDeProductos && inventario.maestroDeProductos.map(prod =>*/}

                                {/*    <Producto key={prod.idProducto} {...prod} />*/}
                                {/*)}*/}

                                {maestroDatos && maestroDatos.map(prod =>

                                    <Producto key={prod.idProducto} {...prod} />
                                )}


                            </tbody>
                        </table>

                    </div>

                    <Paginador currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />


                </div>
            </div>
        </div>

    );
}

export default VerMaestro;