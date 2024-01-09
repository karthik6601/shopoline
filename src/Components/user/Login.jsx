import React, { useEffect, useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";


function Login({open, handleClose, theme}) {
    const [loginCred, setLoginCred] =useState({
        uName:'',
        pd:''
    });
    useEffect(()=>{
        const style = document.createElement("style");
        style.innerHTML=`
        .css-1t1j96h-MuiPaper-root-MuiDialog-paper{
            background-color:${theme=='dark'? '#4d6160' : 'whitesmoke'}
        }
        `
        // console.log(style);
        document.head.appendChild(style);

    },[theme])
//   const handleClose = () => {};
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    //   style={{backgroundColor:'red'}}
    >
      <DialogTitle id="alert-dialog-title" style={{fontWeight:'bolder'}}>{"Log-in to Shopoline"}</DialogTitle>
      <DialogContent style={{display:'flex', justifyContent:'center'}}>
        <div className="login-Card">
        <TextField id="outlined-basic" label="Outlined" color='secondary' variant="outlined" style={{ width:'300px'}}/>
        <Button variant="contained" color="secondary">Contained</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
