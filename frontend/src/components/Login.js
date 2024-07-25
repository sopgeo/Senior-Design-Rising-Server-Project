import React, { useState } from 'react'
import "../css/Login.css";
import GenericHeader, {Header} from './GenericHeader.js'
import { useNavigate } from "react-router-dom";
import Path from "../components/Path";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Snackbar, Alert, createTheme, ThemeProvider } from "@mui/material";


export default function Login() {
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState({ username: false, password: false });
    const [openDialog, setOpenDialog] = useState(false);
    const [passwordForReset, setPasswordForReset] = useState('');
    const [idForReset, setIdForReset] = useState('')
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: '', severity: 'info' });
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

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
                Path.buildPath("api/user/loginUser", true),
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
                throw new Error("Login failed");
            }
            
            const json = await response.json();
            const token = json.token
            const data = json.user

            if (data && (data.defaultPassword === 1)) {
                    localStorage.setItem('user', JSON.stringify({
                        id: data.ucf_id,
                        password: data.password,
                        value: data.defaultPassword,
                        type: data.type,
                        firstname: data.first_name,
                        token: json.token
                }));
                handleOpen();
                handleResetPassword();
            }

            if (data && (data.defaultPassword === 0)) {
                    localStorage.setItem('user', JSON.stringify({
                        id: data.ucf_id,
                        group_id: data.group_id,
                        password: data.password,
                        value: data.defaultPassword,
                        type: data.type,
                        firstname: data.first_name,
                        token: json.token
                }))
                navigate('/');
            }
            
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

    const handleResetPassword = async () => {
        // test for valid ucf_id format
        if (!passwordRegex.test(passwordForReset)) {
            setSnackbarInfo({ open: true, message: 'Invalid password format.', severity: 'error' });
            return;
        }
        
        try {
            const response = await fetch(Path.buildPath("api/user/resetPassword", true), {
                method: 'POST',
                body: JSON.stringify({ ucf_id: idForReset, password: passwordForReset }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setSnackbarInfo({ open: true, message: 'Password successfully reset. Please log in with your new password.', severity: 'success' });
            } else {
                throw new Error('Failed to reset password.');
            }

        } catch (error) {
            setSnackbarInfo({ open: true, message: error.message, severity: 'error' });
        }

        handleClose();
    };

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
                    

                    <div className="loginform">
                        <div className="logintext">
                            <h1 className="logintext1">Sign in</h1>
                            <h4 className="logintext2">to continue to the SD portal</h4>
                            <p className="lt3">If you're a first time-user, please use your NID as both your username and password.</p>
                        </div>
                        
                        <label htmlFor="ucf_id" className="ucf_idlabel">UCF NID </label>
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
{/* 
                    <div className="forgotpasswordbutton">
                        <button type="fp" id="forgotPassword" onClick={handleOpen}>Forgot Password?</button> 
                    </div> */}
                    
                    <button type="submit" id="loginButton">Continue</button> 
                    
                    <pre id="loginResult"></pre>

                    
                </form>

                <Dialog open={openDialog} onClose={handleClose} BackdropProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To reset your password, please enter your new password twice.
                            It must have a Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="UCF NID"
                            type="ucf_id"
                            fullWidth
                            variant="standard"
                            value={idForReset}
                            onChange={(e) => setIdForReset(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={passwordForReset}
                            onChange={(e) => setPasswordForReset(e.target.value)}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleResetPassword}>Submit</Button>
                    </DialogActions>
                </Dialog>

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
