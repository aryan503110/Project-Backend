import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT;
import UserRoutes from "./routes/UserRoute.js";
import AdminRoutes from "./routes/AdminRoutes.js"
import SalespersonRoutes from "./routes/SalespersonRoutes.js"

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/user", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/salesperson", SalespersonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
