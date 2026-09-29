import connectToDB from "../db/db.js";
import type { Request, Response } from "express";
import stripe from "../utils/stripe.js";
import Order from "../model/Order.js";
import Product from "../model/Product.js";
import SalespersonStock from "../model/SalespersonStock.js";

export const GetAvailableProductsForCustomer = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const { search, category } = req.query;

    const productQuery: any = {};

    if (search) {
      productQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      productQuery.category = category;
    }

    const products = await Product.find(productQuery);

    const productIds = products?.map((product) => product._id);

    const stock = await SalespersonStock.find({
      stock: { $gt: 0 },
      product: { $in: productIds },
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

    const { id } = req.params;

    const stock = await SalespersonStock.findById(id)
      .populate("product")
      .populate("salesperson", "-password");

    if (!stock) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

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

export const CreateCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const customerId = req.user.userId;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "inr",

          product_data: {
            name: item.name,
          },

          unit_amount: item.sellingprice * 100,
        },

        quantity: item.quantity,
      })),

      metadata: {
        customerId: customerId.toString(),
        items: JSON.stringify(
          items.map((item: any) => ({
            salespersonstockid: item.salespersonstockid,
            salespersonid: item.salespersonid,
            productid: item.productid,
            quantity: item.quantity,
            sellingprice: item.sellingprice,
          })),
        ),
      },

      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:5173/cart",
    });

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating checkout session",
      success: false,
    });
  }
};

export const CreateOrder = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment not completed",
        success: false,
      });
    }

    const customerId = session.metadata?.customerId;
    const items = JSON.parse(session.metadata?.items || "[]");

    for (const item of items) {
      const stock = await SalespersonStock.findById(item.salespersonstockid);

      if (!stock || stock.stock < item.quantity) {
        return res.status(400).json({
          message: "Product is out of stock",
          success: false,
        });
      }

      await Order.create({
        customer: customerId,
        salesperson: item.salespersonid,
        product: item.productid,
        quantity: item.quantity,
        price: item.sellingprice,
        totalAmount: item.sellingprice * item.quantity,
        paymentStatus: "paid",
        orderStatus: "ordered",
      });

      stock.stock -= item.quantity;

      await stock.save();
    }

    return res.status(201).json({
      message: "Order created successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating order",
      success: false,
    });
  }
};

export const GetMyOrdersByCustomerId = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const customerId = req.user.userId;

    const orders = await Order.find({
      customer: customerId,
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
