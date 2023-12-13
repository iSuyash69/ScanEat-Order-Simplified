const BillGenCard=({card})=>{

    const totalPrice = card.orders.reduce((acc, item) => {
        const price = parseFloat(item.price);
        return acc + price * item.quantity;
    }, 0);
    
    return(
        <div className="pending-item-card1">
            <p style={{fontWeight:'500',fontSize:'16.5px',width:'100%',display:'flex',justifyContent:'center',background:'#3475FF',height:'31px',alignItems:'center',color:'white',borderTopLeftRadius:'6px',borderTopRightRadius:'6px'}}>Table No : {card.table_number}</p>
            <div style={{display:'flex',flexDirection:'column',height:'130px',justifyContent:'flex-start',gap:'3px',marginBottom:'5px',marginTop:'5px',overflow:'auto'}}>
                {card.orders.map((item)=>{
                    return <div style={{display:'flex',justifyContent:'space-between',padding:'0px 12px',fontSize:'14px'}}>
                                <p style={{fontWeight:'500'}}>{item.item_name}</p>
                                <p style={{fontWeight:'500'}}>x{item.quantity}</p>
                            </div>
                            })
                }
            </div>
            <div style={{display:'flex',justifyContent:'center',padding:'0px 10px',alignItems:'center',height:'29px', borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px'}}>
                <div style={{display:'flex',justifyContent:'center',gap:'6px',alignItems:'center',minWidth:'70%',background:'#fc8019',marginBottom:'15px',height:'28px',borderRadius:'3px',position:'relative'}}>
                    <i style={{color:'white'}} class="fa-solid fa-wallet"></i>
                    {/* <i class="fa-solid fa-dollar-sign"></i> */}
                    <p style={{fontSize:'14px',fontWeight:'400',color:'white'}}>Total :</p>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white'}}>Rs {totalPrice.toFixed(2)*100/100}</p>
                </div>
            </div>
        </div>
    );
}


export default BillGenCard;