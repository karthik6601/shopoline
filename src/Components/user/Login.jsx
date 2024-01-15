import React, { useEffect, useState, createContext, useContext } from "react";
import { Dialog, TextField, Button } from "@mui/material";
// import { withStyles } from "@mui/styles";
import DialogTitle from "@mui/material/DialogTitle";
import ReCAPTCHA from "react-google-recaptcha";
import DialogContent from "@mui/material/DialogContent";
import { withStyles } from "@mui/styles";
import { MoveRight } from "lucide-react";
import { stateProps } from "../../Routes/routes";
import { USER_ACTION } from "../../App";
const cred= createContext(); 

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

const LoginComponent = () => {
  const { loginCred, setLoginCred, theme, setAction } =useContext(cred);
  const onChange = () => {};
  return (
    <div className="login-Card">
      <CssTextField
        required
        id="outlined-basic1"
        label="username"
        type="text"
        variant="outlined"
        style={{ width: "300px", margin: "10px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, uName: e.target.value });
        }}
      />
      <CssTextField
        required
        id="outlined-basic2"
        label="password"
        type="password"
        variant="outlined"
        style={{ width: "300px", margin: "10px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, pd: e.target.value });
        }}
      />
      <div className="captcha">
        <ReCAPTCHA
          sitekey="6Lf7ulEpAAAAABEA6Kp7ScgeZbgTjmgJtd9rn4LA"
          onChange={onChange}
          theme={theme}
          size="normal"
        />
      </div>
      <Button
        variant="contained"
        color="secondary"
        style={{ width: "300px", margin: "10px" }}
      >
        Sign-In
      </Button>
      <div className="switch-log-reg" onClick={()=>{setAction('reg')}}>New to Shopoline?</div>
    </div>
  );
};

const RegisterComponent = () => {
  const { loginCred, setLoginCred, theme, setAction } =useContext(cred);
  const onChange = () => {};
  return (
    <div className="reg-Card">
      <CssTextField
        required
        id="outlined-basic1"
        label="Email"
        type="email"
        variant="outlined"
        style={{ width: "400px", margin: "10px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, uName: e.target.value });
        }}
      />
      <CssTextField
        required
        id="outlined-basic2"
        label="User Name"
        type="text"
        variant="outlined"
        style={{ width: "400px", margin: "10px" }}
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
          required
          id="outlined-basic2"
          label="Password"
          type="password"
          variant="outlined"
          style={{ width: "190px" }}
          onChange={(e) => {
            setLoginCred({ ...loginCred, pd: e.target.value });
          }}
        />
        <CssTextField
          required
          id="outlined-basic2"
          label="Confirm Password"
          type="password"
          variant="outlined"
          style={{ width: "190px" }}
          onChange={(e) => {
            setLoginCred({ ...loginCred, pd: e.target.value });
          }}
        />
      </div>
      <CssTextField
        required
        id="outlined-basic2"
        label="Phone Number"
        type="text"
        variant="outlined"
        style={{ width: "400px", margin: "10px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, pd: e.target.value });
        }}
      />
      <ReCAPTCHA
        sitekey="6Lf7ulEpAAAAABEA6Kp7ScgeZbgTjmgJtd9rn4LA"
        theme={theme}
        // style={{backgroundColor:'red'}}
        onChange={onChange}
        size="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        style={{ width: "400px", margin: "10px" }}
      >
        Sign-Up
      </Button>
      <div className="switch-log-reg" onClick={()=>{setAction('login')}}>Already a registered user?</div>
    </div>
  );
};

function Login() {
  const {theme, handleClose, open, action, setAction} = useContext(stateProps);
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
        {action==="login" ? "Log-in to Shopoline": "Welcome to Shopoline"}
      </DialogTitle>
      <DialogContent style={{ display: "flex", justifyContent: "center" }}>
       <cred.Provider value={{loginCred, setLoginCred, theme, setAction}}>
       {action == "login" ? <LoginComponent /> : <RegisterComponent />}
       </cred.Provider>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
