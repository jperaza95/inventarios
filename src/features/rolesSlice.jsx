import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rolId:0
}

export const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setRol: (state, action) => {
            state.rolId = action.payload;
            console.log(state.rolId);
        }
    }
});

export const { setRol } = rolesSlice.actions;
export default rolesSlice.reducer;