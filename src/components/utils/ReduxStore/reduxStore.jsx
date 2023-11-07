import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice/cartSlice";
import allItemsReducer from "./allItemsSlice/allItemsSlice";
import table_idReducer from "./table_idSlice/table_idSlice";

const reduxStore=configureStore({
    reducer:{
        cart:cartReducer,
        allItems:allItemsReducer,
        table_id:table_idReducer,
    },
});

export default reduxStore;