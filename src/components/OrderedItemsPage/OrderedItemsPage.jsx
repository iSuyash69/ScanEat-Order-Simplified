import { useSelector } from "react-redux";
import "./OrderedItemsPage.css";
import OrderedItemCard from "./OrderedItemCard/OrderedItemCard";
import { useEffect, useState } from "react";
import axios from "axios";
import allItemsData from "/src/orderedData.json";
import OrderedItemsPopUp from "./OrderedItemsPopUp/OrderedItemsPopUp";
import BillPopUp from "./BillPopUp/BillPopUp";
import config from "/src/config.json";
const OrderedItemsPage=()=>{

    useEffect(()=>{window.scroll(0,0)},[]);

    const id=useSelector((store)=>store.table_id.table_id);
    const [allItems,setAllItems]=useState([]);

    const fetchData=()=>{
        axios.get(config.apiUrl+`/home/${id}/abc/cart`)
        .then((response)=>{
            console.log(response.data);
            setAllItems(response.data);
        })
        .catch(()=>{
            console.log("allItems get request failed");
        })
        // setAllItems(allItemsData);
    };

    useEffect(()=>{
        const fetchDataInterval=setInterval(()=>{
            fetchData();
        },2500);
        fetchData();
        return()=>clearInterval(fetchDataInterval);
    },[]);

    // const allItems=useSelector((store)=>{return(store.allItems.items);});
    console.log(allItems);

    if(allItems.length==0){
        return <h3 style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:'100vw',textAlign:'center'}}>No orders placed yet</h3>

    }

    const pendingData=allItems.filter((item)=>item.status_id==1);
    const preparingData=allItems.filter((item)=>item.status_id==2);
    const deliveredData=allItems.filter((item)=>item.status_id==3);

    console.log(pendingData);
    console.log(preparingData);
    console.log(deliveredData);

    <OrderedItemsPopUp allItems={allItems}/>

    return(
        <div className="ordered-items-main-container">
            <div className="ordered-items-sub-container">
                <h3 className="ordered-items-sub-container-title">Ordered</h3>
                <div style={{ justifyContent: 'center' }} className="ordered-item-card-container">
                {pendingData.map((card, index) => (
                    <OrderedItemCard card={card} key={index} />
                    ))
                }
                {allItems.filter((item) => item.status_id === 1).length === 0 && (
                    <h4 style={{fontWeight:'400',fontSize:'15px',textAlign:'center'}}>No new items ordered</h4>
                )}
                </div>
            </div>
            <div className="ordered-items-sub-container">
                <h3 className="ordered-items-sub-container-title">Preparing</h3>
                <div style={{ justifyContent: 'center' }} className="ordered-item-card-container">
                {preparingData.map((card, index) => (
                    <OrderedItemCard card={card} key={index} />
                    ))
                }
                {allItems.filter((item) => item.status_id === 2).length === 0 && (
                    <h4 style={{fontWeight:'400',fontSize:'15px',textAlign:'center'}}>No items in the preparing</h4>
                )}
                </div>
            </div>
            <div className="ordered-items-sub-container" style={{marginBottom:'60px'}}>
                <h3 className="ordered-items-sub-container-title">Delivered</h3>
                <div style={{ justifyContent: 'center'}} className="ordered-item-card-container">
                {deliveredData.map((card, index) => (
                    <OrderedItemCard card={card} key={index} />
                    ))
                }
                {allItems.filter((item) => item.status_id === 3).length === 0 && (
                    <h4 style={{fontWeight:'400',fontSize:'15px',textAlign:'center'}}>Items will be delivered soon</h4>
                )}
                </div>
            </div>
            {(pendingData.length === 0 && preparingData.length == 0 && deliveredData.length !== 0)?(
                <BillPopUp/>
            ):(
                null
            )}
        </div>
    )
}

export default OrderedItemsPage;