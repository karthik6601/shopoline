import React, { useContext } from "react";
import MenuButton from "../../reusableComponent/menuButton";  
import { User } from "lucide-react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LogIn } from "lucide-react";
import { UserPlus } from "lucide-react";
import SearchBox from "./SearchBox";
import { stateProps } from "../../Routes/routes";
import { USER_ACTION } from "../../App";
import { useNavigate } from "react-router-dom";

// import Drop

function Navbar() {
  const {theme, setTheme, handleSearch, user, setUser, USER_ACTION} = useContext(stateProps);
  const navigate= useNavigate();
  
  const handleLogin=()=>{
    setUser({type:USER_ACTION.LOGIN})
  }
  const handleNewUser=()=>{
    setUser({type:USER_ACTION.REG})
  }
  const handleLoginClose=()=>{
    setUser({type:USER_ACTION.CLOSE})
  }

  

  return (
    <div className="navbar">
      
      <div
        style={{ width: "30%", display: "flex", justifyContent: "flex-start", padding:'0px 40px ' }}
      >
        {/* <Dropdown/> */}
        <h2 className="name" onClick={()=>{navigate('/')}}>SHOPOLINE</h2>
      </div>
      <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
      <SearchBox handleSearch={handleSearch} />
      </div>
      <div
        style={{
          width: "30%",
          display: "flex",
          justifyContent: "flex-end",
          padding: "5px",
          alignItems: "center",
        }}
      >
        {/* <div className=''> */}
        
        <MenuButton
          label={<User color="black" />}
          options={[
            {
              item: <LogIn size={'16px'} onClick={handleLogin}/>,
              close: true,
              name: "Log-In",
              handleClickOption:handleLogin
            },
            {
              item: <UserPlus size={"16px"}/>,
              close: true,
              name: "New User",
              handleClickOption:handleNewUser
            },
          ]}
          theme={theme}
        />
        <div>
          <ToggleTheme theme={theme} setTheme={setTheme} />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

const ToggleTheme = ({ theme, setTheme }) => {
  const [toggle, setToggle] = React.useState(theme == "dark");
  React.useEffect(() => {
    setTheme(() => (toggle ? "dark" : "light"));
  }, [toggle]);
  return (
    <FormControlLabel
      control={<MaterialUISwitch sx={{ m: 1 }} />}
      // checked={theme=='dark'}
      checked={toggle}
      onChange={(e) => {
        setToggle(!toggle);
      }}
      // label={'Switch Theme'}
    />
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 59,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default Navbar;
