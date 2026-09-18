import connectToDB from "../db/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import PasswordReset from "../model/PasswordReset.js";
import type { Request, Response } from "express";
import { sendEmail } from "../utils/SendMail.js";
import crypto from "crypto";

type Role = "" | "admin" | "salesperson" | "customer";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface SignUpResponse {
  message: string;
  success: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  success: boolean;
}

interface ForgotPaswordData {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

interface VerifyOTPData {
  email: string;
  otp: number;
}

interface VerifyOTPResponse {
  message: string;
  success: boolean;
}

interface ResetPasswordData {
  email: string;
  newPassword: number;
}

interface ResetPassworResponse {
  message: string;
  success: boolean;
}

export const SignUp = async (
  req: Request<{}, {}, SignUpData>,
  res: Response<SignUpResponse>,
) => {
  try {
    await connectToDB();

    const { name, email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    await sendEmail(
      email,
      "Welcome to Our Application",
      `Hello ${name}, your account has been successfully created.These are your credentials Email:${email} and Password:${password} and the role assigned is ${role}.`,
    );

    return res.status(201).json({
      message: "New user created",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating user",
      success: false,
    });
  }
};

export const Login = async (
  req: Request<{}, {}, LoginData>,
  res: Response<LoginResponse>,
) => {
  try {
    await connectToDB();

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "Wrong email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      role: user?.role,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error logging in user",
      success: false,
    });
  }
};

export const Logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error logging out user",
      success: false,
    });
  }
};

export const ForgotPassword = async (
  req: Request<{}, {}, ForgotPaswordData>,
  res: Response<ForgotPasswordResponse>,
) => {
  try {
    await connectToDB();

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exists",
        success: false,
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PasswordReset.deleteMany({ email });

    console.log("OTP:", otp);

    await PasswordReset.create({
      userId: user._id.toString(),
      email,
      otp,
      expiresAt,
    });
    console.log("Password reset saved!");

    await sendEmail(
      email,
      "Reset Password Mail",
      `Hello ${user.name}, your OTP is ${otp}`,
    );

    return res.status(201).json({
      message: "OTP has been sent to your registered email adderss.",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error",
      success: false,
    });
  }
};

export const VerifyOTP = async (
  req: Request<{}, {}, VerifyOTPData>,
  res: Response<VerifyOTPResponse>,
) => {
  try {
    await connectToDB();

    const { email, otp } = req.body;

    const OTP = await PasswordReset.findOne({ email });

    if (!OTP) {
      return res.status(400).json({
        message: "OTP does not exists ",
        success: false,
      });
    }

    if (OTP.expiresAt < new Date()) {
      await PasswordReset.deleteOne({ email });
      return res.status(400).json({
        message: "OTP has expired",
        success: false,
      });
    }

    if (OTP.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    const resetToken = await jwt.sign(
      {
        userId: OTP.userId,
        email: OTP.email,
        otp: OTP.otp,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("resetToken", resetToken);

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error verifying otp",
      success: false,
    });
  }
};

export const ResetPassword = async (
  req: Request<{}, {}, ResetPasswordData>,
  res: Response<ResetPassworResponse>,
) => {
  try {
    await connectToDB();

    const { email, newPassword } = req.body;

    const resetToken = req.cookies.resetToken;

    if (!resetToken) {
      return res.status(401).json({
        message: "Please verify OTP first",
        success: false,
      });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User does not exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateduser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { returnDocument: "after" },
    );

    res.clearCookie("resetToken");
    await PasswordReset.deleteMany({ userId });

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error resetting password",
      success: false,
    });
  }
};
