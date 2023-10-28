import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { coursesActions } from "../store/courses-slice";
import { authActions } from "../store/user-auth";
import homeImage from "../images/homePage.jpg";
import StatsComponent from "./StatsComponent";
import Course from "../CourseComponent/Course";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.firstName);
  const courses = useSelector((state) => state.courses.courses);

  const fetchCourses = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error();
      }

      const authToken = "Bearer " + token;

      const response = await fetch("http://localhost:3000/users/courses", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: authToken,
        },

        //make sure to serialize your JSON body
      });
      if (!response.ok) {
        throw new Error();
      }
      console.log("inside home");
      const responseObj = await response.json();
      dispatch(coursesActions.setCourses(responseObj.courses));
    } catch (error) {
      console.log(error);
      dispatch(coursesActions.setCourses([]));
      navigate("/");
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div>
      <Grid
        container
        sx={{
          marginTop: "0.02rem",
        }}
        spacing={2}
      >
        <Grid
          item
          key="unique"
          xs={6}
          md={6}
          sx={{
            backgroundColor: "#F0F0F0",
            height: "37rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginLeft: "20%",
              marginTop: "15%",
              marginBottom: "0%",
              fontFamily: "Arial",
              fontWeight: "600",
            }}
          >
            {" "}
            <div style={{ margin: "2%" }}>Improve your </div>
            <div style={{ margin: "2%" }}>skills in the</div>
            <div style={{ margin: "2%" }}>digitized era.</div>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginTop: "2%",
              marginLeft: "20%",
              fontFamily: "Arial",
              fontWeight: "400",
              fontSize: "85%",
            }}
          >
            {" "}
            <div style={{ margin: "1.5%" }}>
              Start upskilling for a bright future and join
            </div>
            <div style={{ margin: "1.5%" }}>
              the community of focused and enthusiastic learners.
            </div>
            <div style={{ margin: "1.5%" }}>Get started right away</div>
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000058",
              marginLeft: "20%",
              marginTop: "2%",
              textTransform: "capitalize",
            }}
          >
            Get Started
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#D0D0D0",
              marginLeft: "5%",
              marginTop: "2%",
              textTransform: "capitalize",
              color: "black",
            }}
          >
            Learn More
          </Button>
          <Typography
            variant="h6"
            sx={{
              marginTop: "8%",
              marginLeft: "20%",
              fontFamily: "Arial",
              display: "flex",
            }}
          >
            {" "}
            <StatsComponent
              statsValue={"350"}
              description={"Online courses"}
            ></StatsComponent>
            <StatsComponent
              statsValue={"10"}
              description={"Great Mentors"}
            ></StatsComponent>
            <StatsComponent
              statsValue={"210"}
              description={"Official Partners"}
            ></StatsComponent>
          </Typography>
        </Grid>
        <Grid
          xs={6}
          md={6}
          sx={{
            padding: 0,
            height: "37rem",
          }}
        >
          <Paper
            sx={{
              padding: 0,
              margin: 0,
              backgroundColor: "#F0F0F0",
              borderRadius: 0,
              height: "20rem",
            }}
            elevation={3}
          >
            <img
              src={homeImage}
              alt="home"
              style={{
                width: "40.2rem",
                height: "37rem",
                margin: 0,
                padding: 0,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ margin: 4 }}>
        {" "}
        Let's start learning, {name}
      </Typography>
      <Grid
        container
        spacing={2}
        columnSpacing={1}
        sx={{
          paddingLeft: "2%",
          paddingRight: "1%",
          paddingBottom: "2%",
        }}
      >
        {courses.map((course) => {
          return (
            <Grid xs={4} sx={{ padding: "1%" }}>
              <Course
                key={course._id}
                id={course._id}
                title={course.title}
                imageLink={course.imageLink}
                description={course.description}
                price={course.price}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;
