import { useState,useEffect } from "react";
import "./BillPage.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "/src/config.json";

const BillPage=({id,bill,setBill,isBill,setIsBill})=>{
  
  useEffect(()=>{setIsBill(true);},[]);
  console.log(isBill);

  useEffect(()=>{overFlow();},[isBill]);
  const overFlow=()=>{
      if(isBill){
      document.body.style.overflow="hidden";
      }
      else{
          document.body.style.overflow="scroll";
      };
  }

  const navigate=useNavigate();

  const [loading,setLoading]=useState(null);

  const groupedData = bill.reduce((result, item) => {
    const { item_id, item_name, price, quantity, total_price } = item;

    const existingItem = result.find((groupedItem) => groupedItem.item_id === item_id);
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total_price = (parseFloat(existingItem.total_price) + parseFloat(total_price)).toFixed(2);
    } 
    else {
        result.push({
            item_id,
            item_name,
            price,
            quantity,
            total_price
        });
    }
    return result;
}, []);

  const totalPrice = bill.reduce((acc, item) => {
    const price = parseFloat(item.price);
    return acc + price * item.quantity;
    }, 0);

    const closeBill=()=>{
        setIsBill(!isBill);
        setBill([]);
    }

    const payBill=(id)=>{

      setLoading(
        Swal.fire({
            title: "Loading...",
            text: "Please wait.",
            icon: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
    );

    axios.put(config.apiUrl +`/manager/bill`,{table_id : id})
    .then((response)=>{
        console.log(response.data);
        Swal.fire({
            icon:'success',
            html: `<span style="font-weight: bold;">Rs ${totalPrice.toFixed(2)*100/100} paid Successfully</span>`,
            showConfirmButton:false,
            timer:3000,
            didDestroy:function(){
                navigate(`/${id}`);
                setIsBill(!isBill);
                setBill([]);
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
    .finally(()=>{
        if(loading){
            loading.close();
        }
    })
    }

    return (
        <div>
          {(bill.length!==0) && (
            <div>
                <div className="food-item-popup-modal" style={{cursor:'auto',zIndex:'50'}}></div>
                <div  style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:'100',display:'flex',flexDirection:'column',background:'#f1f1f6',padding:'20px 25px',borderRadius:'15px',cursor:'auto',width:'350px'}}>
                    <i class="fa-solid fa-x" onClick={(e)=>{e.stopPropagation();closeBill()}} style={{cursor:'pointer',position:'absolute',right:'15',top:'10',fontSize:'16px'}}></i>
                    <h4 style={{textAlign:'center',fontSize:'17px',fontWeight:'500',marginBottom:'12px'}}>Table No : {id}</h4>
                    {groupedData.map((item,index)=>{
                        return <div style={{display:'flex',width:'100%',justifyContent:'center',gap:'0px',fontSize:'14.5px'}} key={index}>
                            <p style={{width:'70%',textAlign:'start',marginBottom:'3px'}}>{item.item_name}</p>
                            <p style={{width:'10%',textAlign:'center'}}>x{item.quantity}</p>
                            <p style={{width:'30%',textAlign:'end'}}>Rs {item.total_price*(100/100)}</p>
                        </div>
                    })}
                    <div style={{display:'flex',alignItems:'center',marginTop:'15px',width:'100%',justifyContent:'space-between'}}>
                    <h5 style={{fontSize:'15px'}}>Total : Rs {totalPrice.toFixed(2)*100/100}</h5>
                    <button onClick={()=>payBill(id)} style={{width:'110px',height:'38px',borderRadius:'7px',border:'solid 1px',fontSize:'14.5px',background:'green',color:'white',fontWeight:'500',cursor:'pointer',transition:'background 0.3s, color 0.3s'}}>Pay Bill</button>
                    </div>
                </div>
                </div>
                )}
            </div>
        );  
    }

export default BillPage;