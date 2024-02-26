import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login';
import './App.css';
import Registro from './components/register/Registro';
import AgregarCliente from './components/Dashboard/cliente/addClientes/AgregarCliente'
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import ListadoCliApp from './components/dashBoard/cliente/listadoClientes/ListadoCliApp';
import ListadoSucursalesApp from './components/dashBoard/sucursal/listadoSucursal/ListadoSucursalesApp';
import UpdateCliApp from './components/dashBoard/cliente/updateClientes/UpdateCliApp';
import UpdateSucursalApp from './components/dashBoard/sucursal/updateSucursal/UpdateSucursalApp';
import CargaDeMaestro from './components/cargaExcel/CargaDeMaestro';
import CalculoPersonalApp from './components/dashBoard/calculoPersonal/CalculoPersonalApp';
import InventariosApp from './components/dashBoard/inventarios/InventariosApp';
import ListadoInventarioApp from './components/dashBoard/listadoIventario/ListadoInventarioApp';
import VerMaestro from './components/dashBoard/inventarios/VerMaestro';
import ListadoAreaApp from './components/dashBoard/area/listadoArea/ListadoAreaApp'
import UpdateInvApp from './components/dashBoard/listadoIventario/UpdateInvApp';
import ReporteInventarioApp from './components/dashBoard/reportes/reporteInventario/ReporteInventarioApp';
import ReporteCronologicoApp from './components/dashBoard/reportes/reporteCronologico/ReporteCronologicoApp';
import ReporteDAreaApp from './components/dashBoard/reportes/reporteDetalladoArea/ReporteDAreaApp';
import ReporteAreasNoContadasApp from './components/dashBoard/reportes/reporteAreaNoContadas/ReporteAreasNoContadasApp';
import ReporteAvanceAreaApp from './components/dashBoard/reportes/reporteAvanceArea/ReporteAvanceAreaApp';
import ReporteProductividadOperarioApp from './components/dashBoard/reportes/reporteProductividadOperario/ReporteProductividadOperarioApp';
import ReporteDeVariacionApp from './components/dashBoard/reportes/reporteDeVariacion/ReporteDeVariacionApp';
import ReporteProductoApp from './components/dashBoard/reportes/reportePorProducto/ReporteProductoApp';
import ReporteProductoNoRegApp from './components/dashBoard/reportes/reporteProductoNoReg/ReporteProductoNoRegApp';
import ReporteProductividadOperarioMensualApp from './components/dashBoard/reportes/reporteProductividadOperarioMensual/ReporteProductividadOperarioMensualApp';
import UpdateArea from './components/dashBoard/area/updateArea/UpdateArea';

function App() {
    return (

        <Provider store={store}>
            <BrowserRouter>
                <Routes>

                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Dashboard />}>

                        <Route path='agregarcliente' element={<AgregarCliente />} />
                        <Route path='listadoclientes/*' element={<ListadoCliApp />} />
                        <Route path='listadosucursales/:idCliente' element={<ListadoSucursalesApp />} />
                        <Route path='updateCliente/:idCliente' element={<UpdateCliApp />} />
                        <Route path='updateSucursal/:idSucursal' element={<UpdateSucursalApp />} />
                        <Route path='calculoPersonal' element={<CalculoPersonalApp/>} />
                        <Route path='maestros/:idInventario' element={<CargaDeMaestro/>} />
                        <Route path='agregarinventario/:idSucursal' element={<InventariosApp />} />
                        <Route path='listarinventarios/:idSucursal' element={<ListadoInventarioApp />} />
                        <Route path='vermaestro/:idInventario' element={<VerMaestro />} />
                        <Route path='registro' element={<Registro />} />
                        <Route path='listarareas/:idInventario' element={<ListadoAreaApp />} />
                        <Route path='updateInventario/:idInventario' element={<UpdateInvApp />} />
                        <Route path='reporteInventario/:idInventario' element={<ReporteInventarioApp />} />
                        <Route path='reporteCronologico/:idInventario' element={<ReporteCronologicoApp />} />
                        <Route path='reporteDeArea/:idInventario' element={<ReporteDAreaApp />} />
                        <Route path='reporteDeAreasNoContadas/:idInventario' element={<ReporteAreasNoContadasApp />} />
                        <Route path='reporteAvanceAreas/:idInventario' element={<ReporteAvanceAreaApp />} />
                        <Route path='reporteProductividadOperario/:idInventario' element={<ReporteProductividadOperarioApp />} />
                        <Route path='reporteProductividadOperarioMensual/:idInventario' element={<ReporteProductividadOperarioMensualApp />} />
                        <Route path='reporteDeVariacion/:idInventario' element={<ReporteDeVariacionApp />} />
                        <Route path='reportePorProducto/:idInventario' element={<ReporteProductoApp />} />
                        <Route path='reporteProdNoReg/:idInventario' element={<ReporteProductoNoRegApp />} />
                        <Route path='updateArea/:idInventario/:idArea' element={<UpdateArea />} />



                        
                     </Route>
                    <Route path='*' element={<NotFound />} />

                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;









//import React, { Component } from 'react';

//export default class App extends Component {
//    static displayName = App.name;

//    constructor(props) {
//        super(props);
//        this.state = { forecasts: [], loading: true };
//    }

//    componentDidMount() {
//        this.populateWeatherData();
//    }

//    static renderForecastsTable(forecasts) {
//        return (
//            <table className='table table-striped' aria-labelledby="tabelLabel">
//                <thead>
//                    <tr>
//                        <th>Date</th>
//                        <th>Temp. (C)</th>
//                        <th>Temp. (F)</th>
//                        <th>Summary</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {forecasts.map(forecast =>
//                        <tr key={forecast.date}>
//                            <td>{forecast.date}</td>
//                            <td>{forecast.temperatureC}</td>
//                            <td>{forecast.temperatureF}</td>
//                            <td>{forecast.summary}</td>
//                        </tr>
//                    )}
//                </tbody>
//            </table>
//        );
//    }

//    render() {
//        let contents = this.state.loading
//            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//            : App.renderForecastsTable(this.state.forecasts);

//        return (
//            <div>
//                <h1 id="tabelLabel" >Weather forecast</h1>
//                <p>This component demonstrates fetching data from the server.</p>
//                {contents}
//            </div>
//        );
//    }

//    async populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        this.setState({ forecasts: data, loading: false });
//    }
//}
