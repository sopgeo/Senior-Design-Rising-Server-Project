import React, { useState } from 'react'
import "../css/Login.css";
import Header from './GenericHeader.js'
import { useNavigate } from "react-router-dom";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Snackbar, Alert, createTheme, ThemeProvider } from "@mui/material";


export default function Login() {
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState({ username: false, password: false });
    const [openDialog, setOpenDialog] = useState(false);
    const [emailForReset, setEmailForReset] = useState('');
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: '', severity: 'info' });

    const handleSubmit = async (event) => {
        event.preventDefault();  
        const ucf_id = event.target.ucf_id.value;
        const password = event.target.password.value;
        let hasError = false;

        
        setShowTooltip({ ucf_id: false, password: false });
        
        if (!ucf_id) {
            setShowTooltip(prev => ({ ...prev, ucf_id: true }));
            hasError = true;
        }
        if (!password) {
            setShowTooltip(prev => ({ ...prev, password: true }));
            hasError = true;
        }
        
        if (hasError) return;
        
        try {
            const response = await fetch(
                'http://localhost:5000/api/user/loginUser',
                {
                    method: 'POST',
                    body: JSON.stringify({ ucf_id, password }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // console.log("body: " + JSON.stringify({ ucf_id, password }));
            if (!response.ok) {
                console.log("response: " + !response.ok)
                throw new Error("Login failed");
            }
            
            const data = await response.json();
            console.log("data: " + data + " " + "data.type: " + data.type)

            if (data && data.id) {
                localStorage.setItem('user', JSON.stringify({
                    id: data.ucf_id,
                    password: data.password,
                }));
                navigate('/');
            }
            navigate('/');
        } catch (error) {
            setSnackbarInfo({ open: true, message: error.message, severity: 'error' });
        }
    };

    const handleOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    // const handleResetPassword = async () => {
    //     // test for valid ucf_id format
    //     // if (!emailRegex.test(emailForReset)) {
    //     //     setSnackbarInfo({ open: true, message: 'Invalid email format.', severity: 'error' });
    //     //     return;
    //     // }

    //     try {
    //         const response = await fetch('/api/user/forgetpassword', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email: emailForReset }),
    //         });

    //         if (response.ok) {
    //             setSnackbarInfo({ open: true, message: 'Reset link sent to your email.', severity: 'success' });
    //         } else {
    //             throw new Error('Failed to send reset email, please try again.');
    //         }
    //     } catch (error) {
    //         setSnackbarInfo({ open: true, message: error.message, severity: 'error' });
    //     }

    //     handleClose();
    // };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };

    return (
        <div className="loginpage">
            {/* <Header/> */}
            <div className="loginbox">
                    <form className="loginform" onSubmit={handleSubmit}>
                        <div className="logintext">
                            <h1 className="logintext1">Sign in</h1>
                            <br></br>
                            <h4 className="logintext2">to continue to the SD portal</h4>
                        </div>
                    

                    <div className="loginform">
                        <label htmlFor="ucf_id" className="ucf_idlabel">UCF NID</label>
                            {/* <Tooltip title="Please fill out this field" open={showTooltip.ucf_id} placement="top" arrow> */}
                                <input type="ucf_id" name="ucf_id" id="ucf_id"
                                    className="ucf_idinput"
                                    placeholder="e.g. ab148302"/>
                            {/* </Tooltip> */}
                    </div> 

                    {/* Password input */}
                    <div className="loginform">
                        <label htmlFor="password" className="passwordlabel">Password</label>
                        {/* <Tooltip title="Please fill out this field" open={showTooltip.password} placement="top" arrow> */}
                            <input type="password" name="password" id="password"
                                className="passwordinput"
                                placeholder="•••••••••"/>
                        {/* </Tooltip> */}
                    </div>

                    <div className="forgotpasswordbutton">
                        <button type="fp" id="forgotPassword" onClick={handleOpen}>Forgot Password?</button> 
                    </div>
                    
                    <button type="submit" id="loginButton">Continue</button> 
                    
                    <pre id="loginResult"></pre>

                    
                </form>
                <Snackbar
                    open={snackbarInfo.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    style={{ zIndex: 1500 }} // Ensure this value is greater than the Dialog's z-index
                    >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbarInfo.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbarInfo.message}
                    </Alert>
			    </Snackbar>
            </div>
        </div>
    )
}
