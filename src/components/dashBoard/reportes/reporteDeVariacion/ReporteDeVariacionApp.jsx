import { useDispatch } from 'react-redux';
import ReporteDeVariacionContenido from './ReporteDeVariacionContenido'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';

const ReporteDeVariacionApp = () => {
    const dispatch = useDispatch();
    const {idInventario} = useParams();

    useEffect(() => {
        dispatch(setIdInventarioActual(idInventario));

        return () => {
            dispatch(setIdInventarioActual(0));
        }
    }, []);

    return (
        <div>
            <ReporteDeVariacionContenido  />
        </div>
    );
};

export default ReporteDeVariacionApp