const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({
        message: "All blog fields are required",
      });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      author: req.user._id,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this blog",
      });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content = content || blog.content;

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      blog,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
