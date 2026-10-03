import connectToDB from "../db/db.js";
import Order from "../model/Order.js";
import { generateInvoice } from "../utils/invoice.js";
export const DownloadInvoice = async (req, res) => {
    try {
        await connectToDB();
        const { orderId } = req.params;
        const order = await Order.findOne({
            _id: orderId,
            customer: req.user.userId,
        })
            .populate("product")
            .populate("customer", "-password")
            .populate("salesperson", "-password");
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                success: false,
            });
        }
        const pdf = generateInvoice(order);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=invoice-${order._id}.pdf`);
        pdf.pipe(res);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error generating invoice",
            success: false,
        });
    }
};
//# sourceMappingURL=InvoiceController.js.map