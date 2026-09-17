import express from "express";
const router = express.Router();
import { SignUp, Login ,Logout} from "../controller/UserController.js";

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/logout", Logout);

export default router;
