import { useEffect } from 'react';
import ReporteProductividadOperarioContenido from './ReporteProductividadOperarioContenido'
import { useParams } from 'react-router-dom';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';
import { useDispatch } from 'react-redux';

const ReporteProductividadOperarioApp = () => {
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
            <ReporteProductividadOperarioContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteProductividadOperarioApp