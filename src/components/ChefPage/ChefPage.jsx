import { useState,useEffect } from "react";
import chefData from "/src/ChefData.json";
import ChefPreparingCard from "./ChefPreparingCard/ChefPreparingCard";
import axios from "axios";
import "./chefPage.css"
import config from "/src/config.json";
import { Link } from "react-router-dom";
import logo from "/assets/images/Logo.png";
import qrCode from "/assets/images/qrcode.png";
import chefPic from "/assets/images/267_SkVNQSBBTk4gMjU4OC0zNw-removebg-preview.png";

const ChefPage=()=>{

  const [orders,setOrders]=useState([]);
  const [instructions,setInstructions]=useState([]);
  const [groupedData,setGroupedData]=useState({});

  const fetchData = () => {
      axios.get(config.apiUrl+'/chef')
        .then((response) => { 
          console.log(response.data.order);
          setOrders(response.data);
          // setInstructions(response.data.instructions)
        })
        .catch(()=>{
          console.log("Request failed");
        });
          // setOrders(chefData.order);
          // setInstructions(chefData.instructions)
    };

  useEffect(()=>{
      const fetchDataInterval=setInterval(()=>{
          fetchData();
      },1500);
      fetchData();
      return()=>clearInterval(fetchDataInterval);
  },[]);

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

    const arrayData = Object.keys(groupedData).map(orderId => ({
      order_id: orderId,
      orders: groupedData[orderId]
    }));

  console.log(orders); 
  console.log(instructions) 

  const handleStatusChange = (order_id) => {

    const intOrderID = parseInt(order_id, 10);

    axios.put(config.apiUrl+'/chef', { order_id: intOrderID})
      .then((response) => {
        console.log('success');
      })
      .catch((error) => {
        console.error('PUT request error:', error);
      });
  };

 
  

  return(
      <div style={{zIndex:'1000',position:'relative',background:'white',width:"100%",height:'100vh'}}>
          <div>
            <div className="navBar-container navBar-container-cartPage manager-page-navbar" style={{display:'flex',justifyContent:'space-between'}}>
              <div className="navBar-sub-container scan-eat-logo-manager-page">
                  <Link style={{textDecoration:'none',color:'black'}} to={'/Chef'}>
                      <div style={{display:'flex',alignItems:'center'}}>
                          <img src={logo} alt="error"></img>
                          <h2 style={{position:'relative',right:'6'}}>Sc<img style={{width:'30px',height:'30px',position:'relative',top:'7'}} src={qrCode}></img>n<span style={{color:'#fc8019'}}>Eat</span></h2>
                      </div>
                  </Link>
              </div>
              <div className="manager-profile-container" style={{display:'flex',alignItems:'center',marginRight:'25px',gap:'10px'}} >
                  <img style={{width:'50px',borderRadius:'50%',border:'darkGray 2px solid',background:'#EFF2FF'}} src={chefPic}></img>
                  <h4 style={{fontWeight:'500',color:'#6E6E6E'}}>Chef</h4>
              </div>
          </div>  
          {/* <h3 className="manager-card-title" style={{height:'40px',backgroundColor: '#e6e6eb',width:'100%'}}><span style={{margin:'auto',fontWeight:'bold',position:'absolute',top:'5',left:'45%'}}>Preparing Orders</span></h3> */}
              <div style={{width:'100%',height:'calc(100vh - 28px)',background:'white',display:'flex',flexWrap:'wrap',gap:'25px',paddingTop:'15px',paddingLeft:'20px',alignContent:'flex-start',paddingTop:'75px'}}>
                  {arrayData.map((card,index)=>{
                     return  (card.length!=0)?(
                       <ChefPreparingCard card={card} key={index} handleStatusChange={handleStatusChange}/>
                      ):(null);
                  })}
              </div>
          </div>
      </div>
  );

}

export default ChefPage;