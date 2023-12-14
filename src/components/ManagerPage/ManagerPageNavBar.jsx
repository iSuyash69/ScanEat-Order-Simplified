import "./ManagerPage2.css";
import qrCode from "/assets/images/qrcode.png";
import logo from "/assets/images/Logo.png";
import managerPic from "/assets/images/manager-removebg-preview (1).png"
import { Link } from "react-router-dom";


const ManagerPageNavBar=({dashboard,setDashboard,liveOrders,setLiveOrders,updateItems,setUpdateItems})=>{

    // if(dashboard==true){
    //     setLiveOrders==false;
    //     setUpdateItems==false
    // }
    // if(liveOrders==true){
    //     setDashboard==false;
    // }
    // if(updateItems==true){
    //     setDashboard==false;
    //     setLiveOrders==false;
    // }

    return(
        <div className="navBar-container navBar-container-cartPage manager-page-navbar">
            <div className="navBar-sub-container scan-eat-logo-manager-page">
                <Link style={{textDecoration:'none',color:'black'}} to={'/Manager'}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <img src={logo} alt="error"></img>
                        <h2 style={{position:'relative',right:'6'}}>Sc<img style={{width:'30px',height:'30px',position:'relative',top:'7'}} src={qrCode}></img>n<span style={{color:'#fc8019'}}>Eat</span></h2>
                    </div>
                </Link>
            </div>
            <div className="manager-page-routes">
                <Link style={{textDecoration:'none'}} to={"/Manager"}><h4 className="routes-name r1" style={{fontWeight:'500',color:dashboard? '#6E6E6E' : '#fc8019'}}>Live Orders</h4></Link>
                <Link style={{textDecoration:'none'}} to={"dashboard"}><h4 className="routes-name r2" style={{fontWeight:'500',color:liveOrders?'#6E6E6E':'#fc8019'}}>Dashboard</h4></Link>
                <Link style={{textDecoration:'none'}} to={"Manager/updateItems"}><h4 className="routes-name r3" style={{fontWeight:'500',color:(liveOrders==true && dashboard==true)?'#fc8019':''}}>Update Items</h4></Link>
            </div>
            <div className="manager-profile-container">
                <img style={{width:'43px',borderRadius:'50%'}} src={managerPic}></img>
                <h4 style={{fontWeight:'500',color:'#6E6E6E'}}>Manager</h4>
            </div>
        </div>         
    );
}

export default ManagerPageNavBar;

