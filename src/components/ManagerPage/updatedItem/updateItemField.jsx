import { useState } from "react";
import "../ManagerDashboard/ManagerDashboard.css"
import axios from "axios";
import Swal from "sweetalert2";
import FeedbackPopUp from "../../LandingPage/FeedbackPopUp/FeedbackPopUp";
import config from "/src/config.json";

const updateItemField=()=>{

  const [update,setUpdate]=useState(true);

  const [itemID, setItemID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [imageID, setImageID] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [availability,setAvailability]=useState();


  const handleSubmit = (e) => {
    e.preventDefault();

    const itemData=({
      item_id:itemID,
      name:name,
      description:description,
      price:price,
      Maincategory:mainCategory,
      src:imageID,
      Subcategory:subCategory,
      Recommended:recommended,
      vegonly:vegOnly,
    });

    console.log(itemData);

    axios.post(config.apiUrl+"/manager/add",{itemData:itemData})
    .then((response)=>{
      console.log(response.data);
      Swal.fire({
        icon:'success',
        html: '<span style="font-weight: bold;">Item Added Successfully</span>',
        showConfirmButton:false,
        timer:3000,
    });
    })
    .catch(()=>{
      console.log("put request failed");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    })
  };

  const handleSubmit2=(e)=>{

    e.preventDefault();
    console.log('item_id :'+itemID);
    console.log(availability);

    const itemData=({
      item_id:itemID,
      status:availability,
    })

    axios.put(config.apiUrl+"/manager/items",{item_id:itemID,status:availability})
    .then((response)=>{
      console.log(response.data);
      Swal.fire({
        icon:'success',
        html: '<span style="font-weight: bold;">Item Placed Successfully</span>',
        showConfirmButton:false,
        timer:3000,
    });
    })
    .catch(()=>{
      console.log("put request failed");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    })

  };

  return (
    <div className="manager-dashboard-main-container" style={{flexDirection:'column',alignItems:'center',marginTop:'50px'}}>
          <button style={{background:'gray',border:'solid 1px black',position:'absolute',right:'10',top:'-40'}} onClick={()=>{setUpdate(false)}}>Remove item ?</button>
    {(update)?(
      <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
      <h3>Add Food Item</h3>
      <form onSubmit={handleSubmit} style={{border:'1px solid',padding:'15px 25px',paddingBottom:'50px',borderRadius:'8px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',gap:'15px'}}>
        <div>
          <label style={{paddingRight:'5px'}}>Item ID:</label>
          <input type="text" value={itemID} onChange={(e) => setItemID(e.target.value)} />
        </div>
        <div>
          <label style={{paddingRight:'5px'}}>Name of Dish/Food:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
          <label style={{paddingRight:'5px'}}>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label style={{paddingRight:'5px'}}>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label style={{paddingRight:'5px'}}>Main Category:</label>
          <input type="text" value={mainCategory} onChange={(e) => setMainCategory(e.target.value)} />
        </div>
        <div>
          <label style={{paddingRight:'5px'}}>Image ID:</label>
          <input type="text" value={imageID} onChange={(e) => setImageID(e.target.value)} />
        </div>
        <div>
          <label style={{paddingRight:'5px'}}>Sub Category:</label>
          <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
        </div>
        <div>
          <label style={{paddingRight:'5px'}}>Recommended:</label>
          <input type="checkbox" checked={recommended} onChange={() => setRecommended(!recommended)} />
        </div>
        <div>
          <label style={{paddingRight:'5px'}}>Veg Only:</label>
          <input type="checkbox" checked={vegOnly} onChange={() => setVegOnly(!vegOnly)} />
        </div>
        <button style={{position:'absolute',bottom:'10',right:'150'}} type="submit">Submit</button>
      </form>
      </div>
      ):(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
  <div>
    <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Update Food Item</h3>
    <form onSubmit={handleSubmit2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div>
        <label style={{ fontSize: '16px', marginBottom: '8px' }}>Item ID:</label>
        <input type="text" value={itemID} onChange={(e) => setItemID(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
      </div>
      <div>
        <label style={{ fontSize: '16px', marginBottom: '8px' }}>Availability:</label>
        <input type="checkbox" checked={availability} onChange={() => setAvailability(!availability)} style={{ margin: '8px 0' }} />
      </div>
      <button type="submit" style={{ backgroundColor: '#fc8019', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
    </form>
  </div>
</div>
)}
    </div>
  );
}

export default updateItemField;