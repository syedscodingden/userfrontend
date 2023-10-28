import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Chip, Tooltip } from "@mui/material";
import { cartActions } from "../store/cart-slice";
import { useDispatch } from "react-redux";

const CourseItem = (props) => {
  const dispatch = useDispatch();
  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        itemId: props.id,
        price: props.price,
        quantity: 1,
        title: props.title,
        description: props.description,
        imageLink: props.imageLink,
      })
    );
  };

  return (
    <Card sx={{ maxWidth: 400, marginRight: 0 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.imageLink}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{props.title}</span>
          <span style={{ fontSize: "70%" }}>
            <Chip label={`₹ ${props.price}`} />
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Details
          </Button>
        </span>
        <span>
          <Chip
            label="Bestseller"
            variant="outlined"
            sx={{
              borderRadius: 1,
              backgroundColor: "#ffdd00",
            }}
          />
        </span>
      </CardActions>
    </Card>
  );
};

export default CourseItem;
