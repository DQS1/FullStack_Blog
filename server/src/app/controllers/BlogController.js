import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "../models/BlogModel.js";

const __filename = fileURLToPath(import.meta.url);
console.log("🚀 ~ __filename:", __filename);
const __dirname = path.dirname(__filename);
console.log("🚀 ~ __dirname:", __dirname);

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
      const updateBlog = req.body;

      const blog = await Blog.findByIdAndUpdate(
        {
          _id: updateBlog._id,
        },
        updateBlog,
        { returnDocument: "after" }
      );

      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: error });
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
        console.log("🚀 ~ deleteBlog: ~ filePath:", filePath);
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
