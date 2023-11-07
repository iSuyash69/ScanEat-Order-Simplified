const BillGenCard=({card})=>{

    const totalPrice = card.orders.reduce((acc, item) => {
        const price = parseFloat(item.price);
        return acc + price * item.quantity;
    }, 0);
    
    return(
        <div className="delivered-item-card" style={{cursor:'pointer'}}>
            <p style={{fontWeight:'500',fontSize:'16.5px',width:'100%',display:'flex',justifyContent:'center',background:'#007bff',height:'31px',alignItems:'center',color:'white',borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}>Table No : {card.table_number}</p>
            <div style={{display:'flex',flexDirection:'column',height:'130px',justifyContent:'flex-start',gap:'3px',marginBottom:'5px',marginTop:'5px',overflow:'auto'}}>
                {card.orders.map((item)=>{
                    return <div style={{display:'flex',justifyContent:'space-between',padding:'0px 12px',fontSize:'14px'}}>
                                <p>{item.item_name}</p>
                                <p>x{item.quantity}</p>
                            </div>
                            })}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0px 10px',alignItems:'center',height:'29px',background: 'orange', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                <div style={{display:'flex',justifyContent:'center',gap:'10px',alignItems:'center',width:'100%'}}>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white'}}>Total :</p>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white'}}>Rs {totalPrice.toFixed(2)*100/100}</p>
                </div>
            </div>
        </div>
    );
}


export default BillGenCard;