import express from "express";
const router = express.Router();
import {
  SignUp,
  Login,
  Logout,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
} from "../controller/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";

router.post("/signup", upload.single("image"), SignUp);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.post("/forgot-password", ForgotPassword);
router.post("/verify-otp", VerifyOTP);
router.put("/reset-password", ResetPassword);

export default router;
