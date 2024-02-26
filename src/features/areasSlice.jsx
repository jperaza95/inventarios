import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    areas: [],
    nombreCliente:"",
    idCliente: 0,
    idSucursal: 0,
    idInventario: 0,
    filterArea:"",
}

export const areasSlice = createSlice({
    name: "areas",
    initialState,
    reducers: {
        setFilterArea: (state, action) => {
            state.filterArea = action.payload;
        },
        setAreas: (state, action) => {
            state.areas = action.payload;
        },

        agregarUnArea: (state, action) => {
            //immer
            state.areas=action.payload;
        },

        borrarUnArea: (state, action) => {
            //const id = action.payload;
            //state.clientes = state.clientes.filter((movimiento) => movimiento.id !== id);
            //console.log("Borrado, ", state.clientes);

            const id = action.payload;
            const nuevasAreas = state.areas.filter(area => area.idArea !== id);
            return {
                ...state,
                areas: nuevasAreas,

            };


        },

        updateUnArea: (state, action) => {
            //El payload espera un id del cliente a actualizar, y el nuevoCliente
            const { id, nuevaArea } = action.payload;
            const index = state.areas.findIndex(area => area.idArea === id);

            if (index !== -1) {
                // Usamos Immer para actualizar el estado de manera inmutable
                state.areas[index] = nuevaArea;
            }
        },

        setIdClienteArea: (state, action) => {
            state.idCliente = action.payload;
        },
        setIdSucursalArea: (state, action) => {
            state.idSucursal = action.payload;
        },
        setIdInventarioArea: (state, action) => {
            state.idInventario = action.payload;
        },
    }
});

export const { setIdClienteArea, setIdSucursalArea, setIdInventarioArea,setFilterArea,updateUnArea, borrarUnArea, agregarUnArea, setAreas } = areasSlice.actions;
export default areasSlice.reducer;