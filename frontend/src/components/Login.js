import React, { useState } from 'react'
import "../css/Login.css";
import Header from './GenericHeader.js'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    // function handleSubmit(event) {
    //     event.preventDefault();  
    // }

    return (
        <div className="loginpage">
            <Header/>
            <div className="loginbox">
                <form>
                {/* <form onSubmit={handleSubmit}> */}
                    <h2 className="logintext">Log In</h2>

                    <div class="inputbox1">
                        <i class = "fas fa-caret-square-right"></i>
                        <input type="user" id="loginUser" name="username" placeholder="Username"
                        onChange={e => setUser(e.target.value)}/>
                    </div>


                    <div class = "inputbox2">
                        <i class = "fa fa-lock"></i>
                        <i class="fa fa-user" ></i>
                        <input type = "password" id = "loginPassword" name = "password" placeholder = "Password"
                        onChange={e => setPassword(e.target.value)}/>
                    </div>

                
                    <button type="button" id="loginButton" onclick="doLogin();">LOGIN</button> 
                    <pre id="loginResult"></pre>

                    <button type="button" id="forgotPassword" onclick="goToRegister();">Forgot Password?</button> 
                    
                </form>
            </div>
        </div>
    )
}