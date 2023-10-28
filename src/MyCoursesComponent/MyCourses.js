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
import coursesImage from "../images/coursesImage.jpg";
import CourseItem from "./CourseItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.firstName);
  const courses = useSelector((state) => state.purchases.purchasedItems);

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
          xs={12}
          md={12}
          sx={{
            padding: 0,
            height: "35rem",
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
              src={coursesImage}
              alt="home"
              style={{
                width: "100%",
                height: "40rem",
                margin: 0,
                padding: 0,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ marginLeft: 4, marginBottom: 4 }}>
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
              <CourseItem
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

export default MyCourses;
