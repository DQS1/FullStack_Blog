import express from "express";
import upload from "../middleware/upload.js";
import blogController from "../app/controllers/blog.Controller.js";
import { requireAuth } from "../middleware/auth.js";

const blogRoute = express.Router();

blogRoute.get("/blog", requireAuth, blogController.getAllBlog);
blogRoute.post(
  "/create",
  requireAuth,
  upload.single("attachment"),
  blogController.createBlog
);
blogRoute.patch(
  "/update/:id",
  requireAuth,
  upload.single("attachment"),
  blogController.updateBlog
);
blogRoute.delete("/delete/:id", requireAuth, blogController.deleteBlog);

export default blogRoute;
