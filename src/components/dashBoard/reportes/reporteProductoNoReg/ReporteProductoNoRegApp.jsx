import { useDispatch } from 'react-redux';
import ReporteProductoNoRegContenido from './ReporteProductoNoRegContenido'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';

const ReporteProductoNoRegApp = () => {
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
            <ReporteProductoNoRegContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteProductoNoRegApp