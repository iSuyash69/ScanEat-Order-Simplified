import 'core-js/stable'
import 'regenerator-runtime/runtime'
import ReactDOM  from "react-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/LandingPage/Header/NavBar/NavBar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { Provider } from "react-redux";
import reduxStore from "./components/utils/ReduxStore/reduxStore";
import CartPage from "./components/CartPage/CartPage";
import SubCategoryPage from "./components/SubCategoryPage/SubCategoryPage";
import { lazy } from "react";
import OrderedItemsPage from "./components/OrderedItemsPage/OrderedItemsPage";
import SearchPage from "./components/SearchPage/SearchPage";

const ManagerPageLogin=lazy(()=>import("./components/ManagerPage/ManagerPageLogin/ManagerPageLogin.jsx"));
const ManagerDashboard=lazy(()=>import("./components/ManagerPage/ManagerDashboard/ManagerDashboard.jsx"));
const UpdateItems=lazy(()=>import("./components/ManagerPage/updatedItem/updateItemField.jsx"))
const ChefPage=lazy(()=>import("./components/ChefPage/ChefPage"));

const AppLayout=()=>{
    return(
        <Provider store={reduxStore}>
            <div>
                <NavBar/>
                <Outlet/>
            </div>
        </Provider>
    );
}

const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/:table_id",
                element:<LandingPage/>
            },
            {
                path:"/search",
                element:<SearchPage/>
            },
            {
                path:"/cart",
                element:<CartPage/>
            },
            {
                path:"/subCategory/:subCategoryName",
                element:<SubCategoryPage/>
            },
            {
                path:"/Manager",
                element:<ManagerPageLogin/>
            },
            {
                path:"/Manager/dashboard",
                element:<ManagerDashboard/>
            },
            {
                path:"/orderedItemsStatus",
                element:<OrderedItemsPage/>
            },
            {
                path:"/Chef",
                element:<ChefPage/>
            },{
                path:"/Manager/updateItems",
                element:<UpdateItems/>
            }
        ],
        errorElement:<ErrorPage/>
    }
]);


const root=ReactDOM.createRoot(document.querySelector(".root"));
root.render(<RouterProvider router={appRouter}/>);