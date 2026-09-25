import express from "express";
const router = express.Router();
import { GetAllProduct } from "../controller/AdminController.js";
import {
  GetAllSalespersonStockRequests,
  CreateSalespersonStockRequests,
  ApproveSalespersonStockRequest,
  RejectSalespersonStockRequest,
  MyStockForSalesperson,
  MyStockForSalespersonById
} from "../controller/SalespersonController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

{
  /*Products */
}
router.get(
  "/allproducts",
  authMiddleware,
  roleMiddleware("salesperson"),
  GetAllProduct,
);

{
  /*Stock Requests */
}

router.get(
  "/allstockrequests/:id",
  authMiddleware,
  roleMiddleware("salesperson","admin"),
  GetAllSalespersonStockRequests,
);

router.post(
  "/createstockrequest",
  authMiddleware,
  roleMiddleware("salesperson"),
  CreateSalespersonStockRequests,
);

router.put(
  "/approvestockrequest/:id",
  authMiddleware,
  roleMiddleware("admin"),
  ApproveSalespersonStockRequest,
);

router.put(
  "/rejectstockrequest/:id",
  authMiddleware,
  roleMiddleware("admin"),
  RejectSalespersonStockRequest,
);

router.get(
  "/salespersonmystock/:id",
  authMiddleware,
  roleMiddleware("salesperson"),
  MyStockForSalesperson,
);

router.get(
  "/salespersonmystockbyid/:id",
  authMiddleware,
  roleMiddleware("salesperson"),
  MyStockForSalespersonById,
);

export default router;
