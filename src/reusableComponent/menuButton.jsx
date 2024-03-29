import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function MenuButton({ label, options, theme }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper {
        background-color: ${theme === "light" ? "whitesmoke" : "#4d6160"};
        color:${theme === "dark" ? "whitesmoke" : "#4d6160"};
      }
      .css-j204z7-MuiFormControlLabel-root{
        margin-right:0px;
      }
    `;
    document.head.appendChild(style);
  }, [theme]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        style={{ maxHeight: "300px" }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options?.length > 0 &&
          options.map((el, i) => {
            return (
              <MenuItem
                onClick={() => {
                  el.close && handleClose();
                  el.handleClickOption(el.name);
                }}
                key={i}
                style={{ margin:'2px 0px'}}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "0px 1px",
                    width: "120px",
                    justifyContent: "space-between",
                  }}
                  key={i}
                >
                  {el.item && (
                    <span
                    key={i+1}
                      style={{
                        //   marginRight: "7px",
                        width: "40px",
                        color: theme === "dark" ? "white" : "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      {el.item}
                    </span>
                  )}
                  <span
                  key={i+2}
                    style={{
                      //   marginRight: "7px",
                      width: "80px",
                      display: "flex",
                      alignItems: "flex-start",
                      fontSize:'13px'
                    }}
                  >
                    {el.name}
                  </span>
                </div>
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
}
