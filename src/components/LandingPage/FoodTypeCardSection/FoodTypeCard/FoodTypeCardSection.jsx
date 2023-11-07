import { Link } from "react-router-dom";
import "../FoodTypeCardSection.css";
import soup from "/assets/images/squash-soup-cream-gazpacho-bisque-leek-soup-soup-7c50ff63963927ca1e56d58a3fb205c4.png";
import sandwich from "/assets/images/—Pngtree—tomato cheese sandwich_6241084.png";
import rice from "/assets/images/chinese-cuisine-cooked-rice-white-rice-boiling-rice-504766d6ce0d48d97cfa38f69d04c6c1.png";
import chicken from "/assets/images/purepng.com-fried-chickenfried-chickenchickendishfried-1411527420252vynmc.png";
import curry from "/assets/images/pngtree-kadai-paneer-curry-png-image_9164812-fotor-bg-remover-2023101322248.png";
import tikka from "/assets/images/delicious-chicken-tikka-plater-isolated-transparent-background_927015-4362-removebg-preview.png"; 

const FoodTypeCard=()=>{

    const link="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/";

    return(
        <div className="food-type-card">
            <Link to={"/subCategory/chineese"}><img src={link+"PC_Creative%20refresh/3D_bau/banners_new/Chinese.png"} alt="img1"/></Link>
            <Link style={{position:'relative',color:'#656565',fontWeight:'500',fontSize:'15px'}} to={"/subCategory/Rice"}><img style={{width:'95px',marginTop:'16px',marginLeft:'6px',marginRight:'6px'}} src={rice} alt="img5"/><span style={{position:'absolute',bottom:'18',left:'36'}}>Rice</span></Link>
            <Link style={{position:'relative',color:'#656565',fontWeight:'500',fontSize:'15px'}} to={"/subCategory/tikka"}><img style={{width:'120px',marginTop:'31px',marginLeft:'5px',marginRight:'5px'}} src={tikka} alt="img5"/><span style={{position:'absolute',bottom:'18',left:'43'}}>Tikka</span></Link>
            <Link style={{position:'relative',color:'#656565',fontWeight:'500',fontSize:'15px'}} to={"/subCategory/chicken"}><img style={{width:'120px',marginTop:'21px',marginLeft:'5px',marginRight:'5px'}} src={chicken} alt="img5"/><span style={{position:'absolute',bottom:'18',left:'27'}}>Chicken</span></Link>
            <Link style={{position:'relative',color:'#656565',fontWeight:'500',fontSize:'15px'}} to={"/subCategory/soup"}><img style={{width:'115px',marginTop:'8px'}} src={soup} alt="img5"/><span style={{position:'absolute',bottom:'16',left:'36'}}>Soup</span></Link>
            <Link style={{position:'relative',color:'#656565',fontWeight:'500',fontSize:'15px'}} to={"/subCategory/Sandwich"}><img style={{width:'120px',marginTop:'8px',marginLeft:'10px',marginRight:'10px'}} src={sandwich} alt="img5"/><span style={{position:'absolute',bottom:'20',left:'20'}}>Sandwich</span></Link>
            <Link style={{position:'relative',color:'#656565',fontWeight:'500',fontSize:'15px'}} to={"/subCategory/Curry"}><img style={{width:'135px',marginTop:'8px',marginLeft:'10px',marginRight:''}} src={curry} alt="img5"/><span style={{position:'absolute',bottom:'18',left:'46'}}>Curry</span></Link>
            <Link to={"/subCategory/desserts"}><img src={link+"PC_Creative%20refresh/Desserts_2.png"} alt="img8"/></Link>
        </div>
    );
}

export default FoodTypeCard;