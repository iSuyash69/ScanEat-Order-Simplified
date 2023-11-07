import axios from "axios";
import config from "/src/config.json";

const PaidCard=({card})=>{

    const totalPrice = card.orders.reduce((acc, item) => {
        const price = parseFloat(item.price);
        return acc + price * item.quantity;
    }, 0);

    const handlePaid=(table_number)=>{
        axios.put(config.apiUrl+`/manager/bill/remove` ,{id:table_number })
        .then((response)=>{
            console.log(response.data);
        })
        .catch(()=>{
            console.log('post request failed')
        })
    }

    return(
        <div style={{position:'relative',zIndex:'0'}} className="paid-item-card">
            <p style={{fontWeight:'500',fontSize:'16.5px',width:'100%',display:'flex',justifyContent:'center',background:'#007bff',height:'31px',alignItems:'center',color:'white',borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}>Table no : {card.table_number}</p>
            <i onClick={()=>{handlePaid(card.table_number)}} style={{cursor:'pointer',position:'absolute',top:'4',right:'7',fontSize:'12px',background:'lightgray',borderRadius:'50%',padding:'5px'}} class="fa-solid fa-x"></i>
            <div style={{display:'flex',flexDirection:'column',height:'130px',justifyContent:'flex-start',gap:'3px',marginBottom:'5px',marginTop:'5px',overflow:'auto'}}>
                {card.orders.map((item)=>{
                    return <div style={{display:'flex',justifyContent:'space-between',padding:'0px 12px',fontSize:'14px'}}>
                                <p>{item.item_name}</p>
                                <p>x{item.quantity}</p>
                            </div>
                            })}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0px 10px',alignItems:'center',height:'29px',background:'#60b246',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                <div style={{display:'flex',justifyContent:'center',gap:'10px',alignItems:'center',width:'100%'}}>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white'}}>Total :</p>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white'}}>Rs {totalPrice.toFixed(2)*100/100}</p>
                </div>
            </div>
        </div>
    );
}

export default PaidCard;