import { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import CartPopUp from "../../CartPopUp/CartPopUp";
import FoodItemCard from "./FoodItemCard/FoodItemCard";
import VegOnlySection from "./VegOnlySection/VegOnlySection";
import mockData from "/src/mockData.json";
import axios from "axios";
import config from "/src/config.json";

const FoodItemsSection=({foodItems,setFoodItems})=>{

    const id=useSelector((store)=>store.table_id.table_id);

    const [vegOnly,setVegOnly]=useState(false);
    const [showItems1,setShowItems1]=useState(true);
    const [showItems2,setShowItems2]=useState(false);
    const [showItems3,setShowItems3]=useState(false);
    const [showItems4,setShowItems4]=useState(false);
    const [showItems5,setShowItems5]=useState(false);
    const [showItems6,setShowItems6]=useState(false);
    const [showItems7,setShowItems7]=useState(false);
    const [showItems8,setShowItems8]=useState(false);

    useEffect(()=>{
        if(!vegOnly){
            axios.get(config.apiUrl+`/home/${id}`)
            .then((response)=>{
                console.log(response.data);
                setFoodItems(response.data);
            })
            .catch(()=>{
                console.log("foodItems Get request failed");
            });
             setFoodItems(mockData);
        }
    },[vegOnly]);

    const cartItems=useSelector((store)=>store.cart.items);

    const recommendedItemsCard = foodItems.filter(item => item.Recommended === 1).map((card, index) => (
    <FoodItemCard key={index} card={card} />
    ));

    const rotiItemsCard = foodItems.filter(item => item.Maincategory === 'Roti').map((card, index) => (
    <FoodItemCard key={index} card={card} />
    ));

    const indianMainCourseItemsCard = foodItems.filter(item => item.Maincategory === "Indian Main Course").map((card, index) => (
    <FoodItemCard key={index} card={card} />
    ));

    const nonVegItemsCard = foodItems.filter(item => item.Maincategory === "Non-veg Starters").map((card, index) => (
    <FoodItemCard key={index} card={card} />
    ));

    const vegStarterItemsCard = foodItems.filter(item => item.Maincategory === "Veg Starter").map((card, index) => (
    <FoodItemCard key={index} card={card} />
    ));

    const chinieseItemsCard = foodItems.filter(item => item.Maincategory === "Chiniese Rice & Noodles").map((card, index) => (
    <FoodItemCard key={card.item_id} card={card} />
    ));

    const desertsItemsCard = foodItems.filter(item => item.Maincategory === "Dessert").map((card, index) => (
    <FoodItemCard key={index} card={card} />
    ));
    
    const beveragesItemsCard = foodItems.filter(item => item.Maincategory === "Hot Cold Beverage").map((card, index) => (
    <FoodItemCard key={index} card={card} />
    ));

    const vegOnlyClick=()=>{
        setVegOnly(!vegOnly);
    }

    const handleClick1=()=>{
        setShowItems1(!showItems1);
    }
    const handleClick2=()=>{
        setShowItems2(!showItems2);
    }
    const handleClick3=()=>{
        setShowItems3(!showItems3);
    }
    const handleClick4=()=>{
        setShowItems4(!showItems4);
    }
    const handleClick5=()=>{
        setShowItems5(!showItems5);
    }
    const handleClick6=()=>{
        setShowItems6(!showItems6);
    }
    const handleClick7=()=>{
        setShowItems7(!showItems7);
    }
    const handleClick8=()=>{
        setShowItems8(!showItems8);
    }

    return(
        <div className="restaurants-menu-card-container">
            <div className="hr"></div>
            <div className="veg-toggle-container">
                <h3>Veg Only</h3>
                <div onClick={vegOnlyClick} className={`veg-toggle ${vegOnly ? 'clicked':''}`}>
                    <div className="outer-circle">
                    </div>
                </div>
            </div>
            {(vegOnly)?(
                <VegOnlySection foodItems={foodItems} setFoodItems={setFoodItems}/>
            ):(
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
                    <div className="title" onClick={handleClick1} >
                        <h2>Recommended {"("+recommendedItemsCard.length+")"}</h2>
                        <i className={`fa-solid fa-chevron-down ${showItems1 ? 'rotate':''}`}></i>
                    </div>
                {(showItems1==true)?(
                    recommendedItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr"></div>
                <div className="title" onClick={handleClick2} >
                    <h2>Roti & Naan {"("+rotiItemsCard.length+")"}</h2>
                    <i className={`fa-solid fa-chevron-down ${showItems2 ? 'rotate':''}`}></i>
                </div>
                {(showItems2==true)?(
                    rotiItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr"></div>
                <div className="title" onClick={handleClick3} >
                    <h2>Indian Main Course {"("+indianMainCourseItemsCard.length+")"}</h2>
                    <i className={`fa-solid fa-chevron-down ${showItems3 ? 'rotate':''}`}></i>
                </div>
                {(showItems3==true)?(
                    indianMainCourseItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr"></div>
                <div className="title" onClick={handleClick4} >
                    <h2>Non-Veg Starters {"("+nonVegItemsCard.length+")"}</h2>
                    <i className={`fa-solid fa-chevron-down ${showItems4 ? 'rotate':''}`}></i>
                </div>
                {(showItems4==true)?(
                    nonVegItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr"></div> 
                <div className="title" onClick={handleClick5} >
                    <h2>Veg Starters {"("+vegStarterItemsCard.length+")"}</h2>
                    <i className={`fa-solid fa-chevron-down ${showItems5 ? 'rotate':''}`}></i>
                </div>
                {(showItems5==true)?(
                    vegStarterItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr"></div>    
                <div className="title" onClick={handleClick6} >
                    <h2>Chinese Rice & Noodles {"("+chinieseItemsCard.length+")"}</h2>
                    <i className={`fa-solid fa-chevron-down ${showItems6 ? 'rotate':''}`}></i>
                </div>
                {(showItems6==true)?(
                    chinieseItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr"></div>
                <div className="title" onClick={handleClick7} >
                    <h2>Desserts {"("+desertsItemsCard.length+")"}</h2>
                    <i className={`fa-solid fa-chevron-down ${showItems7 ? 'rotate':''}`}></i>
                </div>
                {(showItems7==true)?(
                    desertsItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr"></div>
                <div className="title" onClick={handleClick8} >
                    <h2>Hot & Cold Beverages {"("+beveragesItemsCard.length+")"}</h2>
                    <i className={`fa-solid fa-chevron-down ${showItems8 ? 'rotate':''}`}></i>
                </div>
                {(showItems8==true)?(
                    beveragesItemsCard
                    ):(
                        null
                    )
                }
                <div className="hr-max"></div>
            </div>
            )}
            {(cartItems.length>0)?(
                <CartPopUp/>
            ):(
                null
            )}
        </div>
    );
}

export default FoodItemsSection;