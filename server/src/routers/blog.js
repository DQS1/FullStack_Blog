import express from "express";
import BlogController from "../app/controllers/BlogController.js";

const blogRoute = express.Router();

blogRoute.get("/blog", BlogController.getAllBlog);
blogRoute.post("/create", BlogController.createBlog);
blogRoute.post("/update", BlogController.updateBlog);

export default blogRoute;
