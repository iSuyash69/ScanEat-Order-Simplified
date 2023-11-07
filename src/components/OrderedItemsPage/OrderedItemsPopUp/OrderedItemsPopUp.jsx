import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderedItemsPopUp=({allItems})=>{

    const cartItems=useSelector((store)=>{return(store.cart.items);});

    const [showPopUp,setShowPopUp]=useState(false);

    useEffect(()=>{
        if(allItems.length!==0 && cartItems.length==0){
            setShowPopUp(true);
        }
        else{
            setShowPopUp(false);
        }
    },[allItems,cartItems]);


    return(
        <div>
        {(showPopUp)?(
            <div style={{background:'green'}} className="added-items-pop-up">
                <Link style={{textDecoration:"none",color:"white"}} to={"/orderedItemsStatus"}>
                    <div style={{display:'flex',gap:'10px',alignItems:'center',marginLeft:'24vw'}}>
                        <h4>Check Order Status </h4>
                        <i class="fa-regular fa-clock"></i>
                    </div>
                </Link>
            </div>
        ):(
            null
        )}
        </div>
    );
}


export default OrderedItemsPopUp;