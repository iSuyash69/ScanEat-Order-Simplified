import axios from "axios";
import { useState } from "react";
import billData from "/src/bill.json"
import Swal from "sweetalert2";
import config from "/src/config.json";

const DeliveredCard=({card})=>{

    const [bill,setBill]=useState([]);
    const [billSend,setBillSend]=useState(false); 

    const totalPrice = card.orders.reduce((acc, item) => {
        const price = parseFloat(item.price);
        return acc + price * item.quantity;
    }, 0);

    const handleClick=(table_number)=>{

        if(billSend==true){
            return null;
        }

        console.log("table no: "+table_number);
        axios.get(config.apiUrl+`/manager/bill/${table_number}`)
        .then((response)=>{
            console.log(response.data);
            const newBill={
                billData:response.data,
                table_number:table_number,
                totalPrice:totalPrice,
            }
            setBill(newBill);
        })
        .catch(()=>{
            console.log('post request failed');
        })

    }

    console.log(bill);

    const closeBill=()=>{
        setBill([]);
    }

    const sendBill=(table_number)=>{
        axios.post(config.apiUrl+`/manager/sendbill`,{table_id:table_number})
        .then((response)=>{
            console.log(response.data);
            setBillSend(true);
            setBill([]);
        })
        .catch(()=>{
            console.log("bill post request failed")
            setBill([]);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again.",
              });
        })
    }
    return(
        <div className="pending-item-card1" style={{cursor:'pointer'}} onClick={()=>handleClick(card.table_number)}>
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
                <div style={{display:'flex',justifyContent:'center',gap:'6px',alignItems:'center',minWidth:'70%',background:billSend? '##fc8019' : 'rgb(255,0,0,.8)',marginBottom:'15px',height:'28px',borderRadius:'3px',position:'relative'}}>
                    <i style={{color:'white'}} class="fa-solid fa-wallet"></i>
                    {/* <i class="fa-solid fa-dollar-sign"></i> */}
                    <p style={{fontSize:'14px',fontWeight:'400',color:'white'}}>Total :</p>
                    <p style={{fontSize:'14px',fontWeight:'500',color:'white'}}>Rs {totalPrice.toFixed(2)*100/100}</p>
                </div>
            </div>
            {(bill.length!=0)?(
                <div>
                <div className="food-item-popup-modal" onClick={(e)=>{e.stopPropagation();closeBill()}} style={{cursor:'auto',zIndex:'1500',height:'100vh'}}></div>
                <div  style={{position:'absolute',bottom:'70%',left:'50%',transform:'translate(-50%,-50%)',zIndex:'2000',display:'flex',flexDirection:'column',background:'#f1f1f6',padding:'20px 30px',borderRadius:'15px',cursor:'auto',width:'500px'}}>
                    <i class="fa-solid fa-x" onClick={(e)=>{e.stopPropagation();closeBill()}} style={{cursor:'pointer',position:'absolute',right:'15',top:'10',fontSize:'17px'}}></i>
                    <h4 style={{textAlign:'center',fontSize:'18px',fontWeight:'500',marginBottom:'12px'}}>Table No : {bill.table_number}</h4>
                    {bill.billData.map((item,index)=>{
                        return <div style={{display:'flex',width:'100%',justifyContent:'center',gap:'0px',fontSize:'15px'}} key={index}>
                            <p style={{width:'70%',textAlign:'start',marginBottom:'3px'}}>{item.item_name}</p>
                            <p style={{width:'10%',textAlign:'center'}}>x{item.quantity}</p>
                            <p style={{width:'30%',textAlign:'end'}}>Rs {item.total_price*100/100}</p>
                        </div>
                    })}
                    <div style={{display:'flex',alignItems:'center',marginTop:'15px',width:'100%',justifyContent:'space-between'}}>
                    <h5 style={{fontSize:'15px'}}>Total : Rs {bill.totalPrice.toFixed(2)*100/100}</h5>
                    <button onClick={(e)=>{e.stopPropagation();sendBill(card.table_number)}} style={{width:'120px',height:'40px',borderRadius:'7px',border:'solid 1px',fontSize:'15px',background:'green',color:'white',fontWeight:'500',cursor:'pointer',transition:'background 0.3s, color 0.3s'}}>Send Bill</button>
                    </div>
                </div>
                </div>
            ):(
                null
            )}
        </div>
    );
}

export default DeliveredCard;