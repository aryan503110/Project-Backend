import express from "express";
const router = express.Router();
import {
  SignUp,
  Login,
  Logout,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
<<<<<<< HEAD
} from "../controller/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";
=======
  CreatePremiumCheckoutSession,
  ActivatePremium,
} from "../controller/UserController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";
import User from "../model/User.js";
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7

router.post("/signup", upload.single("image"), SignUp);
router.post("/login", Login);
router.get("/logout", Logout);
<<<<<<< HEAD
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
=======
router.get("/profile", authMiddleware, async (req, res) => {
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
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
});
router.post("/forgot-password", ForgotPassword);
router.post("/verify-otp", VerifyOTP);
router.put("/reset-password", ResetPassword);
<<<<<<< HEAD
=======
router.post(
  "/create-premium-checkout",
  authMiddleware,
  roleMiddleware("customer"),
  CreatePremiumCheckoutSession,
);
router.post(
  "/activate-premium",
  authMiddleware,
  roleMiddleware("customer"),
  ActivatePremium,
);
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7

export default router;
