import express from "express";
const router = express.Router();
import {
  GetAllSalesperson,
  GetSalesPersonById,
  UpdateSalesPersonById,
  CreateCategory,
  GetAllCategory
} from "../controller/AdminController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";

router.get(
  "/allsalesperson",
  authMiddleware,
  roleMiddleware("admin"),
  GetAllSalesperson,
);

router.get(
  "/getsalespersonbyid/:id",
  authMiddleware,
  roleMiddleware("admin"),
  GetSalesPersonById,
);

router.put(
  "/updatesalespersonbyid",
  upload.single("image"),
  authMiddleware,
  roleMiddleware("admin"),
  UpdateSalesPersonById,
);

router.get(
  "/allcategories",
  authMiddleware,
  roleMiddleware("admin"),
  GetAllCategory,
);

router.post(
  "/createcategory",
  authMiddleware,
  roleMiddleware("admin"),
  CreateCategory,
);

export default router;


