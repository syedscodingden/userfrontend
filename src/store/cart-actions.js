import { cartActions } from "./cart-slice";
import { purchasesActions } from "./my-courses-slice";

export const purchasedCourses = (courses) => {
  return async (dispatch) => {
    const purchaseItems = async () => {
      let response;
      let data;
      const token = localStorage.getItem("token");
      const authToken = "Bearer " + token;
      console.log("starting to dispatch 1");
      courses.forEach(async (course) => {
        response = await fetch(
          "http://localhost:3000/users/courses/" + course.itemId,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: authToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Could not purchase the course");
        }
        data = await response.json();
      });

      return data;
    };

    try {
      const response = await purchaseItems();
      console.log("starting to dispatch 2");
      courses.forEach((course) => {
        dispatch(
          purchasesActions.addItemToPurchases({
            itemId: course.itemId,
            price: course.price,
            title: course.title,
            description: course.description,
            imageLink: course.imageLink,
          })
        );
      });
      dispatch(cartActions.emptyCart());
      console.log("dispatched succesfully");
      console.log("Course purchased successfully");
    } catch (error) {
      console.log(error);
      console.log("failed to purchase cart");
    }
  };
};
