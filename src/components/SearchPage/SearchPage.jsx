import { useState,useEffect } from "react";
import axios from "axios";
import "./SearchPage.css"
import searchResults from "/src/searchResult.json"
import FoodTypeCard from "../LandingPage/FoodTypeCardSection/FoodTypeCard/FoodTypeCardSection";
import FoodItemCard from "../LandingPage/FoodItemsSection/FoodItemCard/FoodItemCard";
import CartPopUp from "../CartPopUp/CartPopUp";
import { useSelector } from "react-redux";
import config from "/src/config.json";


const SearchPage=()=>{

    const [items,setItems]=useState([]);
    const [text,setText]=useState("");

    const id=useSelector((store)=>store.table_id.table_id);
    const cartItems=useSelector((store)=>store.cart.items);

    const handleSearch=()=>{
        axios.post(config.apiUrl+`/home/${id}`, { text })
        .then((response) => {
            console.log(response.data);
            if(text.length>1){
                setItems(response.data);
            }
        })
        .catch((error) => {
            console.error('Post request failed', error);
        });

        if(text.length==0){
            setItems([]);
        }
        console.log(items);
    }

    useEffect(() => {
        handleSearch();
    }, [text]);

    handleKeyDown=(event)=>{
        if(event.key=='Enter'){
            event.target.blur();
        }
    }

    return(
        <div className="search-page-main-container">
            <div style={{position:'fixed',width:'100%',background:'white',zIndex:'100',paddingTop:'15px'}}>
            <div className="search-page-searchBox">
               <input type="text" placeholder="Search for Food or Dish" value={text} onChange={(event)=>{setText(event.target.value)}} autoFocus onKeyDown={handleKeyDown}></input>
               {(text.length==0)?(
                    <i class="fa-solid fa-magnifying-glass"></i>
               ):(
                    <i onClick={()=>{setText('');setItems([]);}} class="fa-solid fa-x"></i>
               )}
            </div>
            <div className="search-page-hr"></div>
            </div>
            <div className="search-page-card-container">
                {(items.length==0 && text.length>1)?(
                    <h3 style={{marginTop:'30%'}}>No results found</h3>
                ):(text.length<2)?(
                    <div className="search-page-food-category-container">
                        <h3 style={{fontSize:'17px',paddingLeft:'8px'}}>Search by food categories</h3>
                        <FoodTypeCard/>
                    </div>
                ):(
                    items.map((card,index)=>{
                        return <FoodItemCard card={card} key={index}/>
                    })
                )}
            </div>
            {(cartItems.length>0)?(
                <CartPopUp/>
            ):(
                null
            )}
        </div>

    );
}

export default SearchPage; 