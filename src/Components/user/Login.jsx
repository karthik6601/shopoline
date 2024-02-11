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
const cred = createContext();
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
  const { loginCred, setLoginCred, theme, setAction } = useContext(cred);
  const [captcha, setCaptcha] = useState(null);
  const [error, setError]= useEffect(false);

  


  const onChange = (e) => {
    setCaptcha(e);
  };
  return (
    <div className="login-Card">
      {
        error && 
        <div style={{ height: "25px", color: "red" }}>
          <p style={{ fontSize: "small", marginLeft: "10px" }}>Your Credentials does not Match</p>
        </div>
      }
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
        disabled={!captcha}
        style={{ width: "300px", margin: "10px" }}
      >
        Sign-In
      </Button>
      <div
        className="switch-log-reg"
        onClick={() => {
          setAction("reg");
        }}
      >
        New to Shopoline?
      </div>
    </div>
  );
};

const RegisterComponent = () => {
  const { loginCred, setLoginCred, theme, setAction } = useContext(cred);
  const [captcha, setCaptcha] = useState(null);
  const [checkPd, setCheckPd] = useState(null);
  const [btnSts, setBtnSts] = useState(false);
  const [error, setError] = useState({
    email: null,
    ph: null,
    pd: null,
  });


  useEffect(() => {
    const vals = Object.values(loginCred).filter((el) => el.length > 0);
    if (vals.length == 4) {
      const a = vals.reduce((acc, el) => {
        return acc && el?.length > 0 ? true : false;
      }, true);
      setBtnSts(a && captcha?.length > 0);
    }
  }, [loginCred, captcha]);

  useEffect(() => {
    if (error.pd?.length> 0) {
      if (loginCred.pd === checkPd) {
        setError({ ...error, pd: "" });
      } 
    }
    if (error.email?.length > 0) {
      validateEmail(loginCred.email)
    }
    if(error.ph?.length > 0){
      validateEmail();
    }
  }, [checkPd, loginCred]);


  const onChange = (e) => {
    setCaptcha(e);
  };

  const ValidatePd=()=>{  
    if(loginCred.pd==checkPd){
      setError({ ...error, pd: "" });
    }else{
      setError({
        ...error, pd:'Passwords do not match'
      })
    }
  }

  const validateEmail = (email) => {
    const trimEmail = email?.slice(2, email.length - 2);
    if (!(trimEmail?.includes("@") && trimEmail?.includes("."))) {
      setError({
        ...error,
        email: "Please enter a valid email address",
      });
    } else {
      setError({
        ...error,
        email: "",
      });
    }
  };

  const validatePh=()=>{
    if(loginCred.ph.toString().length < 10){
      console.log('sdd')
      setError({
        ...error, ph:'Please enter a valid phone number'
      })
    }else{
      setError({
        ...error, ph:''
      })
    }
  }


  return (
    <div className="reg-Card">
      {error.email?.length > 0 && (
        <div style={{ height: "25px", color: "red" }}>
          <p style={{ fontSize: "small", marginLeft: "10px" }}>{error.email}</p>
        </div>
      )}
      <CssTextField
        required
        id="outlined-basic1"
        error={error.email?.length > 0}
        label="Email"
        type="email"
        value={loginCred.email}
        onBlur={() => {
          validateEmail(loginCred.email);
        }}
        variant="outlined"
        style={{ width: "400px", margin: "10px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, email: e.target.value });
        }}
      />
      <CssTextField
        required
        id="outlined-basic2"
        label="User Name"
        type="text"
        variant="outlined"
        value={loginCred.uName}
        style={{ width: "400px", margin: "10px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, uName: e.target.value });
        }}
      />
      {(error.pd?.length > 0) && (
        <div style={{ height: "25px", color: "red" }}>
          <p style={{ fontSize: "small", marginLeft: "10px" }}>{error.pd}</p>
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "400px",
          justifyContent: "space-between",
        }}
      >
        <CssTextField
          required
          error={error.pd?.length > 0}
          id="outlined-basic2"
          label="Password"
          type="password"
          value={loginCred.pd}
          variant="outlined"
          style={{ width: "190px" }}
          onChange={(e) => {
            setLoginCred({ ...loginCred, pd: e.target.value });
          }}
        />
        <CssTextField
          required
          error={error.pd?.length > 0}
          id="outlined-basic2"
          label="Confirm Password"
          type="password"
          value={checkPd}
          onBlur={ValidatePd}
          variant="outlined"
          style={{ width: "190px" }}
          onChange={(e) => {
            // setLoginCred({ ...loginCred, pd: e.target.value });
            setCheckPd(e.target.value);
          }}
        />
      </div>
      {(error.ph?.length > 0) && (
        <div style={{ height: "25px", color: "red" }}>
          <p style={{ fontSize: "small", marginLeft: "10px" }}>{error.ph}</p>
        </div>
      )}
      <CssTextField
        error={error.ph?.length > 0}
        required
        id="outlined-basic2"
        label="Phone Number"
        type="tel"
        value={loginCred.ph}
        inputProps={{
          maxLength:10
        }}
        onBlur={validatePh}
        variant="outlined"
        style={{ width: "400px", margin: "10px" }}
        onChange={(e) => {
          setLoginCred({ ...loginCred, ph: e.target.value });
        }}
      />
      <ReCAPTCHA
        sitekey="6Lf7ulEpAAAAABEA6Kp7ScgeZbgTjmgJtd9rn4LA"
        theme={theme}
        onChange={onChange}
        size="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        disabled={!btnSts}
        style={{ width: "400px", margin: "10px" }}
      >
        Sign-Up
      </Button>
      <div
        className="switch-log-reg"
        onClick={() => {
          setAction("login");
        }}
      >
        Already a registered user?
      </div>
    </div>
  );
};

function Login() {
  const { theme, handleClose, open, action, setAction } =
    useContext(stateProps);
  const [loginCred, setLoginCred] = useState({
    uName: "",
    pd: "",
    ph: "",
    email: "",
  });

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
      open={open?.length > 0}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bolder" }}>
        {action === "login" ? "Log-in to Shopoline" : "Welcome to Shopoline"}
      </DialogTitle>

      <DialogContent style={{ display: "flex", justifyContent: "center" }}>
        <cred.Provider value={{ loginCred, setLoginCred, theme, setAction }}>
          {action == "login" ? <LoginComponent /> : <RegisterComponent />}
        </cred.Provider>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
