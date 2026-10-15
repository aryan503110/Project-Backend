import express from "express";
const router = express.Router();
import {
  SignUp,
  Login,
  Logout,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
  CreatePremiumCheckoutSession,
  ActivatePremium,
  GetUserById,
  UpdateUserById,
} from "../controller/UserController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";
import User from "../model/User.js";
import {
  loginLimiter,
  generalLimiter,
  passwordLimiter,
} from "../utils/RateLimiter.js";

router.post("/signup", generalLimiter, upload.single("image"), SignUp);
router.post("/login", loginLimiter, Login);
router.get("/logout", Logout);
router.get("/profile", generalLimiter, authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user: {
        ...req.user,
        isPremium: user.isPremium,
        premiumStartDate: user.premiumStartDate,
        premiumExpiryDate: user.premiumExpiryDate,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching profile",
      success: false,
    });
  }
});
router.post("/forgot-password", passwordLimiter, ForgotPassword);
router.post("/verify-otp", passwordLimiter, VerifyOTP);
router.put("/reset-password", passwordLimiter, ResetPassword);
router.post(
  "/create-premium-checkout",
  generalLimiter,
  authMiddleware,
  roleMiddleware("customer"),
  CreatePremiumCheckoutSession,
);
router.post(
  "/activate-premium",
  generalLimiter,
  authMiddleware,
  roleMiddleware("customer"),
  ActivatePremium,
);
router.get(
  "/get-user/:id",
  generalLimiter,
  authMiddleware,
  roleMiddleware("customer", "admin", "salesperson"),
  GetUserById,
);
router.put(
  "/update-user/:id",
  generalLimiter,
  upload.single("image"),
  authMiddleware,
  roleMiddleware("customer", "admin", "salesperson"),
  UpdateUserById,
);

export default router;
