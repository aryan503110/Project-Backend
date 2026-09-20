import express from "express";
const router = express.Router();
import {
  GetAllSalesperson,
  GetSalesPersonById,
  UpdateSalesPersonById,
  CreateCategory,
  GetAllCategory,
  GetCategoryById,
  UpdateCategoryById,
  DeleteCategoryById,
} from "../controller/AdminController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";


{/*Salesperson */}
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

{/*Category */}

router.post(
  "/createcategory",
  authMiddleware,
  roleMiddleware("admin"),
  CreateCategory,
);

router.get(
  "/allcategories",
  authMiddleware,
  roleMiddleware("admin"),
  GetAllCategory,
);

router.get(
  "/getcategorybyid/:id",
  authMiddleware,
  roleMiddleware("admin"),
  GetCategoryById,
);

router.put(
  "/updatecategory/:id",
  authMiddleware,
  roleMiddleware("admin"),
  UpdateCategoryById,
);

router.delete(
  "/deletecategory/:id",
  authMiddleware,
  roleMiddleware("admin"),
  DeleteCategoryById,
);

{/*Product */}

export default router;
