import connectToDB from "../db/db.js";
import type { Request, Response } from "express";
import SalespersonStock from "../model/SalespersonStock.js";
import SalespersonStockRequest from "../model/SalespersonStockRequest.js";
import AdminStock from "../model/AdminStock.js";
import Order from "../model/Order.js";
import Product from "../model/Product.js";

interface SalespersonStockData {
  requestedStock: number;
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

    const { search, salesperson } = req.query;

    const query: any = {};

    if (salesperson) {
      query.salesperson = salesperson;
    }

    if (search) {
      const product = await Product.find({
        name: {
          $regex: search,
          $options: "i",
        },
      });

      const productId = product.map((item) => item._id);

      query.product = {
        $in: productId,
      };
    }

    const stockRequests = await SalespersonStockRequest.find(query)
      .populate("product")
      .populate("salesperson", "-password");

    return res.status(200).json({
      message: "Salesperson Stock fetched",
      success: true,
      stockRequests,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching salesperson requested stock",
      success: false,
    });
  }
};

export const GetAllSalespersonStockRequestsById = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const { search, status } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      const product = await Product.find({
        name: {
          $regex: search,
          $options: "i",
        },
      });

      const productId = product.map((item) => item._id);

      query.product = {
        $in: productId,
      };
    }

    const stockRequests = await SalespersonStockRequest.find({
      salesperson: id,
      ...query,
    })
      .populate("product")
      .populate("salesperson", "-password");

    return res.status(200).json({
      message: "Salesperson Stock fetched",
      success: true,
      stockRequests,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching salesperson stock",
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

    const newStockRequest = new SalespersonStockRequest({
      salesperson,
      product,
      requestedStock: stock,
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

    const stockRequest = await SalespersonStockRequest.findById(id);

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

    if (adminStock.stock < stockRequest.requestedStock) {
      return res.status(400).json({
        message: "Not enough admin stock",
        success: false,
      });
    }

    // Remove stock from admin
    adminStock.stock -= stockRequest.requestedStock;

    await adminStock.save();

    // Find salesperson's existing stock for this product
    let salespersonStock = await SalespersonStock.findOne({
      salesperson: stockRequest.salesperson,
      product: stockRequest.product,
    });

    if (salespersonStock) {
      // Existing product → increase stock
      salespersonStock.stock += stockRequest.requestedStock;
    } else {
      // First time receiving this product
      salespersonStock = new SalespersonStock({
        salesperson: stockRequest.salesperson,
        product: stockRequest.product,
        stock: stockRequest.requestedStock,
      });
    }

    await salespersonStock.save();

    // Mark request as approved
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

    const stockRequest = await SalespersonStockRequest.findById(id);

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

{
  /*My Stock Salesperson */
}

export const MyStockForSalesperson = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const { search } = req.query;

    const query: any = {};

    if (search) {
      const product = await Product.find({
        name: {
          $regex: search,
          $options: "i",
        },
      });

      const productId = product.map((item) => item._id);

      query.product = {
        $in: productId,
      };
    }

    const stock = await SalespersonStock.find({ salesperson: id, ...query })
      .populate("product")
      .populate("salesperson", "-password");

    return res.status(200).json({
      message: "My stock fetched successfully",
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

export const MyStockForSalespersonById = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const { id } = req.params;

    const stock = await SalespersonStock.findById({
      _id: id,
    })
      .populate("product")
      .populate("salesperson", "-password");

    return res.status(200).json({
      message: "My stock fetched successfully",
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

export const UpdateMyStockSalespersonById = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const { id } = req.params;
    const { normalSellingPrice, subscriptionSellingPrice } = req.body;
    const stock = await SalespersonStock.findByIdAndUpdate(id, {
      normalSellingPrice,
      subscriptionSellingPrice,
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Stock updated",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating stock",
      success: false,
    });
  }
};

{
  /*Order Salesperson */
}

export const GetMyOrdersBySalespersonId = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const salespersonId = req.user.userId;

    const { search, status } = req.query;

    const query:any={}

    if(status){
      query.orderStatus=status
    }

    if(search){
      const product=await Product.find({
        name:{
          $regex:search,
          $options:"i"
        }
      })

      const productId=product.map((item)=>item._id)

      query.product={
        $in:productId
      }
    }

    const orders = await Order.find({
      salesperson: salespersonId,
      ...query
    })
      .populate("product")
      .populate("salesperson", "-password")
      .populate("customer", "-password");

    return res.status(200).json({
      message: "My orders fetched successfully",
      success: true,
      order: orders,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching my orders",
      success: false,
    });
  }
};

export const ChangeStatusOrder = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, {
      orderStatus: status,
    });

    return res.status(200).json({
      message: "Order status updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating order status",
      success: false,
    });
  }
};
