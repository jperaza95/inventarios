import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sucursales: [],
    idCliente: 0,
    nombreCliente: "",
    filtroSucursal: ""

}


export const sucursalesSlice = createSlice({
    name: "sucursales",
    initialState,
    reducers: {
        setSucursales: (state, action) => {
            state.sucursales = action.payload;
            console.log("setsucursalesssucursales: ", state.sucursales);
            console.log("setsucursalesssucursales payload: ", action.payload);

        },

        agregarUnaSucursal: (state, action) => {
            console.log(action);
            //immer
            //state.sucursales.push(action.payload);
            const nuevasSucursales = [...state.sucursales, action.payload];
            state.sucursales = nuevasSucursales;
            console.log(state.sucursales);


        }, borrarUnaSucursal: (state, action) => {

            const id = action.payload;
            state.sucursales = state.sucursales.filter((suc) => suc.idSucursal !== id);


            //updateSucursalesDeUnCliente(state.idCliente, state.sucursales)

        },

        updateUnaSucursal: (state, action) => {
            //El payload espera un id de la sucursal a actualizar, y la nueva sucursal
            const { id, nuevaSucursal } = action.payload;
            const index = state.sucursales.findIndex(sucursal => sucursal.idSucursal === id);

            if (index !== -1) {
                // Usamos Immer para actualizar el estado de manera inmutable
                state.sucursales[index] = nuevaSucursal;
                //updateSucursalesDeUnCliente(state.idCliente, state.sucursales)
            }
        }, setIdCliente: (state, action) => {

            state.idCliente = action.payload
        }, setNombreCliente: (state, action) => {

            state.nombreCliente = action.payload
        }, setFiltroSucursal: (state, action) => {
            //Filtro es un string de cliente name
            state.filtroSucursal = action.payload

        }, updateInventariosDeUnaSucursal: (state, action) => {
            const { id, nuevoInventario } = action.payload;
            const sucursal = state.sucursales.find((suc) => suc.idSucursal === parseInt(id));

            if (sucursal) {

                sucursal.inventarios.push(nuevoInventario);
            }
        },
        agregarMaestroAInventarioYSucursal: (state, action) => {
            const { idInventario, nuevoMaestro } = action.payload;
            const sucursalEncontrada = state.sucursales.find(sucursal =>
                sucursal.inventarios.some(inventario => inventario.idInventario === parseInt(idInventario))
            );

            if (sucursalEncontrada) {
                const inventarioEncontrado = sucursalEncontrada.inventarios.find(inventario => inventario.idInventario === parseInt(idInventario)); 
                if (inventarioEncontrado) {
                    inventarioEncontrado.maestroDeProductos = [...nuevoMaestro];
                }

                
            }
        },

        borrarUnInventarioDeUnaSucursal: (state, action) => {
            const { idInventario } = action.payload;
            console.log("idinventario",idInventario);
            const sucursalEncontrada = state.sucursales.find(sucursal =>
                sucursal.inventarios.some(inventario => inventario.idInventario === parseInt(idInventario))
            );
            console.log("sucursalencontrada", sucursalEncontrada);

            if (sucursalEncontrada) {
                //const inventarioEncontrado = sucursalEncontrada.inventarios.find(inventario => inventario.idInventario === parseInt(idInventario)); 
                sucursalEncontrada.inventarios = sucursalEncontrada.inventarios.filter((inv) => inv.idInventario !== idInventario);

            }
        },

        updateUnInventarioDeUnaSuc: (state, action) => {
           
            const { id, nuevoInventario } = action.payload;
            
            const sucursalSeleccionada = state.sucursales.find(sucursal =>
                sucursal.inventarios.some(inventario => inventario.idInventario === parseInt(id))
            );

            if (sucursalSeleccionada) {
                const nuevosInventarios = sucursalSeleccionada.inventarios.map(inventario => {
                    if (inventario.idInventario === parseInt(id)) {
                        return nuevoInventario;
                    } else {
                        return inventario;
                    }
                }
                );
                sucursalSeleccionada.inventarios = nuevosInventarios;
            }
        }


    }
});

export const { agregarUnaSucursal, setFiltroSucursal, setNombreCliente, borrarUnaSucursal, updateUnaSucursal, setIdCliente, setSucursales, updateInventariosDeUnaSucursal, agregarMaestroAInventarioYSucursal, borrarUnInventarioDeUnaSucursal, updateUnInventarioDeUnaSuc } = sucursalesSlice.actions;
export default sucursalesSlice.reducer;