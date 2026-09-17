import express from "express";
const router = express.Router();
import { SignUp, Login, Logout } from "../controller/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
