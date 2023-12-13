import "../ManagerPage2.css";

const PendingCard=({card,handleStatusChange})=>{
    return(
        <div className="pending-item-card1">
            <div style={{display:'flex',background:'#3475FF',height:'31px',justifyContent:'space-between',borderTopRightRadius:'6px',borderTopLeftRadius:'6px',alignItems:'center',padding:'0px 12px'}}>
                <p style={{fontWeight:'500',fontSize:'16.5px',color:'white'}}>Table : {card.orders[0].table_number}</p>
                <p style={{fontWeight:'500',fontSize:'16.5px',color:'white'}}>ID : {card.order_id}</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',height:'130px',justifyContent:'flex-start',gap:'3px',marginBottom:'5px',marginTop:'5px',overflow:'auto'}}>
                {card.orders.map((item)=>{
                    return <div style={{display:'flex',justifyContent:'space-between',padding:'0px 18px',fontSize:'14px'}}>
                                <p style={{fontWeight:'500'}}>{item.item_name}</p>
                                <p style={{fontWeight:'500'}}>x{item.quantity}</p>
                            </div>
                            })}
            </div>
            <div style={{display:'flex',justifyContent:'center',padding:'0px 10px',alignItems:'center',height:'29px',borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px'}}>
                <div style={{display:'flex',justifyContent:'center',width:'60%',background:'#00B107',marginBottom:'15px',height:'28px',borderRadius:'3px',alignItems:'center',position:'relative',cursor:'pointer'}} onClick={()=>handleStatusChange(card.order_id)}>
                    <i style={{position:'absolute',left:'17',fontSize:'17px',color:'white'}} class="fa-solid fa-file"></i>
                    <i style={{position:'absolute',left:'18.5',fontSize:'10px',marginTop:'5px',color:'gray'}} class="fa-solid fa-check"></i>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white',cursor:'pointer',marginLeft:'13px'}}>Accept</p>
                </div>
            </div>
        </div>
    );
}

export default PendingCard;