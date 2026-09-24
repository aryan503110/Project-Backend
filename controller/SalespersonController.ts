import connectToDB from "../db/db.js";
import type { Request, Response } from "express";
import SalespersonStock from "../model/SalespersonStock.js";
import AdminStock from "../model/AdminStock.js";

interface SalespersonStockData {
  stock: number;
}

interface SalespersonStockResponse {
  message: string;
  success: boolean;
}

export const GetAllSalespersonStockRequests = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();
    const stockRequests = await SalespersonStock.find().populate("product");
    return res.status(200).json({
      message: "All Salesperson Stock fetched",
      success: true,
      stockRequests: stockRequests,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error fetching salesperson stock ",
      success: false,
    });
  }
};

export const CreateSalespersonStockRequests = async (
  req: Request<{}, {}, SalespersonStockData>,
  res: Response<SalespersonStockResponse>,
) => {
  try {
    await connectToDB();

    const { salesperson, product, stock } = req.body;

    const newStockRequest = new SalespersonStock({
      salesperson,
      product,
      stock,
    });

    await newStockRequest.save();

    return res.status(201).json({
      message: "Created Salesperson Stock Request",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating salesperson stock request",
      success: false,
    });
  }
};

export const ApproveSalespersonStockRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const stockRequest = await SalespersonStock.findById(id);

    if (!stockRequest) {
      return res.status(404).json({
        message: "Stock request not found",
        success: false,
      });
    }

    if (stockRequest.status !== "pending") {
      return res.status(400).json({
        message: "Stock request already processed",
        success: false,
      });
    }

    const adminStock = await AdminStock.findOne({
      product: stockRequest.product,
    });

    if (!adminStock) {
      return res.status(404).json({
        message: "Admin stock not found",
        success: false,
      });
    }

    if (adminStock.stock < stockRequest.stock) {
      return res.status(400).json({
        message: "Not enough admin stock",
        success: false,
      });
    }

    adminStock.stock -= stockRequest.stock;

    await adminStock.save();

    stockRequest.status = "approved";

    await stockRequest.save();

    return res.status(200).json({
      message: "Stock request approved",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error approving stock request",
      success: false,
    });
  }
};

export const RejectSalespersonStockRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const stockRequest = await SalespersonStock.findById(id);

    if (!stockRequest) {
      return res.status(404).json({
        message: "Stock request not found",
        success: false,
      });
    }

    if (stockRequest.status !== "pending") {
      return res.status(400).json({
        message: "Stock request already processed",
        success: false,
      });
    }

    stockRequest.status = "rejected";

    await stockRequest.save();

    return res.status(200).json({
      message: "Stock request rejected",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error rejecting stock request",
      success: false,
    });
  }
};

export const MyStockForSalesperson = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const stockRequest = await SalespersonStock.find({
      salesperson: id,
      status: "approved",
    }).populate("product");

    if (!stockRequest || stockRequest.length === 0) {
      return res.status(404).json({
        message: "Stock not found for user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "My stock fetched successfully",
      success: true,
      stockRequest: stockRequest,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching stock",
      success: false,
    });
  }
};
