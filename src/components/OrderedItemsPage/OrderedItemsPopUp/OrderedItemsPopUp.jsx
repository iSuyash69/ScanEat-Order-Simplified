import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderedItemsPopUp=({allItems})=>{

    const cartItems=useSelector((store)=>{return(store.cart.items);});
    const id=useSelector((store)=>store.table_id.table_id);
    const [showPopUp,setShowPopUp]=useState(false);
    const [currentTableItem,setCurrentTableItem]=useState(false);

    console.log(id);

    useEffect(()=>{
        if(allItems.some(order=>order.table_number==id)){
            setCurrentTableItem(true);
        }
    },[allItems])

    useEffect(()=>{
        if(currentTableItem && cartItems.length==0){
            setShowPopUp(true);
        }
        else{
            setShowPopUp(false);
        }
    },[currentTableItem,cartItems]);

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