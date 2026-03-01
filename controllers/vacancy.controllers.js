import express from "express";
import Post from "../models/vacancymodels.js";
import { isValidObjectId } from 'mongoose';

// ADD POST
export const AddPost = async (req, res) => {
    console.log("AddPost Request Body:", req.body);
  const { title, description, requirements, benefits } = req.body.jobData;

  try {
    if (!title || !description || !requirements || !benefits) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = new Post({ title, description, requirements, benefits });
    await newPost.save();

    res.status(201).json({ message: "Post added successfully" });
  } catch (err) {
    console.error("AddPost Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// GET ALL POSTS
export const AllPost = async (req, res) => {
  try {
    
    const result = await Post.find({});

    if (result.length === 0) {
      return res.status(200).json({ data: [], message: "No posts available" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("AllPost Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// EDIT POST



export const EditPost = async (req, res) => {
  try {
    // Log the incoming request for debugging
    console.log('Request body:', req.body);
    
    // Destructure the request body
    const { _id, currentJob } = req.body;
    
    // Validate required fields
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required"
      });
    }

    if (!currentJob || !currentJob.title || !currentJob.description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    // Validate ObjectId format
    if (!isValidObjectId(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID format"
      });
    }

    // Check if post exists
    const existingPost = await Post.findById(_id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // Extract fields from currentJob
    const { title, description, requirements, benefits } = currentJob;

    // Prepare update data with proper formatting
    const updateData = {
      title,
      description,
      requirements: Array.isArray(requirements) ? 
                   requirements : 
                   (typeof requirements === 'string' ? requirements.split('\n') : []),
      benefits: Array.isArray(benefits) ? 
               benefits : 
               (typeof benefits === 'string' ? benefits.split('\n') : [])
    };

    // Clean arrays by removing empty strings
    if (Array.isArray(updateData.requirements)) {
      updateData.requirements = updateData.requirements.filter(item => item.trim() !== '');
    }
    if (Array.isArray(updateData.benefits)) {
      updateData.benefits = updateData.benefits.filter(item => item.trim() !== '');
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { 
        new: true, 
        runValidators: true,
        context: 'query' // Ensures validators run with the update operation
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost
    });

  } catch (err) {
    console.error("EditPost Error:", err);
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors
      });
    }
    
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
// DELETE POST
export const DeletePost = async (req, res) => {

  const {title } = req.body;
    console.log(title);

  try {
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await Post.deleteOne({ title });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", result: true });
  } catch (err) {
    console.error("DeletePost Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const GetPostByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    if (!title) {
      return res.status(400).json({ message: "Title parameter is required" });
    }

    const post = await Post.findOne({ title });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ data: post, message: "Post fetched successfully" });
  } catch (err) {
    console.error("GetPostByTitle Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};