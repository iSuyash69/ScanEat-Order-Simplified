import { createSlice } from "@reduxjs/toolkit";

const table_idSlice=createSlice({
    name:'table',
    initialState:{
        table_id: sessionStorage.getItem('table_id') || null,
    },
    reducers:{
        setTableId:(state,action)=>{
            state.table_id=action.payload;
        },
    },
});

export const {setTableId} =table_idSlice.actions;
export default table_idSlice.reducer;