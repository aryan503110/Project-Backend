import express from "express";
const router = express.Router();
import {
  GetAvailableProductsForCustomer,
  ViewProductByIdCustomer,
  CreateCheckoutSession,
  CreateOrder,
  GetMyOrdersByCustomerId,
  CreateBasketCheckoutSession,
  CreateCustomBasket,
  GetBasketOrdersByCustomerId
} from "../controller/CustomerController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

{
  /*Customer Explroe */
}

router.get(
  "/availablecustomerproducts",
  authMiddleware,
  roleMiddleware("customer"),
  GetAvailableProductsForCustomer,
);

router.get(
  "/productbyidcustomer/:id",
  authMiddleware,
  roleMiddleware("customer"),
  ViewProductByIdCustomer,
);

router.post(
  "/create-checkout-session",
  authMiddleware,
  roleMiddleware("customer"),
  CreateCheckoutSession,
);

router.post(
  "/create-order",
  authMiddleware,
  roleMiddleware("customer"),
  CreateOrder,
);

router.get(
  "/myorder/:id",
  authMiddleware,
  roleMiddleware("customer"),
  GetMyOrdersByCustomerId,
);

{
  /*Custom Basket */
}

router.post(
  "/createbasketcheckout",
  authMiddleware,
  roleMiddleware("customer"),
  CreateBasketCheckoutSession,
);

router.post(
  "/createbasket",
  authMiddleware,
  roleMiddleware("customer"),
  CreateCustomBasket,
);

router.get(
  "/getbaskets/:id",
  authMiddleware,
  roleMiddleware("customer"),
  GetBasketOrdersByCustomerId,
);

export default router;
