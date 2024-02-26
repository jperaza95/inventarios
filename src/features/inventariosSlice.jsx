import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inventarios: [],
    filtro: "",
    idCliente: 0,
    idSucursal: 0,
    maestro: [],
    idInventario: 0,
    idInventarioActual: 0,
    inventarioActivo: null

}

export const inventariosSlice = createSlice({
    name: "inventarios",
    initialState,
    reducers: {
        setInventarios: (state, action) => {
            state.inventarios = action.payload;
            console.log("slice inventarios: ", state.inventarios);
        },

        agregarUnInventario: (state, action) => {
            console.log(action);
            const nuevosInventarios = [...state.inventarios];
            nuevosInventarios.push(action.payload);
            state.inventarios = nuevosInventarios;
            console.log("inventarios actualizado: ", state.inventarios);
        },

        borrarUnInventario: (state, action) => {
            //const id = action.payload;
            //state.clientes = state.clientes.filter((movimiento) => movimiento.id !== id);
            //console.log("Borrado, ", state.clientes);

            const id = action.payload;
            const nuevosInventarios = state.inventarios.filter(inventario => inventario.idInventario !== id);
            return {
                ...state,
                inventarios: nuevosInventarios,

            };


        },

        updateUnInventario: (state, action) => {
            //{ id: IdSucursal, nuevaSucursal: json.o }))
            const { id, nuevoInventario } = action.payload;
            console.log(id, nuevoInventario);
            const inventarioSeleccionado = state.inventarios.find(inventario =>
                inventario.idInventario === parseInt(id));

            if (inventarioSeleccionado !== null) {
                console.log(inventarioSeleccionado);
                const nuevosInventarios = state.inventarios.map(inventario => {
                    if (inventario.idInventario === parseInt(id)) {
                        return nuevoInventario;
                    } else {
                        return inventario;
                    }
                }
                );

                state.inventarios = nuevosInventarios;
            }
        },

        setFiltro: (state, action) => {
            //Filtro es un string de inventario name
            state.filtro = action.payload
        },

        setIdCliente: (state, action) => {
            state.idCliente = action.payload;
        },
        setIdSucursal: (state, action) => {
            state.idSucursal = action.payload;
        },
        setMaestro: (state, action) => {
            state.maestroDeProductos = action.payload;
        },
        setIdInventario: (state, action) => {
            state.idInventario = action.payload;
        },
        setIdInventarioActual: (state, action) => {
            state.idInventarioActual = action.payload;
        },
        agregarMaestroAInventario: (state, action) => {
            const { idInventario, nuevoMaestro } = action.payload;
            const inventario = state.inventarios.find((inventario) => inventario.idInventario === parseInt(idInventario));

            if (inventario) {
                // Utiliza 'push' para agregar la nueva sucursal al listado del cliente
                inventario.maestroDeProductos = [...nuevoMaestro];
                console.log(inventario);

                console.log(state.inventarios);
            }
        },


        
        agregarUnAreaAInventario: (state, action) => {
            const { id, nuevaArea } = action.payload;
            const inventario = state.inventarios.find((inv) => inv.idInventario === parseInt(id));
            
            if (inventario) {

                inventario.areas.push(nuevaArea);
            }
        },
        modificarAreasInventario: (state, action) => {
            const { id, nuevasAreas } = action.payload;
            const inventario = state.inventarios.find((inv) => inv.idInventario === parseInt(id));
            
            if (inventario) {

                inventario.areas = (nuevasAreas);
            }
        },
        borrarUnAreaAInventario: (state, action) => {
            const { idInv, idArea } = action.payload;
            const inventarioIndex = state.inventarios.findIndex((inv) => inv.idInventario === parseInt(idInv));

            if (inventarioIndex !== -1) {
                // Encuentra el índice del área a borrar dentro del inventario específico
                const areaIndex = state.inventarios[inventarioIndex].areas.findIndex((area) => area.idArea === parseInt(idArea));

                if (areaIndex !== -1) {
                    // Elimina el área del arreglo de áreas en el inventario específico
                    state.inventarios[inventarioIndex].areas.splice(areaIndex, 1); //Splice es para modificar el arreglo
                }
            }
        }


        //borrarUnMaestro: (state, action) => {

        //    const idInv = action.payload;
        //    const inventarioEncontrado = state.inventarios.find(inventario => inventario.idInventario === idInv);

        //    return {
        //        ...state,
        //        inventarios: .maestroDeProductos : [],

        //    };


        //},
        ,
        borrarUnMaestro: (state, action) => {
            const idInv = action.payload;
            const inventarioEncontrado = state.inventarios.find(inventario => inventario.idInventario === idInv);

            if (inventarioEncontrado) {
                return {
                    ...state,
                    inventarios: state.inventarios.map(inventario =>
                        inventario.idInventario === idInv
                            ? { ...inventario, maestroDeProductos: [] }
                            : inventario
                    ),
                };
            }

            // Devuelve el estado sin cambios si no se encuentra el inventario
            return state;
        },
        setInventarioActivo: (state, action) => {
            state.inventarioActivo = action.payload;
        },

    },

},
);

export const { borrarUnAreaAInventario,modificarAreasInventario,agregarUnInventario, setInventarios, updateUnInventario, setFiltro, borrarUnInventario, setIdCliente, setIdSucursal, setMaestro, setIdInventario, agregarMaestroAInventario, borrarUnMaestro, agregarUnAreaAInventario, setIdInventarioActual, setInventarioActivo } = inventariosSlice.actions;
export default inventariosSlice.reducer;