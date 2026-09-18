import connectToDB from "../db/db.ts";
import User from "../model/User.js";
import type { Request, Response } from "express";

export const GetAllSalesperson = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const salespersons = await User.find({ role: "salesperson" }).select("-password");;

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
