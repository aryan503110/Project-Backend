import express from "express";
const router = express.Router();
import { GetAllSalesperson } from "../controller/AdminController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

router.get(
  "/allsalesperson",
  authMiddleware,
  roleMiddleware("admin"),
  GetAllSalesperson,
);

export default router;
