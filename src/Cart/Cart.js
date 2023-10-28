import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import React from "react";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import { Button, Icon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { purchasedCourses } from "../store/cart-actions";
import { uiActions } from "../store/ui-slice";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.cart.items);
  //   const cartItems = useSelector((state) => state.cart.items);
  const cartPrice = useSelector((state) => state.cart.totalPriceOfCart);

  const checkoutHandler = () => {
    dispatch(uiActions.toggle());
    dispatch(purchasedCourses(courses));
    navigate("/mycourses");
  };

  return (
    <Card className={classes.modal}>
      <div className={classes.cart}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Your Cart</h2>
          <Icon
            sx={{
              marginTop: "1rem",
              marginRight: "0.6rem",
              borderRadius: "50%",
              paddingLeft: "2px",
              paddingRight: "2px",
              paddingBottom: "5px",
              paddingTop: "-2px",
              ":hover": { backgroundColor: "#E0E0E0" },
            }}
            fontSize="large"
            onClick={props.onConfirm}
          >
            <CloseIcon fontSize="large"></CloseIcon>
          </Icon>
        </span>
        <ul style={{ padding: 0 }}>
          {courses.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.itemId}
                id={cartItem.itemId}
                item={{
                  title: cartItem.title,
                  quantity: 1,
                  total: +cartItem.price,
                  price: +cartItem.price,
                  imageLink: cartItem.imageLink,
                }}
              />
            );
          })}
        </ul>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Total Amount</h2>
          <h2 style={{ marginRight: "2.5rem" }}>₹{cartPrice}</h2>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          variant="outlined"
          sx={{ margin: "1rem", marginRight: "2.5rem", width: "70%" }}
          onClick={checkoutHandler}
        >
          Checkout
        </Button>
      </div>
    </Card>
  );
};

export default Cart;
