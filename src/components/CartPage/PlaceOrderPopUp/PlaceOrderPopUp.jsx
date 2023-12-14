import {useDispatch, useSelector } from "react-redux";
import "./PlaceOrderPopUp.css";
import { emptyCart } from "../../utils/ReduxStore/cartSlice/cartSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../utils/ReduxStore/allItemsSlice/allItemsSlice";
import { useState } from "react";
import config from "/src/config.json";
// import socket from "../../../socket";

const PlaceOrderPopUp=({special_instruction})=>{

    const id=useSelector((store)=>store.table_id.table_id);
    const navigate =useNavigate();
    const dispatch=useDispatch();
    const cartItems=useSelector((store)=>{return(store.cart.items);});
    const totalCost=useSelector((store)=>{ return (store.cart.totalCost);});

    const [loading,setLoading]=useState(null);

    console.log(totalCost);
    console.log(special_instruction);

    const selectedData = {
        items:cartItems.map(item => ({
            item_id: item.item_id,
            name: item.name,
            quantity: item.quantity 
        })),
        special_instruction:special_instruction
    };

    const postData=(event)=>{

        setLoading(
            Swal.fire({
                title: "Loading...",
                text: "Please wait.",
                icon: "info",
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
        );


        // event.preventDefault();
        // socket.emit("chat",id);
        
        axios.post(config.apiUrl+`/home/${id}/abc/placeOrder`,selectedData)
        .then((response)=>{
            console.log(response.data);
            // dispatch(addItem({
            //     item:cartItems,
            //     time:new Date().toLocaleTimeString(),
            // }));
            Swal.fire({
                icon:'success',
                html: '<span style="font-weight: bold;">Order Placed Successfully</span>',
                showConfirmButton:false,
                timer:3000,
                didDestroy:function(){
                    dispatch(emptyCart());
                    navigate(`/${id}`);
                }
            });
        })
        .catch(()=>{
            console.log("post request failed");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again.",
              });
        })
        .finally(()=>{
            if(loading){
                loading.close();
            }
        })

        // dispatch(addItem({
        //              item:fromManagerData,
        //              time:new Date().toLocaleTimeString(),
        //         }));
            //         Swal.fire({
            //     icon:'success',
            //     html: '<span style="font-weight: bold;">Order Placed Successfully</span>',
            //     showConfirmButton:false,
            //     timer:3000,
            //     didDestroy:function(){
            //         dispatch(emptyCart());
            //         navigate("/");
            //     }
            // });
    }

    return(
        <div className="place-order-pop-up">
            <h3>₹{totalCost}</h3>
            <h2 style={{cursor:'pointer'}} onClick={postData}>Place Order</h2>
        </div>
    );
}

export default PlaceOrderPopUp;

