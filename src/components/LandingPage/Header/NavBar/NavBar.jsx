import { useState } from "react";
import MenuPopUpModal from "./MenuPopUpModal/MenuPopUpModal";
import logo from "/assets/images/Logo.png";
import qrCode from "/assets/images/qrcode.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar=()=>{

    const id=useSelector((store)=>store.table_id.table_id);

    const [openMenuPopUp,setOpenMenuPopUp]=useState(false);

    console.log('navBar:'+openMenuPopUp);

    return(
        <div className="navBar-container navBar-container-cartPage">
            <div className="navBar-sub-container">
                <Link style={{textDecoration:'none',color:'black'}} to={`/${id}`}><div className="logo">
                    <img src={logo} alt="error"></img>
                    <h2>Sc<img src={qrCode}></img>n<span>Eat</span></h2>
                </div>
                </Link>
                <i class="fa-solid fa-bars" onClick={()=>{setOpenMenuPopUp(true)}}></i>
                <MenuPopUpModal openMenuPopUp={openMenuPopUp} setOpenMenuPopUp={setOpenMenuPopUp} />
            </div>
        </div>
    );
}

export default NavBar;