import { useEffect } from 'react';
import ReporteAreasNoContadasContenido from './ReporteAreasNoContadasContenido'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIdInventarioActual } from '../../../../features/inventariosSlice';

const ReporteAreasNoContadasApp = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIdInventarioActual(idInventario));
        return () => {
            dispatch(setIdInventarioActual(0));
        }
    }, []);

    const { idInventario } = useParams();

    return (
        <div>
            <ReporteAreasNoContadasContenido idInventario={idInventario} />
        </div>
    );
};

export default ReporteAreasNoContadasApp