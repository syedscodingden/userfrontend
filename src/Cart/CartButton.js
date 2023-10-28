import { useDispatch } from "react-redux";
import classes from "./CartButton.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { uiActions } from "../store/ui-slice";

const CartButton = (props) => {
  //   const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button
      className={classes.button}
      style={{ border: "2px solid white" }}
      onClick={toggleCartHandler}
    >
      <span>
        <ShoppingCartIcon
          fontSize="large"
          sx={{
            paddingTop: "8px",
            marginTop: "-10px",
          }}
        ></ShoppingCartIcon>
      </span>
      <span className={classes.badge}>{0}</span>
    </button>
  );
};

export default CartButton;
