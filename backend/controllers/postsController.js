import Post from "../models/postModel.js";
import errorHandler from "../utils/dbErrorHandler.js";
import { catchAsync } from "../utils/catchAsync.js";
import fs, { readFileSync } from "fs";

const createPost = async (req, res) => {
  try {
    const obj = {
      title: req.body.title,
      description: req.body.description,
      photo: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };
    const newPost = await Post.create(obj);
    res.status(200).json({
      status: "success",
      message: "successfully created!",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed!",
      message: err,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      data: {
        post,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      error: "could not retrieve post",
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "sucess",
      data: {
        post,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const Post = await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
