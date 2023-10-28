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
import CountrySelect from "../CountrySelect/CountrySelect";
import { authActions } from "../store/user-auth";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState({
    country: "",
    phoneCode: "",
    code: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countryCodeHandler = (country, phoneCode, code) => {
    setCountryCode((prevState) => {
      return {
        ...prevState,
        country: country,
        phoneCode: phoneCode,
        code: code,
      };
    });
  };

  const mobileChangeHandler = (event) => {
    setMobile(event.target.value);
  };

  const firstNameChangeHandler = (event) => {
    setFirsName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const userObj = {
      firstName,
      lastName,
      mobile,
      username: email,
      password,
      country: countryCode.country,
      phoneCode: countryCode.phoneCode,
    };

    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(userObj),
    });

    const responseObj = await response.json();
    localStorage.setItem("token", responseObj.token);

    if (responseObj.token) {
      dispatch(authActions.setLogin({ loginState: true }));
      dispatch(authActions.setUsername({ email }));
      dispatch(authActions.setFirstName({ name: responseObj.firstName }));
      navigate("/");
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
        }}
      >
        <div>
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{
              width: "15%",
              height: "15%",
              marginLeft: "44%",
              marginRight: "30%",
            }}
          />
        </div>
        <div>
          <Typography variant="h5" align="center">
            {" "}
            Coursey
          </Typography>

          <Typography variant="body1" align="center">
            {" "}
            Start your learning journey with Coursey
          </Typography>
        </div>

        <br />
        <div>
          <form onSubmit={submitHandler} noValidate>
            <TextField
              required
              id="outlined-required-firstName"
              label="First Name"
              size="small"
              type="text"
              sx={{ margin: "0.75rem", marginLeft: "1rem" }}
              defaultValue={firstName}
              onChange={firstNameChangeHandler}
            />
            <TextField
              required
              id="outlined-required-LastName"
              label="Last Name"
              size="small"
              type="text"
              sx={{ margin: "0.75rem", marginLeft: "1rem" }}
              defaultValue={lastName}
              onChange={lastNameChangeHandler}
            />
            <div>
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
            <div style={{ display: "flex", flexWrap: "true" }}>
              <CountrySelect setCodeCountry={countryCodeHandler} />
              <TextField
                required
                id="outlined-requiredjrngkjnrj"
                label="Mobile"
                size="small"
                type="text"
                sx={{ margin: "0.75rem", marginLeft: "1 rem" }}
                defaultValue={mobile}
                onChange={mobileChangeHandler}
                maxLength="1"
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  margin: "0.75rem",
                  marginLeft: "1rem",
                  width: "95%",
                }}
              >
                Signup{" "}
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

export default Signup;
