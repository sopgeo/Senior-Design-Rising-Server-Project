import "../css/Login.css";

export default function Login() {
    return (
        <div className="loginbox">
            <form action = "">
                <h2 className="logintext">Log In</h2>

                <div class="inputbox1">
                    <i class = "fas fa-caret-square-right"></i>
                    <input type="text" id="loginName" name="username" placeholder="Username"></input>
                </div>


                <div class = "inputbox2">
                    <i class = "fa fa-lock"></i>
                    <i class="fa fa-user" ></i>
                    <input type = "password" id = "loginPassword" name = "password" placeholder = "Password"></input>
                </div>

            
                <button type="button" id="loginButton" onclick="doLogin();">LOGIN</button> 
                <pre id="loginResult"></pre>

                <button type="button" id="forgotPassword" onclick="goToRegister();">Forgot Password?</button> 
                
            </form>
        </div>
    )
}