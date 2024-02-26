import { useEffect } from 'react';
import ReporteDAreaContenido from './ReporteDAreaContenido'
import { useParams } from 'react-router-dom';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';
import { useDispatch } from 'react-redux';

const ReporteDAreaApp = () => {
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
            <ReporteDAreaContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteDAreaApp