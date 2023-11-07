import { useState } from "react";
import FoodItemPopUpModal from "../../LandingPage/FoodItemsSection/FoodItemCard/FoodItemPopUpModal/FoodItemPopUpModal";
import { useDispatch, useSelector } from "react-redux";
import { addItem,removeItem} from "../../utils/ReduxStore/cartSlice/cartSlice";

const CartItemCard=({card})=>{
    
    const [foodItemPopUp, setFoodItemPopUp] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
  
    const cartItem = cartItems.find(item => item.item_id === card.item_id);
    const quantity = cartItem ? cartItem.quantity : 0;
  
    const handleClick = (card) => {
      if (quantity > 0) {
        dispatch(removeItem(card));
      } else {
        dispatch(addItem(card));
      }
    };

    console.log(quantity);

    return(
        <div className="menu-card cart-item-card">
            <div id="two">
                <img style={{width:'107px',height:'85px'}} onClick={()=>{setFoodItemPopUp(true)}} src={card.src} alt="not loaded"></img>
                <button style={{width:'83px',marginTop:'73px'}} onClick={()=>handleClick(card)}>{quantity>0 ?(
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
            <div style={{marginTop:'10px',position:'relative'}} id="one" onClick={()=>{setFoodItemPopUp(true)}}>
                {(card.Vegonly)?(
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/180px-Veg_symbol.svg.png?20131205102827"></img>
                    ):(
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/180px-Non_veg_symbol.svg.png?20131205102929"></img>
                    )}
                <h3 style={{fontSize:'15px',fontWeight:'500'}}>{card.name}</h3>
                <p style={{fontSize:'13px',color:'gray'}}>₹{card.price}</p>
                <h3 style={{fontWeight:'400',marginTop:'3px',color:'black',fontSize:'14px'}}>Total : {card.price*100/100} x {card.quantity} = <span style={{color:'#60b246',fontWeight:'500'}}> ₹{card.price*card.quantity}</span></h3>
            </div>
            <FoodItemPopUpModal card={card} foodItemPopUp={foodItemPopUp} setFoodItemPopUp={setFoodItemPopUp} quantity={quantity} handleClick={()=>handleClick(card)}/>
            <div className="cart-hr"></div>
        </div>
    );
}


export default CartItemCard; 