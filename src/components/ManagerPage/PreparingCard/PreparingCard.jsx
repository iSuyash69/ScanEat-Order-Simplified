const PreparingCard=({card})=>{

    return(
        <div className="preparing-item-card">
            <div style={{display:'flex',background:'#007bff',height:'31px',justifyContent:'space-evenly',borderTopRightRadius:'10px',borderTopLeftRadius:'10px',alignItems:'center'}}>
                <p style={{fontWeight:'500',fontSize:'16.5px',color:'white'}}>ID : {card.order_id}</p>
                <p style={{fontWeight:'500',fontSize:'16.5px',color:'white'}}>Table : {card.orders[0].table_number}</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',height:'130px',justifyContent:'flex-start',gap:'3px',marginBottom:'5px',marginTop:'5px',overflow:'auto'}}>
                {card.orders.map((item)=>{
                    return <div style={{display:'flex',justifyContent:'space-between',padding:'0px 12px',fontSize:'14px'}}>
                                <p>{item.item_name}</p>
                                <p>x{item.quantity}</p>
                            </div>
                            })}
            </div>
            {/* <div style={{display:'flex',justifyContent:'space-between',padding:'0px 10px',alignItems:'center',height:'29px',background:'#60b246',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white',cursor:'pointer'}}>Accept</p>
                </div>
            </div> */}
        </div>
    );
}

export default PreparingCard;