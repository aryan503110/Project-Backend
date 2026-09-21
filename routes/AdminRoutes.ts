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
  CreateProduct,
  GetAllProduct,
  GetProductById,
  UpdateProductById,
  DeleteProductById,
  CreateAdminStock,
  GetAllAdminStock,
  DeleteAdminStock,
  GetAdminStockById,
  UpdateAdminStockById,
} from "../controller/AdminController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";

{
  /*Salesperson */
}
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

{
  /*Category */
}

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

{
  /*Product */
}

router.get(
  "/allproducts",
  authMiddleware,
  roleMiddleware("admin"),
  GetAllProduct,
);

router.post(
  "/createproduct",
  upload.single("image"),
  authMiddleware,
  roleMiddleware("admin"),
  CreateProduct,
);

router.get(
  "/getproductbyid/:id",
  authMiddleware,
  roleMiddleware("admin"),
  GetProductById,
);

router.put(
  "/upadteproduct/:id",
  upload.single("image"),
  authMiddleware,
  roleMiddleware("admin"),
  UpdateProductById,
);

router.delete(
  "/deleteproduct/:id",
  authMiddleware,
  roleMiddleware("admin"),
  DeleteProductById,
);

{
  /*Admin Stock */
}

router.post(
  "/createadminstock",
  authMiddleware,
  roleMiddleware("admin"),
  CreateAdminStock,
);

router.get(
  "/alladminstock",
  authMiddleware,
  roleMiddleware("admin"),
  GetAllAdminStock,
);

router.get(
  "/getadminstockbyid/:id",
  authMiddleware,
  roleMiddleware("admin"),
  GetAdminStockById,
);

router.delete(
  "/deleteadminstock/:id",
  authMiddleware,
  roleMiddleware("admin"),
  DeleteAdminStock,
);

router.put(
  "/updateadminstock/:id",
  authMiddleware,
  roleMiddleware("admin"),
  UpdateAdminStockById,
);

export default router;
