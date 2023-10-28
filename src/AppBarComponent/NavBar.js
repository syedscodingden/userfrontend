import * as React from "react";
import ReactDOM from "react-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/user-auth";
import CartButton from "../Cart/CartButton";
import { uiActions } from "../store/ui-slice";
import Cart from "../Cart/Cart";
import Backdrop from "./Backdrop";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = () => {
    dispatch(uiActions.toggle());
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    dispatch(authActions.setLogin({ loginState: false }));
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const checkUserIsValid = React.useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(authActions.setLogin({ loginState: false }));
        console.log("Please login first");
        return;
      }

      const authToken = "Bearer " + token;

      const response = await fetch("http://localhost:3000/users/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: authToken,
        },

        //make sure to serialize your JSON body
      });
      if (!response.ok) {
        dispatch(authActions.setLogin({ loginState: false }));
        throw new Error();
      }
      const responseObj = await response.json();
      console.log("inside navbar");
      dispatch(authActions.setLogin({ loginState: true }));
      dispatch(authActions.setFirstName({ name: responseObj.firstName }));
    } catch (error) {
      console.log(error);
    }
  }, [navigate, dispatch]);

  React.useEffect(() => {
    checkUserIsValid();
  }, [checkUserIsValid]);

  const loggedOutNavbar = (
    <React.Fragment>
      {" "}
      <Button
        onClick={handleLogin}
        sx={{
          my: 2,
          color: "white",
          display: "block",
          marginTop: "5px",
          marginBottom: "20px",
          ":hover": {
            background: "#555",
          },
        }}
      >
        Login
      </Button>
      <Button
        onClick={handleSignup}
        sx={{
          my: 2,
          color: "white",
          display: "block",
          marginTop: "5px",
          marginBottom: "20px",
          ":hover": {
            background: "#555",
          },
        }}
      >
        Signup
      </Button>
    </React.Fragment>
  );

  const loggedInNavbar = (
    <React.Fragment>
      {" "}
      <Button
        onClick={handleHome}
        sx={{
          my: 2,
          color: "white",
          display: "block",
          marginTop: "5px",
          marginBottom: "20px",
          ":hover": {
            background: "#555",
          },
        }}
      >
        Home
      </Button>
      <Button
        sx={{
          my: 2,
          color: "white",
          display: "block",
          marginTop: "5px",
          marginBottom: "20px",
          ":hover": {
            background: "#555",
          },
        }}
        onClick={() => {
          navigate("/courses");
        }}
      >
        Courses
      </Button>
      <Button
        sx={{
          my: 2,
          color: "white",
          display: "block",
          marginTop: "5px",
          marginBottom: "20px",
          ":hover": {
            background: "#555",
          },
        }}
        onClick={() => {
          navigate("/mycourses");
        }}
      >
        My Courses
      </Button>
      <CartButton />
      {isLoggedIn &&
        showCart &&
        ReactDOM.createPortal(
          <Backdrop onConfirm={handleClose} />,
          document.getElementById("cart-backdrop")
        )}
      {isLoggedIn &&
        showCart &&
        ReactDOM.createPortal(
          <Cart onConfirm={handleClose} />,
          document.getElementById("cart-component")
        )}
      <Button
        onClick={handleLogout}
        sx={{
          my: 2,
          color: "white",
          display: "block",
          marginTop: "5px",
          marginBottom: "20px",
          marginRight: "8px",
          ":hover": {
            background: "#555",
          },
        }}
      >
        Logout
      </Button>
    </React.Fragment>
  );

  return (
    <AppBar
      position="static"
      sx={{
        maxHeight: "52px",
        paddingTop: "5px",
        paddingBottom: "20px",
        backgroundColor: "black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              marginTop: "5px",
              paddingBottom: "20px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/home");
              } else {
                navigate("/");
              }
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              marginTop: "5px",
              paddingBottom: "20px",
            }}
          >
            Coursey
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "right" },
            }}
          >
            {!isLoggedIn && loggedOutNavbar}
            {isLoggedIn && loggedInNavbar}
          </Box>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, marginBottom: "22px" }}
                >
                  <Avatar alt="Remy Sharp" src="" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
