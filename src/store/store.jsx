import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from "../features/rolesSlice";
import clientesReducer from "../features/clientesSlice"
import sucursalesReducer from "../features/sucursalesSlice"
import calculosPersonalesReducer from "../features/calculosPersonalesSlice"
import inventariosReducer from "../features/inventariosSlice"
import areasReducer from "../features/areasSlice"
import usuariosReducer from "../features/usuariosSlice"
import sesionReducer from "../features/sesionSlice"
 
export const store = configureStore({
    reducer: {
        clientes: clientesReducer,
        sucursales: sucursalesReducer,
        inventarios: inventariosReducer,
        roles: rolesReducer,
        areas:areasReducer,
        calculosPersonales: calculosPersonalesReducer,
        usuarios:usuariosReducer,
        sesion: sesionReducer

    }
});