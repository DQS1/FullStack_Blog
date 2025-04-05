import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "../models/BlogModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BlogController = {
  getAllBlog: async (req, res, next) => {
    try {
      const blogs = await Blog.find({});
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  createBlog: async (req, res, next) => {
    try {
      const { title, content, author } = req.body;
      const attachment = req.file ? `/uploads/${req.file.filename}` : null;
      const newBlog = new Blog({ title, content, author, attachment });
      await newBlog.save();
      res.status(200).json({
        message: "Upload thành công!",
        blog: newBlog,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updateBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content, author } = req.body;
      const attachment = req.file ? `/uploads/${req.file.filename}` : null;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required." });
      }

      const blog = await Blog.findByIdAndUpdate(
        id,
        { $set: { title, content, author, attachment } },
        { returnDocument: "after" }
      );

      if (!blog) {
        return res.status(404).json({ error: "Blog not found." });
      }

      res.status(200).json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the blog." });
    }
  },
  deleteBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBlog = await Blog.findByIdAndDelete(id);

      if (!deletedBlog) {
        return res.status(400).json({ message: "Blog not found" });
      }

      if (deletedBlog.attachment) {
        const filePath = path.join(
          __dirname,
          "../../..",
          deletedBlog.attachment
        ); // Đường dẫn file
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Xóa file ảnh
        }
      }

      res.status(200).json({ message: "Blog deleted successfully" });
    } catch {
      res.status(500).json({ error: error });
    }
  },
};

export default BlogController;
