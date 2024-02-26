import { useDispatch } from 'react-redux';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';
import ReporteCronologicoContenido from './ReporteCronologicoContenido'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ReporteCronologicoApp = () => {
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
            <ReporteCronologicoContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteCronologicoApp