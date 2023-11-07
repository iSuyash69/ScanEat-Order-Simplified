import axios from "axios";
import "./FeedbackPopUp.css"
import { useState } from "react";
import Swal from "sweetalert2";
import config from "/src/config.json";


const FeedbackPopUp=()=>{

    const [visibility,setVisibility]=useState(true);

    const closeFeedback=()=>{
        setVisibility(false);
    }

    const [activeStars, setActiveStars] = useState(0); 

    const handleStarClick = (starIndex) => {
      setActiveStars(starIndex + 1); 
    };

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star ${(i < activeStars) ? ('active') : ('')}`}
          onClick={() => handleStarClick(i)}
        ></i>
      );
    }

    console.log(activeStars);

    const submitFeedback=()=>{
        console.log('clicked');
        axios.post(config.apiUrl+"/home/6/abcd/reviews",{stars:activeStars})
        .then((response)=>{
            console.log(response.data);
            Swal.fire({
                icon:'success',
                html: '<span style="font-weight: bold;">Thank you</span>',
                showConfirmButton:false,
                timer:3000,
                didDestroy:function(){
                    setVisibility(false);
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
    }


    return(
        <div className={`${(!visibility) ? ('hidden') : ('')}`}>
        <div onClick={(e)=>{e.stopPropagation();closeFeedback()}} className="food-item-popup-modal" style={{cursor:'auto',zIndex:'50'}}></div>
        <div  style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:'100',display:'flex',flexDirection:'column',background:'#f1f1f6',borderRadius:'25px'}}>
            <div class="rating-box">
                <i class="fa-solid fa-x" onClick={(e)=>{e.stopPropagation();closeFeedback()}} style={{cursor:'pointer',position:'absolute',right:'13',top:'8',fontSize:'16px',color:'gray'}}></i>
                <header>How was your experience?</header>
                <div class="stars">
                    {stars}
                </div>
                <button onClick={()=>submitFeedback()} style={{position:'absolute',marginTop:'16px',marginLeft:'65px',width:'110px',height:'38px',borderRadius:'7px',border:'solid 1px',fontSize:'14.5px',background:'#007bff',color:'white',fontWeight:'500',cursor:'pointer',transition:'background 0.3s, color 0.3s'}}>Submit</button>
            </div>
        </div>
        </div>
    );
}


export default FeedbackPopUp;