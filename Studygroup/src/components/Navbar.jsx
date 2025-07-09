import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = React.useState();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Logout = () => {
    axios.post("http://localhost:3000/logout").then((res) => {
      console.log(res);
      toast.success("Logout Successfull", {
        position: "bottom-left",
      });
      setAnchorElUser(null);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    });
  };

  const loginButton = (
    <>
      <Link to="/signup">
        <Button key={"signup"} sx={{ color: "#fff" }}>
          {"Signup"}
        </Button>
      </Link>
    </>
  );

  const userLogin = (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <img
            src="https://avatar.iran.liara.run/public/boy"
            style={{ borderRadius: "50%" }}
            height={50}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link to="/profile">
          <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>Profile</Typography>
          </MenuItem>
        </Link>

        <MenuItem key={"Logout"} onClick={Logout}>
          <Typography sx={{ textAlign: "center" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <img
            src="/download.png"
            alt=""
            height={50}
            style={{ marginRight: "1rem" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            StudyGroupFinder
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/">
              <Button key={"Home"} sx={{ color: "#fff" }}>
                Home
              </Button>
            </Link>
            {isLoggedIn && (
              <Typography variant="button">{`Hi ${user.name}..!`}</Typography>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>{user ? userLogin : loginButton}</Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
