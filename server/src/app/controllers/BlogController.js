import Blog from "../models/BlogModel.js";

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
      const newBlog = req.body;

      const blog = new Blog(newBlog);
      await blog.save();
      res.status(200).json(blog);
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
};

export default BlogController;
