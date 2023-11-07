import { useSelector } from "react-redux";
import "./CartPage.css";
import CartItemCard from "./CartItemCard/CartItemCard";
import { Link } from "react-router-dom";
import PlaceOrderPopUp from "./PlaceOrderPopUp/PlaceOrderPopUp";
import emptyCartImg from "/assets/images/Empty cart illustration-fotor-bg-remover-2023101218357.png";
import { useEffect, useState } from "react";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";

const CartPage=()=>{

    useEffect(()=>{window.scroll(0,0)},[]);

    const id=useSelector((store)=>store.table_id.table_id);
    const {transcript,resetTranscript}=useSpeechRecognition();
    const cartItems=useSelector((store)=>store.cart.items);
    const [listening,setListening]=useState(false);
    const [special_instruction,setSpecial_instruction]=useState('')


    const handleClick = () => {
        setListening(!listening);
        if (listening) {
          SpeechRecognition.stopListening();
        } 
        else {
          SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        }
      };  
      
    const handleTrash=()=>{
        SpeechRecognition.stopListening();
        setListening(!listening);
        resetTranscript();
    }

    const handleCheck=()=>{
        setSpecial_instruction(transcript);
        SpeechRecognition.stopListening();
        setListening(!listening);
        resetTranscript();
    }

    console.log(cartItems);

    return(
            <div className="cart-page-main-container">
                <div className="cart-page-title">
                    <Link to={`/${id}`}><i style={{fontSize:'17px'}} className="back-cdn" class="fa-solid fa-arrow-left"></i></Link>
                    <div>
                        <h3 style={{fontSize:'18px'}}>Cart</h3>
                        <i style={{color:'gray',fontSize:'18px'}} class="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
                {(cartItems.length==0) ?(
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <img style={{marginTop:'40%'}} src={emptyCartImg}></img>
                        <h3 style={{alignSelf:'center',color:'grey'}}>Your Cart is Empty</h3>
                    </div>
                ):(
                    <div>
                        <div className="cart-page-cart-items-container">
                        {cartItems.map((card,index)=>{
                            return(
                                <CartItemCard card={card} key={index}/>
                            );
                        })}
                        </div>
                        <PlaceOrderPopUp special_instruction={special_instruction}/>
                        <div style={{display:'flex',justifyContent:'space-between',padding:'0px 20px',paddingRight:'60px',alignItems:'center',paddingTop:'10px',background:'#f1f1f6',paddingBottom:'18px',position:'relative'}}>
                        {(!listening)?(
                            <h4 style={{fontWeight:'500',fontSize:'15px'}}>Add cooking instructions</h4>
                        ):(
                            <h4 style={{fontWeight:'500',fontSize:'15px'}}> Listening......</h4>

                        )}
                        <i onClick={handleClick} className={`fa-solid fa-microphone ${listening ? 'microphone-icon-pulsate' : ''}`}></i>
                        </div>
                        {(transcript.length !=0)?(
                            <div style={{padding:'15px',paddingRight:'35px',paddingBottom:'35px',marginTop:'5px',background:'#f1f1f6',position:'relative',zIndex:'11'}}>
                                <p style={{fontSize:'14.5px'}}>{transcript}</p>
                                <i onClick={handleCheck} style={{fontSize:'14px',position:'absolute',right:'45',bottom:'12',color:'green'}} class="fa-solid fa-check"></i>
                                <i onClick={handleTrash} style={{fontSize:'14px',position:'absolute',right:'20',bottom:'12',color:'red'}} class="fa-solid fa-trash"></i>
                            </div>
                        ):(
                            null
                        )}
                    </div>
                )}
            </div>
    );
}

export default CartPage;