import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import subCategoryMockData from "/src/subCategoryMockData.json";
import FoodItemCard from "../LandingPage/FoodItemsSection/FoodItemCard/FoodItemCard"
import "./SubCategoryPage.css";
import { useSelector } from "react-redux";
import CartPopUp from "../CartPopUp/CartPopUp";
import axios from "axios";
import config from "/src/config.json";
const SubCategoryPage=()=>{

    const [foodItems,setFoodItems]=useState([]);
    const {subCategoryName}=useParams();

    const id=useSelector((store)=>store.table_id.table_id);
    const cartItems=useSelector((store)=>store.cart.items);

    // console.log(subCategoryName);
    useEffect(()=>{window.scroll(0,0)},[]);
    useEffect(()=>{fetchData();},[]);

    const fetchData=()=>{
        axios.get(config.apiUrl+`/home/${id}/${subCategoryName}`)
        .then((response)=>{
            console.log(response.data);
            setFoodItems(response.data);
        })
        .catch(()=>{
            console.log("foodItems Get request failed");
        });
        // setFoodItems(subCategoryMockData);
    }

    return(
        <div className="sub-category-main-container">
            <div className="sub-category-title">
                <Link style={{color:'black'}} to={`/${id}`}><i style={{fontSize:'18px'}} className="back-cdn" class="fa-solid fa-arrow-left"></i></Link>
                <h3 style={{fontSize:'17px'}}>This is {subCategoryName} category page</h3>
            </div>
            <div className="sub-category-sub-container">
                {foodItems.map((card,index)=>{
                    return (
                        <FoodItemCard card={card} key={index}/>
                    );
                })}
            </div>
            {(cartItems.length>0)?(
                <CartPopUp/>
            ):(
                null
            )}
        </div>
    );
}

export default SubCategoryPage;