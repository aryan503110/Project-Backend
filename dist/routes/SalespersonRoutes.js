import express from "express";
const router = express.Router();
import { GetAllProduct } from "../controller/AdminController.js";
import { GetAllSalespersonStockRequests, CreateSalespersonStockRequests, ApproveSalespersonStockRequest, RejectSalespersonStockRequest, MyStockForSalesperson, MyStockForSalespersonById, UpdateMyStockSalespersonById, GetAllSalespersonStockRequestsById, GetMyOrdersBySalespersonId, ChangeStatusOrder, GetSalespersonDashboard, GetSalespersonTopProducts, GetSalespersonOrderStatus, GetSalespersonMonthlyRevenue, } from "../controller/SalespersonController.js";
import { authMiddleware, roleMiddleware, } from "../middleware/authMiddleware.js";
{
    /*Products */
}
router.get("/allproducts", authMiddleware, roleMiddleware("admin", "salesperson"), GetAllProduct);
{
    /*Stock Requests */
}
router.get("/allstockrequests", authMiddleware, roleMiddleware("salesperson", "admin"), GetAllSalespersonStockRequests);
router.get("/allstockrequests/:id", authMiddleware, roleMiddleware("salesperson", "admin"), GetAllSalespersonStockRequestsById);
router.post("/createstockrequest", authMiddleware, roleMiddleware("salesperson"), CreateSalespersonStockRequests);
router.put("/approvestockrequest/:id", authMiddleware, roleMiddleware("admin"), ApproveSalespersonStockRequest);
router.put("/rejectstockrequest/:id", authMiddleware, roleMiddleware("admin"), RejectSalespersonStockRequest);
{
    /*My Stock Salesperson */
}
router.get("/salespersonmystock/:id", authMiddleware, roleMiddleware("salesperson"), MyStockForSalesperson);
router.get("/salespersonmystockbyid/:id", authMiddleware, roleMiddleware("salesperson"), MyStockForSalespersonById);
router.put("/updatesalespersonmystockbyid/:id", authMiddleware, roleMiddleware("salesperson"), UpdateMyStockSalespersonById);
{
    /*Orders */
}
router.get("/ordersbysalesperson/:id", authMiddleware, roleMiddleware("salesperson"), GetMyOrdersBySalespersonId);
router.put("/changeorderstatus", authMiddleware, roleMiddleware("salesperson"), ChangeStatusOrder);
{
    /*Salesperson Dashboard */
}
router.get("/dashboard", authMiddleware, roleMiddleware("salesperson"), GetSalespersonDashboard);
router.get("/dashboard/top-products", authMiddleware, roleMiddleware("salesperson"), GetSalespersonTopProducts);
router.get("/dashboard/order-status", authMiddleware, roleMiddleware("salesperson"), GetSalespersonOrderStatus);
router.get("/dashboard/revenue", authMiddleware, roleMiddleware("salesperson"), GetSalespersonMonthlyRevenue);
export default router;
//# sourceMappingURL=SalespersonRoutes.js.map