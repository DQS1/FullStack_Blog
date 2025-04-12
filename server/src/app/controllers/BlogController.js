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
    console.log("🚀 ~ createBlog: ~ req:", req);
    try {
      const { title, content, author } = req.body;
      const attachment = req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/default.png";
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
    console.log("🚀 ~ updateBlog: ~ req:", req);
    try {
      const { id } = req.params;
      const { title, content, author } = req.body;

      const blog = await Blog.findById(id);
      console.log("🚀 ~ updateBlog: ~ blog:", blog);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found." });
      }

      const attachment = req.file
        ? `/uploads/${req.file.filename}`
        : blog.attachment;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required." });
      }

      if (req.file && !blog.attachment.endsWith("default.png")) {
        const filePath = path.join(__dirname, "../../..", blog.attachment); // Đường dẫn file
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Xóa file ảnh cũ
          console.log(`Đã xóa file: ${filePath}`);
        }
      }
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $set: { title, content, author, attachment } },
        { new: true }
      );

      res.status(200).json(updatedBlog);
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

        if (fs.existsSync(filePath) && !filePath.endsWith("default.png")) {
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
