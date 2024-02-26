import { useEffect } from 'react';
import ReporteInventarioContenido from './ReporteInventarioContenido'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setIdInventarioActual } from '../../../../features/inventariosSlice';

const ReporteInventarioApp = () => {
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
            <ReporteInventarioContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteInventarioApp