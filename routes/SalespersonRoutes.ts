import express from "express";
const router = express.Router();
import { GetAllProduct } from "../controller/AdminController.js";
import {
  GetAllSalespersonStockRequests,
  CreateSalespersonStockRequests,
  ApproveSalespersonStockRequest,
  RejectSalespersonStockRequest,
  MyStockForSalesperson,
<<<<<<< HEAD
  MyStockForSalespersonById
=======
  MyStockForSalespersonById,
  UpdateMyStockSalespersonById,
  GetAllSalespersonStockRequestsById,
  GetMyOrdersBySalespersonId,
  ChangeStatusOrder
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
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
<<<<<<< HEAD
  roleMiddleware("salesperson"),
=======
  roleMiddleware("admin","salesperson"),
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
  GetAllProduct,
);

{
  /*Stock Requests */
}

router.get(
<<<<<<< HEAD
  "/allstockrequests/:id",
  authMiddleware,
  roleMiddleware("salesperson","admin"),
  GetAllSalespersonStockRequests,
=======
  "/allstockrequests",
  authMiddleware,
  roleMiddleware("salesperson", "admin"),
  GetAllSalespersonStockRequests,
);

router.get(
  "/allstockrequests/:id",
  authMiddleware,
  roleMiddleware("salesperson", "admin"),
  GetAllSalespersonStockRequestsById,
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
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

<<<<<<< HEAD
=======
{
  /*My Stock Salesperson */
}

>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
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

<<<<<<< HEAD
=======
router.put(
  "/updatesalespersonmystockbyid/:id",
  authMiddleware,
  roleMiddleware("salesperson"),
  UpdateMyStockSalespersonById,
);

{
  /*Orders */
}
router.get(
  "/ordersbysalesperson/:id",
  authMiddleware,
  roleMiddleware("salesperson"),
  GetMyOrdersBySalespersonId,
);

router.put(
  "/changeorderstatus",
  authMiddleware,
  roleMiddleware("salesperson"),
  ChangeStatusOrder,
);

>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
export default router;
