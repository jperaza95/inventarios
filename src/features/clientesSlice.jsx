import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
import Cliente from "../components/dashBoard/cliente/listadoClientes/Cliente";

const initialState = {
    clientes: [],
    filtro: ""
}

export const clientesSlice = createSlice({
    name: "clientes",
    initialState,
    reducers: {
        setClientes: (state, action) => {
            state.clientes = action.payload;
            console.log(state.clientes);
        },

        agregarUnCliente: (state, action) => {
            console.log(action);
            //immer
            state.clientes.push(action.payload);
            console.log(state.clientes);
        },


        borrarUnCliente: (state, action) => {
            //const id = action.payload;
            //state.clientes = state.clientes.filter((movimiento) => movimiento.id !== id);
            //console.log("Borrado, ", state.clientes);

            const id = action.payload;
            const nuevosClientes = state.clientes.filter(cliente => cliente.idCliente !== id);
            return {
                ...state,
                clientes: nuevosClientes,

            };


        },

        updateUnCliente: (state, action) => {
            //El payload espera un id del cliente a actualizar, y el nuevoCliente
            const { id, nuevoCliente } = action.payload;
            const index = state.clientes.findIndex(cliente => cliente.idCliente === id);

            if (index !== -1) {
                // Usamos Immer para actualizar el estado de manera inmutable
                state.clientes[index] = nuevoCliente;
            }
        },

        setFiltro: (state, action) => {
            //Filtro es un string de cliente name
            state.filtro = action.payload
        }

        ,

        //updateSucursalesDeUnCliente: (state, action) => {
        //    const { id, nuevasSucursales } = action.payload;
        //    console.log("payload: ", action.payload);
        //    const cliente = state.clientes.find((cliente) => cliente.idCliente === id);
        //    console.log("cliente: ", cliente);

        //    if (cliente) {
        //        // Update the 'sucursales' attribute of the client
        //        cliente.sucursales = nuevasSucursales;
        //        updateUnCliente(cliente);
        //        console.log("cliente actualizado: ", cliente);
        //        console.log(state.clientes);
        //    }
        //},

        agregarSucursalAlCliente: (state, action) => {
            console.log("state: ", state.clientes, " action.payload: ", action.payload);
            const { idCliente, nuevaSucursal } = action.payload;
            const cliente = state.clientes.find((cliente) => cliente.idCliente === parseInt(idCliente));

            if (cliente) {
                // Utiliza 'push' para agregar la nueva sucursal al listado del cliente
                cliente.sucursales.push(nuevaSucursal);
            }
        },

        updateInventariosDeUnaSucursalDeUnCliente: (state, action) => {
            const { idCliente, idSucursal, nuevosInventarios } = action.payload;
            console.log(action.payload);
            const clienteIndex = state.clientes.findIndex((cliente) => cliente.idCliente === idCliente);
            console.log(clienteIndex);
            if (clienteIndex !== -1) {
                const sucursales = state.clientes[clienteIndex].sucursales;
                const sucursalIndex = sucursales.findIndex((sucursal) => sucursal.idSucursal === idSucursal);
                console.log(sucursalIndex);

                if (sucursalIndex !== -1) {
                    // Usamos Immer para actualizar el estado de manera inmutable 
                    const newState = produce(state, draftState => {
                        draftState.clientes[clienteIndex].sucursales[sucursalIndex].inventarios = nuevosInventarios;
                    });
                    // Actualizamos el estado global llamando a la función que maneja las actualizaciones generales 
                    console.log(newState);

                }
            }
        },
        updateAreDeUnInventariosDeUnaSucursalDeUnCliente: (state, action) => {
            const { idCliente, idSucursal, idInventario, nuevasAreas } = action.payload;

            const clienteIndex = state.clientes.findIndex((cliente) => cliente.idCliente === idCliente);

            if (clienteIndex !== -1) {
                const sucursales = state.clientes[clienteIndex].sucursales;
                const sucursalIndex = sucursales.findIndex((sucursal) => sucursal.idSucursal === idSucursal);

                if (sucursalIndex !== -1) {
                    const inventarios = sucursales[sucursalIndex].inventarios
                    const inventarioIndex = inventarios.findIndex((inventario) => inventario.idInventario === idInventario);

                    if (inventarioIndex !== -1) {
                        // Usamos Immer para actualizar el estado de manera inmutable
                        produce(state, draftState => {
                            draftState.clientes[clienteIndex].sucursales[sucursalIndex].inventarios[inventarioIndex].areas = nuevasAreas;
                        });

                        // Actualizamos el estado global llamando a la función que maneja las actualizaciones generales
                    }
                }
            }
        },



        updateUnaSucursalDeUnCliente: (state, action) => {
            //{ id: IdSucursal, nuevaSucursal: json.o }))
            const { idSucursal, nuevaSucursal } = action.payload;
            console.log(idSucursal, nuevaSucursal);
            const clienteSeleccionado = state.clientes.find(cliente =>
                cliente.sucursales.some(sucursal => sucursal.idSucursal === parseInt(idSucursal))
            );

            if (clienteSeleccionado) {
                const nuevasSucursales = clienteSeleccionado.sucursales.map(sucursal => {
                    if (sucursal.idSucursal === parseInt(idSucursal)) {
                        return nuevaSucursal;
                    } else {
                        return sucursal;
                    }
                }
                );
                clienteSeleccionado.sucursales = nuevasSucursales;
            }
        }
        ,
  

    borrarUnaSucursalDeUnCliente: (state, action) => {
        const { idSucursal } = action.payload;
        console.log("idSucursal", idSucursal);
            const clienteEncontrado = state.clientes.find(cliente =>
                cliente.sucursales.some(sucursal => sucursal.idSucursal === parseInt(idSucursal))
            );
        console.log("cliente encontrado", clienteEncontrado);

        if (clienteEncontrado) {
                //const inventarioEncontrado = sucursalEncontrada.inventarios.find(inventario => inventario.idInventario === parseInt(idInventario)); 
            clienteEncontrado.sucursales = clienteEncontrado.sucursales.filter((suc) => suc.idSucursal !== idSucursal);

            }
        },


    }
});

export const { updateAreaDeUnInventariosDeUnaSucursalDeUnCliente, agregarUnCliente, setClientes, updateSucursalesDeUnCliente, updateUnCliente, setFiltro, borrarUnCliente, agregarSucursalAlCliente, updateInventariosDeUnaSucursalDeUnCliente, updateAreDeUnInventariosDeUnaSucursalDeUnCliente, updateUnaSucursalDeUnCliente, borrarUnaSucursalDeUnCliente } = clientesSlice.actions;
export default clientesSlice.reducer;