import express from "express";
const router = express.Router();
import { SignUp, Login, Logout, ForgotPassword, VerifyOTP, ResetPassword, CreatePremiumCheckoutSession, ActivatePremium, GetUserById, UpdateUserById, } from "../controller/UserController.js";
import { authMiddleware, roleMiddleware, } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/Upload.js";
import User from "../model/User.js";
router.post("/signup", upload.single("image"), SignUp);
router.post("/login", Login);
router.get("/logout", Logout);
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching profile",
            success: false,
        });
    }
});
router.post("/forgot-password", ForgotPassword);
router.post("/verify-otp", VerifyOTP);
router.put("/reset-password", ResetPassword);
router.post("/create-premium-checkout", authMiddleware, roleMiddleware("customer"), CreatePremiumCheckoutSession);
router.post("/activate-premium", authMiddleware, roleMiddleware("customer"), ActivatePremium);
router.get("/get-user/:id", authMiddleware, roleMiddleware("customer", "admin", "salesperson"), GetUserById);
router.put("/update-user/:id", upload.single("image"), authMiddleware, roleMiddleware("customer", "admin", "salesperson"), UpdateUserById);
export default router;
//# sourceMappingURL=UserRoute.js.map