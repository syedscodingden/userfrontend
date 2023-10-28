import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./Login.module.css";
import logo from "../images/logo.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/user-auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        username: email,
        password,
      },

      //make sure to serialize your JSON body
    });

    const responseObj = await response.json();
    localStorage.setItem("token", responseObj.token);

    if (responseObj.token) {
      dispatch(authActions.setFirstName({ name: responseObj.firstName }));
      dispatch(authActions.setLogin({ loginState: true }));
      dispatch(authActions.setUsername({ email }));
      console.log(responseObj);
      navigate("/home");
    }
  };

  return (
    <div className={classes.formCard}>
      <Box
        sx={{
          p: "2%",
          m: 10,
          boxShadow: "  0 0 3px 3px #d6d6d6",
          borderRadius: "5%",
          width: "20%",
        }}
      >
        <div>
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{
              width: "25%",
              height: "25%",
              marginLeft: "35%",
              marginRight: "30%",
            }}
          />
        </div>
        <div>
          <Typography
            variant="h5"
            sx={{ marginLeft: "30%", marginRight: "30%" }}
          >
            {" "}
            Coursey
          </Typography>

          <Typography
            variant="caption"
            sx={{ marginLeft: "18%", marginRight: "15%" }}
          >
            {" "}
            Continue to log into Coursey
          </Typography>
        </div>

        <br />
        <div>
          <form onSubmit={submitHandler} noValidate>
            <TextField
              required
              id="outlined-required"
              label="Email"
              size="small"
              type="email"
              sx={{ margin: "0.75rem", marginLeft: "1rem" }}
              defaultValue={email}
              onChange={emailChangeHandler}
            />
            <div>
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                size="small"
                sx={{ margin: "0.75rem", marginLeft: "1rem" }}
                defaultValue={password}
                onChange={passwordChangeHandler}
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  margin: "0.75rem",
                  marginLeft: "1rem",
                  width: "87%",
                }}
              >
                Login{" "}
                <Icon
                  sx={{
                    border: "1px solid black",
                    borderRadius: "60%",
                    marginLeft: "0.5rem",
                    backgroundColor: "black",
                    fontSize: "14px",
                  }}
                >
                  <KeyboardArrowRightIcon
                    sx={{
                      color: "white",
                      fontSize: "15px",
                      marginBottom: "1.5px",
                    }}
                  ></KeyboardArrowRightIcon>
                </Icon>
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default Login;
