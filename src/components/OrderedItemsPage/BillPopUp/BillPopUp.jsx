import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import config from "/src/config.json";

const BillPopUp=()=>{

    const id=useSelector((store)=>store.table_id.table_id);
    const [billGenerated,setBillGenerated]=useState(null);
    const [billPopUp,setBillPopUp]=useState(true);
    const navigate=useNavigate();

    const handleClick=()=>{

        const swalWithCustomButtons = Swal.mixin({
            customClass: {
              confirmButton: 'custom-confirm-button',
              cancelButton: 'custom-cancel-button',
            },
            buttonsStyling: true,
          });
          
          swalWithCustomButtons
            .fire({
              title: 'Are you sure?',
              text: "Order will End once bill is generated!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              showCloseButton: true, // You can include a custom close button
              showLoaderOnConfirm: true,
              preConfirm: () => {
                // You can add your custom logic here
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
              },
            })
            .then((result) => {
              if (result.isConfirmed) {
                axios.get(config.apiUrl+`/home/${id}/abcd/bill`)
                .then((response)=>{
                  Swal.fire('Your Bil will be generated shortly!')
                  navigate(`/${id}`);
                  console.log(response.data);
                  setBillGenerated(true);
                })
                .catch(()=>{
                  console.log("failed");
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please try again.",
                  });
                })
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithCustomButtons.fire('Cancelled', 'Enjoy your meal :)', 'error');
              }
            });
    }

    useEffect(() => {
        if (billGenerated !== null) {
          console.log('done');
          console.log(billGenerated);
          setBillPopUp(!billPopUp);

        }
      }, [billGenerated]);

      return (
        billPopUp ? (
          <div  onClick={handleClick} className="place-order-pop-up">
            <h4>Request Bill generation</h4>
          </div>
        ) : null
      );
      
}

export default BillPopUp;