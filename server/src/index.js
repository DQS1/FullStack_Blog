import express from "express";
import cors from "cors";
import router from "./routers/index.js";
import connect from "./config/db.js";
import cookieParser from "cookie-parser";
import "./config/dotenv.js";

const app = express();

const port = process.env.port || 5000;

connect();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
