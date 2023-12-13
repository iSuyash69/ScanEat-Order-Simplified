import "../../ManagerPage/ManagerPage2.css";

const ChefPreparingCard=({card,handleStatusChange})=>{

    return(
        <div className="pending-item-card1">
            <div style={{display:'flex',background:'#3475FF',height:'31px',justifyContent:'space-evenly',borderTopRightRadius:'6px',borderTopLeftRadius:'6px',alignItems:'center'}}>
                <p style={{fontWeight:'500',fontSize:'16.5px',color:'white'}}>ID : {card.order_id}</p>
                <p style={{fontWeight:'500',fontSize:'16.5px',color:'white'}}>Table : {card.orders[0].table_number}</p>
            </div>
            <div style={{fontSize:'14.5px',marginLeft:'5px',display:'flex',flexWrap:'wrap',marginRight:'5px',width:'195px',marginTop:'3px',borderBottom:'solid 2px lightGray',paddingBottom:'4px'}}>
                {(card.orders[0].special_instructions !='none')?(
                    <p>Instruction : {card.orders[0].special_instructions} </p>
                ):(null)}
            </div>
            <div style={{display:'flex',flexDirection:'column',height:'130px',justifyContent:'',gap:'3px',overflow:'auto',marginBottom:'5px',marginTop:'5px'}}>
                {card.orders.map((item)=>{
                    return <div style={{display:'flex',justifyContent:'space-between',padding:'0px 12px',fontSize:'14px'}}>
                                <p style={{fontWeight:'500'}}>{item.item_name}</p>
                                <p style={{fontWeight:'500'}}>x{item.quantity}</p>
                            </div>
                            })}
            </div>      
            <div style={{display:'flex',justifyContent:'center',padding:'0px 10px',alignItems:'center',height:'29px',borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px'}}>
                <div onClick={()=>handleStatusChange(card.order_id)} style={{display:'flex',justifyContent:'center',width:'75%',background:'#00B107',height:'28px',alignItems:'center',borderRadius:'3px',cursor:'pointer',marginBottom:'15px'}}>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white',cursor:'pointer'}}>Sent to delivery</p>
                </div>
            </div>
        </div>
    );
}

export default ChefPreparingCard;