import { useState } from "react";
import "../ManagerPage.css";
import ManagerPage from "../ManagerPage";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "/src/config.json";
import ManagerPage2 from "../ManagerPage2";


const ManagerPageLogin=()=>{

    const [password,setPassword]=useState('');
    const [isLogin,setIsLogin]=useState(sessionStorage.getItem('setIsLogin') || false);
    const [name,setName]=useState('');

    const handlePasswordChange=(event)=>{
        setPassword(event.target.value);
    }

    const handleNameChange=(event)=>{
        setName(event.target.value);
    }


    const submitButton=()=>{
  
        axios.post(config.apiUrl+"/manager/login",{username:name,password:password})
        .then((response)=>{
            console.log(response.data);
            if(response.data==true){
                setIsLogin(true);
                sessionStorage.setItem('setIsLogin',true);
            }
            else{
                alert('Invaild Credentials');
            }
        })
    }

    return(
        <div className="manager-login-page">
            {(!isLogin)?(
                <div class="login-container">
                <h2>Manager Login</h2>
                <div class="login-form">
                    <label for="username">Username:</label>
                    <input type="text" id="username" value={name} placeholder="Enter your username" onChange={handleNameChange}/>
                    <label for="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange}/>
                    <button style={{background:'#fc8019',borderRadius:'10px'}} onClick={submitButton}>Login</button>
                </div>
            </div>
            ):(
                <ManagerPage2/>
            )}
        </div>
    );
}

export default ManagerPageLogin;