import { useEffect, useState } from "react";
import vegOnlyData from "/src/subCategoryMockData.json";
import FoodItemCard from "../FoodItemCard/FoodItemCard";
import axios from "axios";
import config from "/src/config.json";

const VegOnlySection=({foodItems,setFoodItems})=>{

    useEffect(()=>{
        axios.get(config.apiUrl+"/veg")
        .then((response)=>{
            console.log(response.data);
            setFoodItems(response.data);
        })
        .catch(()=>{
            console.log("foodItems Get request failed");
        });
        // setFoodItems(vegOnlyData);
    },[]);

    const [showItems1,setShowItems1]=useState(true);
    const [showItems2,setShowItems2]=useState(false);
    const [showItems3,setShowItems3]=useState(false);
    const [showItems4,setShowItems4]=useState(false);
    const [showItems5,setShowItems5]=useState(false);
    const [showItems6,setShowItems6]=useState(false);

    const recommendedItemsCard = foodItems.filter(item => item.Recommended === 1).map((card, index) => (
        <FoodItemCard key={index} card={card} />
        ));
    
        const rotiItemsCard = foodItems.filter(item => item.Maincategory === "Roti").map((card, index) => (
        <FoodItemCard key={index} card={card} />
        ));

        const indianMainCourseItemsCard = foodItems.filter(item => item.Maincategory === "Indian Main Course").map((card, index) => (
        <FoodItemCard key={index} card={card} />
        ));
    
        const vegStarterItemsCard = foodItems.filter(item => item.Maincategory === "Veg Starter").map((card, index) => (
            <FoodItemCard key={index} card={card} />
            ));

        const desertsItemsCard = foodItems.filter(item => item.Maincategory === "Dessert").map((card, index) => (
            <FoodItemCard key={index} card={card} />
            ));
    
    
        const chinieseItemsCard = foodItems.filter(item => item.Maincategory === "Chiniese Rice & Noodles").map((card, index) => (
        <FoodItemCard key={card.item_id} card={card} />
        ));

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

    return(
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
                <h2>Veg Starters {"("+vegStarterItemsCard.length+")"}</h2>
                <i className={`fa-solid fa-chevron-down ${showItems4 ? 'rotate':''}`}></i>
            </div>
            {(showItems4==true)?(
                vegStarterItemsCard
                ):(
                    null
                )
            }
            <div className="hr"></div> 
            <div className="title" onClick={handleClick5} >
                <h2>Desserts {"("+desertsItemsCard.length+")"}</h2>
                <i className={`fa-solid fa-chevron-down ${showItems5 ? 'rotate':''}`}></i>
            </div>
            {(showItems5==true)?(
                desertsItemsCard
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
            <div className="hr-max"></div>
        </div>
    );
}

export default VegOnlySection;