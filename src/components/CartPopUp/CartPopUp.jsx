import {useSelector } from "react-redux";
import "./CartPopUp.css";
import { Link } from "react-router-dom";

const CartPopUp=()=>{

    const cartItems=useSelector((store)=>store.cart.items);
    const cost=useSelector((store)=>store.cart.cost);
    const totalCost=useSelector((store)=>store.cart.totalCost);

    console.log(cartItems);
    console.log(cost);
    console.log(totalCost);

    return(
        <div className="added-items-pop-up">
        <div className="added-items-pop-up-div1">
            <h4>{cartItems.length} items |</h4>
            <h4>₹{totalCost}</h4>
        </div>
        <Link style={{textDecoration:"none",color:"white"}} to={"/cart"}><div className="added-items-pop-up-div2">
            <h4>View Cart</h4>
            <i class="fa-solid fa-cart-shopping"></i>
            </div>
        </Link>
    </div>
    );
}

export default CartPopUp;