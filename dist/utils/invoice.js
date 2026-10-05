import PDFDocument from "pdfkit";
export const generateInvoice = (order) => {
    const doc = new PDFDocument({
        margin: 50,
    });
    // =========================
    // HEADER
    // =========================
    doc.fontSize(26).font("Helvetica-Bold").text("MY E-COMMERCE STORE");
    doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("gray")
        .text("Your trusted online shopping store");
    doc.moveDown(1.5);
    doc.fontSize(24).font("Helvetica-Bold").fillColor("black").text("INVOICE", {
        align: "right",
    });
    doc.moveDown();
    // =========================
    // INVOICE DETAILS
    // =========================
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Invoice No: ${order._id}`)
        .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown(1.5);
    // =========================
    // CUSTOMER / SELLER
    // =========================
    doc.fontSize(12).font("Helvetica-Bold").text("Customer Details");
    doc.moveDown(0.5);
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Name: ${order.customer?.name || "N/A"}`)
        .text(`Email: ${order.customer?.email || "N/A"}`);
    doc.moveDown();
    doc.fontSize(12).font("Helvetica-Bold").text("Seller Details");
    doc.moveDown(0.5);
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Name: ${order.salesperson?.name || "N/A"}`)
        .text(`Email: ${order.salesperson?.email || "N/A"}`);
    doc.moveDown(2);
    // =========================
    // PRODUCT TABLE
    // =========================
    const tableTop = doc.y;
    doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .text("Product", 50, tableTop)
        .text("Qty", 300, tableTop)
        .text("Price", 350, tableTop)
        .text("Total", 440, tableTop);
    doc
        .moveTo(50, tableTop + 20)
        .lineTo(545, tableTop + 20)
        .stroke();
    const productTop = tableTop + 30;
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(order.product?.name || "Product", 50, productTop)
        .text(String(order.quantity), 300, productTop)
        .text(`₹${order.price}`, 350, productTop)
        .text(`₹${order.totalAmount}`, 440, productTop);
    doc
        .moveTo(50, productTop + 25)
        .lineTo(545, productTop + 25)
        .stroke();
    // =========================
    // TOTAL
    // =========================
    doc.moveDown(3);
    doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(`Total Amount: ₹${order.totalAmount}`, {
        align: "right",
    });
    doc.moveDown(1.5);
    // =========================
    // STATUS
    // =========================
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Payment Status: ${order.paymentStatus}`)
        .text(`Order Status: ${order.orderStatus}`);
    doc.moveDown(3);
    // =========================
    // FOOTER
    // =========================
    doc
        .fontSize(10)
        .fillColor("gray")
        .text("Thank you for shopping with My E-Commerce Store!", {
        align: "center",
    });
    doc.fontSize(8).text("This is a computer-generated invoice.", {
        align: "center",
    });
    doc.end();
    return doc;
};
//# sourceMappingURL=invoice.js.map