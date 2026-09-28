import connectToDB from "../db/db.js";
import type { Request, Response } from "express";
import SalespersonStock from "../model/SalespersonStock.js";

export const GetAvailableProductsForCustomer = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const stock = await SalespersonStock.find({
      stock: { $gt: 0 },
    })
      .populate("product")
      .populate("salesperson", "-password");

    return res.status(200).json({
      message: "Stock fetched successfully",
      success: true,
      stock,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching stock",
      success: false,
    });
  }
};

export const ViewProductByIdCustomer = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params();

    const stock = await SalespersonStock.find({
      _id:id
    })
      .populate("product")
      .populate("salesperson", "-password");

    return res.status(200).json({
      message: "Stock fetched successfully",
      success: true,
      stock,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching stock",
      success: false,
    });
  }
};
