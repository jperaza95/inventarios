/*import React from 'react'*/
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CalculoPersonal from './CalculoPersonal'





const CalculoPersonalContenido = () => {
    const calculosPersonales = useSelector(state => state.calculosPersonales.calculosPersonales);
    const clienteFilter = useSelector(state => state.calculosPersonales.filterCliente);
    const sucursalFilter = useSelector(state => state.calculosPersonales.filterSucursal);
    const dateFilter = useSelector(state => state.calculosPersonales.filterDate);

    // Estado para almacenar los cálculos filtrados
    const [filteredCalculos, setFilteredCalculos] = useState([]);

    useEffect(() => {
        // Aplicar filtros
        const newFilteredCalculos = calculosPersonales.filter(calculoPersonal => {

            // Filtro por idCliente
            const clienteFilterCondition = clienteFilter != 0 ? calculoPersonal.idCliente == clienteFilter : true;

            // Filtro por idSucursal
            const sucursalFilterCondition = (clienteFilter != 0 && sucursalFilter != 0) ? calculoPersonal.idSucursal == sucursalFilter : true;

            // Filtro por fecha (dateFilter no debe ser "")
            const dateFilterCondition = dateFilter != undefined && dateFilter != "" ? calculoPersonal.dateCalculoPersonal === dateFilter : true;

            // Se cumplen todas las condiciones
            return clienteFilterCondition && sucursalFilterCondition && dateFilterCondition;
        });

        // Actualizar el estado con los cálculos filtrados
        setFilteredCalculos(newFilteredCalculos);

    }, [clienteFilter, sucursalFilter, dateFilter, calculosPersonales]);
    

    return (
        <div className="container" >
           
                    <div className='form-row'>

                        <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Sucursal</th>
                        <th scope="col">Seccion</th>
                        <th scope="col">Duracion</th>
                        <th scope="col">Hora inicio</th>
                        <th scope="col">Transporte</th>
                                    <th scope="col">Cena</th>
                                    <th scope="col">Jornada</th>
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>



                    </tr>
                </thead>
                <tbody>
            {filteredCalculos.map(calculoPersonal => (
                <CalculoPersonal key={calculoPersonal.idCalculoPersonal} {...calculoPersonal} />
            ))}
                </tbody>



            </table>
                </div>
            </div>
        
    );
};

export default CalculoPersonalContenido



