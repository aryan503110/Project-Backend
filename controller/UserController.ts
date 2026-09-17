import connectToDB from "../db/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import type { Request, Response } from "express";
import { sendEmail } from "../utils/SendMail.js";

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
      role:user?.role
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
