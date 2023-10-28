import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { Button, Card, CardActionArea, CardMedia } from "@mui/material";
import { cartActions } from "../store/cart-slice";

const CartItem = (props) => {
  const { title, quantity, total, price, imageLink } = props.item;
  const dispatch = useDispatch();

  const decrementItemQuantityHandler = () => {
    dispatch(cartActions.removeItemFromCart(props.id));
  };

  return (
    <li className={classes.item}>
      <header className={classes.header}>
        <span style={{ display: "flex" }}>
          <Card sx={{ maxWidth: "8rem" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="90"
                image={imageLink}
                alt="green iguana"
                sx={{ width: "8rem" }}
              />
            </CardActionArea>
          </Card>
          <h4 style={{ marginLeft: "1rem", marginTop: "-0.2rem" }}>{title}</h4>
        </span>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              variant="outlined"
              sx={{ marginRight: "1rem" }}
              onClick={decrementItemQuantityHandler}
            >
              Remove
            </Button>
          </div>
          <div className={classes.price}>₹{total.toFixed(2)} </div>
        </span>
      </header>
    </li>
  );
};

export default CartItem;
