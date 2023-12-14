import "./ManagerPage2.css";
import ManagerPageNavBar from "./ManagerPageNavBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import config from "/src/config.json";
// import socket from "../../socket";
import PendingCard from "./PendingCard/PendingCard";
import PreparingCard from "./PreparingCard/PreparingCard";
import DeliveredCard from "./DeliveredCard/DeliveredCard";
import PaidCard from "./PaidCard/PaidCard";
import BillGenCard from "./BillGenCard/BillGenCard";
import {toast,ToastContainer} from 'react-toastify';


const ManagerPage2=()=>{

    const [orders,setOrders]=useState([]);
    const [groupedData,setGroupedData]=useState({});
    const [notification,setNotification]=useState('');
    const [liveOrders,setLiveOrders]=useState(true);

    const fetchData = () => {
        axios.get(config.apiUrl+'/managers')
          .then((response) => { 
            console.log(response.data);
            setOrders(response.data);
          })
          .catch(()=>{
            console.log("Request failed");
          });
            // setOrders(managerData);

          axios.get(config.apiUrl+'/manager/bill')
            .then((response)=>{
              console.log(response.data);
              setNotification(response.data)
            })
            .catch(()=>{
              console.log('notification get request failed')
            })
      };

    useEffect(()=>{
        const fetchDataInterval=setInterval(()=>{
            fetchData();
        },2000);
        fetchData();
        return()=>clearInterval(fetchDataInterval);
    },[]);

    // useEffect(()=>{
    //   socket.on("chat",(payload)=>{
    //       setNotification([payload]);
    //   })
    // },[])

    useEffect(()=>{
        // notification.map((item,index)=>{
          if(notification!=''){
          toast.info(`Bill Requested by Table ${notification}`,{autoClose:false,onClose:()=>{console.log('Notification closed');},theme:'dark'});
          }
        // })
    },[notification])


    useEffect(() => {
        const organizedData = orders.reduce((acc, currentItem) => {
          const { order_id } = currentItem;
    
          if (!acc[order_id]) {
            acc[order_id] = [];
          }
    
          acc[order_id].push(currentItem);
    
          return acc;
        }, {});
    
        setGroupedData(organizedData);
      }, [orders]);

    //   useEffect(()=>{
    //     setLiveOrders(true);
    // },[]);

      // -------------filtering pendingData--------------- 
      
      const pendingData = Object.keys(groupedData).map(orderId => ({
        order_id: orderId,
        orders: groupedData[orderId].filter(item => item.status === "pending")
      }));

      // -------------filtering preparingData--------------- 

      const preparingData = Object.keys(groupedData).map(orderId => ({
        order_id: orderId,
        orders: groupedData[orderId].filter(item => item.status === "preparing")
      }));

      // -------------filtering deliveredData--------------- 

      const deliveredData = Object.keys(groupedData).map(orderId => ({
        order_id: orderId,
        orders: groupedData[orderId].filter(item => item.status === "delivered")
      }));

      const deliveredTableData = {};

    deliveredData.forEach(order => {
      order.orders.forEach(item => {
        const { table_number } = item;
        if (!deliveredTableData[table_number]) {
            deliveredTableData[table_number] = [];
        }
        deliveredTableData[table_number].push(item);
      });
    });

    const deliveredTableArray = Object.keys(deliveredTableData).map(tableNumber => ({
      table_number: tableNumber,
      orders: deliveredTableData[tableNumber]
    }));

    // -------------filtering paidData--------------- 

      const paidData = Object.keys(groupedData).map(orderId => ({
        order_id: orderId,
        orders: groupedData[orderId].filter(item => item.status === "justpaid")
      }));

      const paidTableData = {};

      paidData.forEach(order => {
        order.orders.forEach(item => {
          const { table_number } = item;
          if (!paidTableData[table_number]) {
            paidTableData[table_number] = [];
          }
          paidTableData[table_number].push(item);
        });
      });
  
      const paidTableArray = Object.keys(paidTableData).map(tableNumber => ({
        table_number: tableNumber,
        orders: paidTableData[tableNumber]
      }));

      // --------------filtering billGen-----------------

      const billGenData = Object.keys(groupedData).map(orderId => ({
        order_id: orderId,
        orders: groupedData[orderId].filter(item => item.status === "billGen")
      }));

      const billGenTableData = {};

      billGenData.forEach(order => {
        order.orders.forEach(item => {
          const { table_number } = item;
          if (!billGenTableData[table_number]) {
            billGenTableData[table_number] = [];
          }
          billGenTableData[table_number].push(item);
        });
      });
  
      const billGenArray = Object.keys(billGenTableData).map(tableNumber => ({
        table_number: tableNumber,
        orders: billGenTableData[tableNumber]
      }));

    
      console.log(orders);
      console.log(pendingData);
      console.log(preparingData);
      console.log(deliveredTableArray);
      console.log(paidTableArray);


      const handleStatusChange = (order_id) => {

        const intOrderID = parseInt(order_id, 10);

        axios.put(config.apiUrl+'/managers', { order_id: intOrderID})
          .then((response) => {
            console.log('success');
          })
          .catch((error) => {
            console.error('PUT request error:', error);
          });
      };

    return(
        <div className="manager-page2-main-container">
            <ManagerPageNavBar liveOrders={liveOrders} setLiveOrders={setLiveOrders}/>
            <div className="manager-page-sub-container">
                <div className="manager-page-sub-sub-container">
                    <div className="manager-page-sub-sub-sub-container">
                        <div className="manager-page-order-status-container">
                            <div>
                                <h2>Received Orders</h2>
                                <div>
                                    <input type="text" placeholder="Search by Order ID"></input>
                                    <span style={{height:'28px',width:'2px',background:'gray',position:'absolute',right:'40'}}></span>
                                    <i style={{cursor:'pointer'}} class="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div style={{display:'flex',gap:'15px'}}>
                                <button>Previous</button>
                                <button style={{paddingRight:'18px',paddingLeft:'18px'}}>Next</button>
                            </div>
                        </div>
                        <span style={{width:'100%',height:'1.5px',background:'#808080',marginTop:'15px'}}></span>
                        <div className="manager-page-card-container">
                        {pendingData.map((card,index)=>{
                                return  (card.orders.length!=0)?(
                                    <PendingCard card={card} key={index} handleStatusChange={handleStatusChange}/>
                            ):(null);
                            })}
                        </div>
                    </div>
                </div>
                <div className="manager-page-sub-sub-container">
                    <div className="manager-page-sub-sub-sub-container">
                        <div className="manager-page-order-status-container">
                            <div>
                                <h2>Preparing Orders</h2>
                                <div>
                                    <input type="text" placeholder="Search by Order ID"></input>
                                    <span style={{height:'28px',width:'1.5px',background:'gray',position:'absolute',right:'40'}}></span>
                                    <i style={{cursor:'pointer'}} class="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div style={{display:'flex',gap:'15px'}}>
                                <button>Previous</button>
                                <button style={{paddingRight:'18px',paddingLeft:'18px'}}>Next</button>
                            </div>
                        </div>
                        <span style={{width:'100%',height:'1.5px',background:'#808080',marginTop:'15px'}}></span>
                        <div className="manager-page-card-container">
                            {preparingData.map((card,index)=>{
                                return  (card.orders.length!=0)?(
                                    <PreparingCard card={card} key={index}/>
                            ):(null);
                        })}
                        </div>
                    </div>
                </div>
                <div className="manager-page-sub-sub-container">
                    <div className="manager-page-sub-sub-sub-container">
                        <div className="manager-page-order-status-container">
                            <div>
                                <h2>Delivered Orders</h2>
                                <div>
                                    <input type="text" placeholder="Search by Order ID"></input>
                                    <span style={{height:'28px',width:'1.5px',background:'gray',position:'absolute',right:'40'}}></span>
                                    <i style={{cursor:'pointer'}} class="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div style={{display:'flex',gap:'15px'}}>
                                <button>Previous</button>
                                <button style={{paddingRight:'18px',paddingLeft:'18px'}}>Next</button>
                            </div>
                        </div>
                        <span style={{width:'100%',height:'1.5px',background:'#808080',marginTop:'15px'}}></span>
                        <div className="manager-page-card-container">
                            {deliveredTableArray.map((card,index)=>{
                                return  (card.orders.length!=0)?(
                                    <DeliveredCard card={card} key={index}/>
                                ):(null);
                        })}
                            {billGenArray.map((card,index)=>{
                                return  (card.orders.length!=0)?(
                                    <BillGenCard card={card} key={index}/>
                                ):(null);
                        })}
                            {paidTableArray.map((card,index)=>{
                                return  (card.orders.length!=0)?(
                                    <PaidCard card={card} key={index}/>
                            ):(null);
                        })}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer limit={3}/>
        </div>
    );
}

export default ManagerPage2;