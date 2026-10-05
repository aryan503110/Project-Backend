import ai from "./gemini.js";
import connectToDB from "../db/db.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Order from "../model/Order.js";
import SalespersonStockRequest from "../model/SalespersonStockRequest.js";
import AdminStock from "../model/AdminStock.js";
import AiAnalysis from "../model/AiAnalysis.js";
export const generateAIAnalysis = async () => {
    await connectToDB();
    const totalCustomers = await User.countDocuments({
        role: "customer",
    });
    const totalSalespersons = await User.countDocuments({
        role: "salesperson",
    });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalStockRequests = await SalespersonStockRequest.countDocuments();
    const totalAdminStock = await AdminStock.countDocuments();
    const totalRevenue = await Order.aggregate([
        {
            $match: {
                paymentStatus: "paid",
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);
    const businessData = {
        totalCustomers,
        totalSalespersons,
        totalProducts,
        totalOrders,
        totalStockRequests,
        totalAdminStock,
        totalRevenue: totalRevenue[0]?.total || 0,
    };
    const prompt = `
You are a business analyst.

Analyze the following e-commerce business data:

${JSON.stringify(businessData)}

Give a short and useful business analysis for the admin.

Mention:
- important observations
- possible concerns
- useful suggestions

Keep the response simple and concise.
`;
    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
    });
    await AiAnalysis.create({
        analysis: response.text || "",
    });
    return response.text;
};
//# sourceMappingURL=generateAIAnalysis.js.map