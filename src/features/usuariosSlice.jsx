import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuarios: []

}

export const usuariosSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {
        
        setUsuarios: (state, action) => {
            state.usuarios = action.payload;
            console.log(state.usuarios);
        },

        agregarUsuario: (state, action) => {
            //immer
            state.usuarios.push(action.payload);
        },

        borrarUnUsuario: (state, action) => {
            //const id = action.payload;
            //state.clientes = state.clientes.filter((movimiento) => movimiento.id !== id);
            //console.log("Borrado, ", state.clientes);

            const id = action.payload;
            const nuevosUsuarios = state.areas.filter(usuario => usuario.idUsuario !== id);
            return {
                ...state,
                usuarios: nuevosUsuarios,

            };


        }


    }
});

export const { borrarUnUsuario, agregarUsuario, setUsuarios } = usuariosSlice.actions;
export default usuariosSlice.reducer;