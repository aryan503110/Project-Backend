import connectToDB from "../db/db.ts";
import User from "../model/User.js";
import type { Request, Response } from "express";
import cloudinary from "../utils/Cloudinary.js";
import Category from "../model/Category.js";

interface categoryData {
  categoryName: string;
}

interface categoryResponse {
  message: string;
  success: boolean;
}

export const GetAllSalesperson = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const salespersons = await User.find({ role: "salesperson" }).select(
      "-password",
    );

    return res.status(200).json({
      message: "All Salesperson fetched",
      success: true,
      salespersons: salespersons,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching user",
      success: false,
    });
  }
};

export const GetSalesPersonById = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const salesperson = await User.findOne({
      _id: id,
      role: "salesperson",
    }).select("-password");

    if (!salesperson) {
      return res.status(404).json({
        message: "Salesperson not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Salesperson fetched",
      success: true,
      salesperson: salesperson,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching salesperson",
      success: false,
    });
  }
};

export const UpdateSalesPersonById = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id, name, email } = req.body || {};

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      imageUrl = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        image: imageUrl,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "Salesperson updated",
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating salesperson",
      success: false,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const salespersons = await User.find({ role: "salesperson" }).select(
      "-password",
    );

    return res.status(200).json({
      message: "All Salesperson fetched",
      success: true,
      salespersons: salespersons,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching user",
      success: false,
    });
  }
};

export const GetAllCategory = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const categories = await Category.find();

    return res.status(200).json({
      message: "All categories fetched",
      success: true,
      categories: categories,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching categories",
      success: false,
    });
  }
};

export const CreateCategory = async (
  req: Request<{}, {}, categoryData>,
  res: Response<categoryResponse>,
) => {
  try {
    await connectToDB();
    const { categoryName } = req.body;
    const category = await Category.findOne({ categoryName });
    if (category) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
      });
    }

    const newCategory = new Category({
      categoryName,
    });

    await newCategory.save();

    return res.status(200).json({
      message: "Category Created",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating category",
      success: false,
    });
  }
};
