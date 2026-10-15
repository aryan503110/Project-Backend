import connectToDB from "../db/db.js";
import type { Request, Response } from "express";
import stripe from "../utils/stripe.js";
import Order from "../model/Order.js";
import Product from "../model/Product.js";
import SalespersonStock from "../model/SalespersonStock.js";
import CustomBasket from "../model/CustomBasket.js";

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

    const stock = await (SalespersonStock as any)
      .find({
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

      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.FRONTEND_URL}/cart`,
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

    const customerId = session.metadata?.customerId!;
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

    const { search, status } = req.query;

    const query: any = {};

    if (status) {
      query.orderStatus = status;
    }

    if (search) {
      const product = await (Product as any).find({
        name: {
          $regex: search,
          $options: "i",
        },
      });

      const productId = product.map((item: any) => item._id);

      query.product = {
        $in: productId,
      };
    }

    const orders = await Order.find({
      customer: customerId,
      ...query,
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

{
  /*Custom Basket */
}

export const CreateBasketCheckoutSession = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const { items } = req.body;

    const line_items = [];

    for (const item of items) {
      const stock = await SalespersonStock.findById(
        item.salespersonStock,
      ).populate("product", "name");

      if (!stock || stock.stock < item.quantity) {
        return res.status(400).json({
          message: "Insufficient stock",
          success: false,
        });
      }

      const price = stock.subscriptionSellingPrice ?? stock.normalSellingPrice;

      if (price == null) {
        return res.status(400).json({
          message: "Product price not found",
          success: false,
        });
      }

      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: (stock.product as any)?.name || "Basket Product",
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      metadata: {
        customerId: req.user.userId.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}/basket-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/createbasket`,
    });

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error creating basket checkout session",
      success: false,
    });
  }
};

export const CreateCustomBasket = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const customerId = req.user.userId;
    const { sessionId, items, isGift, giftMessage } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (
      session.payment_status !== "paid" ||
      session.metadata?.customerId !== customerId.toString()
    ) {
      return res.status(400).json({
        message: "Payment not completed",
        success: false,
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Basket items are required",
        success: false,
      });
    }

    // Check stock before deducting
    for (const item of items) {
      const stock = await SalespersonStock.findById(item.salespersonStock);

      if (
        !stock ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        stock.stock < item.quantity
      ) {
        return res.status(400).json({
          message: "Insufficient stock",
          success: false,
        });
      }
    }

    // Deduct stock
    for (const item of items) {
      const updated = await SalespersonStock.findOneAndUpdate(
        {
          _id: item.salespersonStock,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
      );

      if (!updated) {
        return res.status(400).json({
          message: "Stock changed. Please contact support.",
          success: false,
        });
      }
    }

    const basket = await CustomBasket.create({
      customer: customerId,
      items,
      isGift,
      giftMessage,
      status: "confirmed",
    });

    return res.status(201).json({
      message: "Basket created successfully",
      success: true,
      basket,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error creating basket",
      success: false,
    });
  }
};

export const GetBasketOrdersByCustomerId = async (
  req: Request,
  res: Response,
) => {
  try {
    await connectToDB();

    const customerId = req.user.userId;

    const baskets = await CustomBasket.find({
      customer: customerId,
    })
      .populate({
        path: "items.salespersonStock",
        populate: [
          {
            path: "product",
          },
          {
            path: "salesperson",
            select: "-password",
          },
        ],
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Basket orders fetched successfully",
      success: true,
      baskets,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching basket orders",
      success: false,
    });
  }
};
