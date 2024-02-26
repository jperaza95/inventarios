import { useDispatch } from 'react-redux';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';
import ReporteAvanceAreaContenido from './ReporteAvanceAreaContenido'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ReporteAvanceAreaApp = () => {


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
            <ReporteAvanceAreaContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteAvanceAreaApp