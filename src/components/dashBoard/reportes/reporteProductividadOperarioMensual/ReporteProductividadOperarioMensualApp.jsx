import { useDispatch } from 'react-redux';
import ReporteProductividadOperarioMensualContenido from './ReporteProductividadOperarioMensualContenido'
import { useParams } from 'react-router-dom';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';
import { useEffect } from 'react';

const ReporteProductividadOperarioMensualApp = () => {
    const { idInventario } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIdInventarioActual(idInventario));
        return () => {
            dispatch(setIdInventarioActual(0));
        }
    }, []);


    return (
        <div>
            <ReporteProductividadOperarioMensualContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteProductividadOperarioMensualApp