import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import emailRoutes from "./routes/emial.routes.js";
import jobApplyRoutes from "./routes/jobApply.routes.js";
import postJobRoutes from "./routes/vacancy.routes.js";
dotenv.config();
ConectDb();
const app = express();
app.use(cors(process.env.CORS_URL));
app.use(express.json());

app.use("/auth",authRoutes);
app.use("/email",emailRoutes);
app.use("/job",jobApplyRoutes);
app.use("/post",postJobRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server Start ${process.env.PORT}`);
});

