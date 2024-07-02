import React, { useEffect, useState } from "react";
import "./Navbar.css";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { getUserData } from "../../Services/UserModel";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [userData, setUserData] = useState(null);

  let profileImg = require("../../Assets/Account inactive.svg").default;
  let LogoutImg = require("../../Assets/Logout inactive.svg").default;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data.user);
        console.log(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const initials = userData?.username
    ? userData.username.charAt(0).toUpperCase()
    : "";

  return (
    <div className="navbar d-flex flex-row-reverse">
      {userData && (
        <div className="navbarProfile">
          <Stack direction="row" spacing={2} alignItems="center">
            <div className="profilePicture">{initials}</div>
            <div
              className="username"
              ref={anchorRef}
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {userData.username}
            </div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>
                          <NavLink
                            className="profileLinks"
                            to="/account-settings"
                          >
                            <img
                              src={profileImg}
                              alt="Profile"
                              style={{ marginRight: "5px" }}
                            />
                            Account Settings
                          </NavLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <NavLink className="profileLinks" to="/logIn">
                            <img
                              src={LogoutImg}
                              alt="Logout"
                              style={{ marginRight: "5px" }}
                            />
                            Logout
                          </NavLink>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Stack>
        </div>
      )}
    </div>
  );
}
