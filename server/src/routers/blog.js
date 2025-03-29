import express from "express";
import BlogController from "../app/controllers/BlogController.js";
import upload from "../config/multer/index.js";

const blogRoute = express.Router();

blogRoute.get("/blog", BlogController.getAllBlog);
blogRoute.post(
  "/create",
  upload.single("attachment"),
  BlogController.createBlog
);
blogRoute.post("/update", BlogController.updateBlog);
blogRoute.delete("/delete/:id", BlogController.deleteBlog);

export default blogRoute;
