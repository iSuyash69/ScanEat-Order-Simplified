const OrderedItemCard=({card})=>{

    const dateString = card.order_time;
    const date = new Date(dateString).toLocaleTimeString();
    const formattedTime = date;
    
    return(
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',gap:'20px',marginBottom:'10px',marginLeft:'10px'}}>
            <div>
                <img style={{width:'97px',height:'83px',borderRadius:'10px'}}  src={card.src} alt="not loaded"></img>
            </div>
            <div style={{marginTop:'',position:'relative'}}>
                <h3 style={{fontSize:'15px',fontWeight:'500'}}>{card.name}</h3>
                <div style={{display:'flex',gap:'20px',marginTop:'0px'}}>
                {/* <p style={{fontSize:'14px',color:'gray'}}>₹{card.price}</p> */}
                <p style={{fontSize:'14px',fontWeight:'400',color:'gray'}}>Quantity : <span style={{color:'black'}}>{card.quantity}</span></p>
                </div>
                {/* <h3 style={{fontWeight:'400',marginTop:'3px',color:'black',fontSize:'14px'}}>Total : {card.price*100/100} x {card.quantity} = <span style={{color:'#60b246',fontWeight:'500'}}> ₹{card.price*card.quantity}</span></h3> */}
                <p style={{fontSize:'15px',marginTop:'0px',color:'gray'}}>Order time : <span style={{color:'black'}}>{formattedTime}</span></p>
            </div>
        </div>
    );
}


export default OrderedItemCard;