import React, { useEffect, useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";
// import { withStyles } from "@mui/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { withStyles } from "@mui/styles";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#a576f9",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#a576f9",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#a576f9",
      },
    },
  },
})(TextField);

const LoginComponent = ({ loginCred, setLoginCred }) => {
  return (
    <div className="login-Card">
      <CssTextField
        id="outlined-basic1"
        label="username"
        type="text"
        variant="outlined"
        style={{ width: "250px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, uName: e.target.value });
        }}
      />
      <CssTextField
        id="outlined-basic2"
        label="password"
        type="password"
        variant="outlined"
        style={{ width: "250px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, pd: e.target.value });
        }}
      />
      <Button variant="contained" color="secondary">
        Sign-In
      </Button>
    </div>
  );
};

const RegisterComponent = ({ loginCred, setLoginCred }) => {
  return (
    <div className="reg-Card">
      <CssTextField
        id="outlined-basic1"
        label="username"
        type="text"
        variant="outlined"
        style={{ width: "400px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, uName: e.target.value });
        }}
      />
      <CssTextField
        id="outlined-basic2"
        label="password"
        type="password"
        variant="outlined"
        style={{ width: "400px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, pd: e.target.value });
        }}
      />
      <div
        style={{
          display: "flex",
          width: "400px",
          justifyContent: "space-between",
        }}
      >
        <CssTextField
          id="outlined-basic2"
          label="password"
          type="password"
          variant="outlined"
          style={{ width: "190px" }}
          onChange={(e) => {
            setLoginCred({ ...loginCred, pd: e.target.value });
          }}
        />
        <CssTextField
          id="outlined-basic2"
          label="password"
          type="password"
          variant="outlined"
          style={{ width: "190px" }}
          onChange={(e) => {
            setLoginCred({ ...loginCred, pd: e.target.value });
          }}
        />
      </div>
      <CssTextField
        id="outlined-basic2"
        label="password"
        type="password"
        variant="outlined"
        style={{ width: "400px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, pd: e.target.value });
        }}
      />
      <Button variant="contained" color="secondary">
        Sign-Up
      </Button>
    </div>
  );
};

function Login({ open, handleClose, theme, action }) {
  const [loginCred, setLoginCred] = useState({
    uName: "",
    pd: "",
  });

  useEffect(() => {
    // console.log("login cred", loginCred);
  }, [loginCred]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        .css-1t1j96h-MuiPaper-root-MuiDialog-paper{
            background-color:${theme == "dark" ? "#4d6160" : "whitesmoke"}
        }
        `;
    document.head.appendChild(style);
  }, [theme]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bolder" }}>
        {"Log-in to Shopoline"}
      </DialogTitle>
      <DialogContent style={{ display: "flex", justifyContent: "center" }}>
        {action=='login'? <LoginComponent/> : <RegisterComponent />}
        
      </DialogContent>
    </Dialog>
  );
}

export default Login;
