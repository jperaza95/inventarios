import { useDispatch } from 'react-redux';
import ReporteProductoContenido from './ReporteProductoContenido'
import { useParams } from 'react-router-dom';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';
import { useEffect } from 'react';

const ReporteProductoApp = () => {
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
            <ReporteProductoContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteProductoApp