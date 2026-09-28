import express from "express";
const router = express.Router();
import {
  GetAvailableProductsForCustomer,
  ViewProductByIdCustomer,
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

export default router;
