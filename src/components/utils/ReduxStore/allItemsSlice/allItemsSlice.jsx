import { createSlice } from "@reduxjs/toolkit";

const allItemsSlice=createSlice({
    name:'allItems',
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{
            const {item,time}=action.payload;
            state.items.push({
                item,
                time
            });
        },
    }
});

export const {addItem} = allItemsSlice.actions;
export default allItemsSlice.reducer;