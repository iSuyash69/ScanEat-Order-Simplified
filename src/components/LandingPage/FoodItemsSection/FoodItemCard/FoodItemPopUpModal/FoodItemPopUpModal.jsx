import { useEffect } from "react";
import  ReactDOM from "react-dom"; 
import "./FoodItemPopUpModal.css";
import { useDispatch } from "react-redux";
import { addItem,removeItem } from "../../../../utils/ReduxStore/cartSlice/cartSlice";

const FoodItemPopUpModal=({card,foodItemPopUp,setFoodItemPopUp,quantity,handleClick})=>{

    const dispatch = useDispatch();
    useEffect(()=>{overFlow();},[foodItemPopUp]);
    const overFlow=()=>{
        if(foodItemPopUp==true){
        document.body.style.overflow="hidden";
        }
        else{
            document.body.style.overflow="scroll";
        };
    }
    
    const handleClickEvent=()=>{
        handleClick();
    }

    if(!foodItemPopUp){
        return null;
    }
    
    return ReactDOM.createPortal(
        <div>
            <div className="food-item-popup-modal" onClick={()=>{setFoodItemPopUp(false)}}></div>
            <div className="food-item-popup-modal-main-container">
                <div className="food-item-popup-modal-sub-container1">
                    <i className="fa-solid fa-x close-pop-up" onClick={()=>{setFoodItemPopUp(false)}}></i>
                    <img src={card.src} alt="not loaded"></img>
                </div>
                <div className="food-item-popup-modal-sub-container2">
                    <div>
                        {(card.Vegonly)?(
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/180px-Veg_symbol.svg.png?20131205102827"></img>
                            ):(
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/180px-Non_veg_symbol.svg.png?20131205102929"></img>
                            )}
                        <h3>{card.name}</h3>
                        <p>₹{card.price}</p>
                    </div>
                    {(card.Availability)?(
                        <div>
                            <button onClick={()=>handleClickEvent(card)}>{quantity>0 ?(
                            <p className="quantity" onClick={(e)=>{e.stopPropagation();}}>
                                <span onClick={() => {dispatch(removeItem(card)); }}>- </span>
                                <span onClick={(e)=>{e.stopPropagation();}}>{quantity}</span>
                                <span onClick={() => {dispatch(addItem(card)); }}> +</span>
                            </p>

                        ):(
                        'ADD'
                        )}
                            </button>
                        </div>
                    ):(
                        <h4 style={{position:'absolute',right:'30',marginTop:'40px',color:'red'}}>Item currently unavailable</h4>
                    )}
                </div>
                <div className="food-item-popup-modal-sub-container3">
                    <h4>{card.description}</h4>
                </div>
            </div>
            </div>,
            document.querySelector(".portal-food-card")
    );
}

export default FoodItemPopUpModal;