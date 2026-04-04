import Post from "../models/vacancymodels.js";
import { isValidObjectId } from 'mongoose';

// --- ADD POST ---
export const AddPost = async (req, res) => {
  // Direct req.body use karein ya req.body.jobData, 
  // bas frontend se match hona chahiye. Yahan maine jobData rakha hai.
  const { title, description, requirements, benefits } = req.body.jobData || req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    const newPost = new Post({ 
      title, 
      description, 
      requirements: Array.isArray(requirements) ? requirements : [], 
      benefits: Array.isArray(benefits) ? benefits : [] 
    });

    await newPost.save();
    res.status(201).json({ success: true, message: "Post added successfully", data: newPost });
  } catch (err) {
    console.error("AddPost Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// --- GET ALL POSTS ---
export const AllPost = async (req, res) => {
  try {
    const result = await Post.find({}).sort({ createdAt: -1 }); // Newest first
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// --- EDIT POST ---
export const EditPost = async (req, res) => {
  try {
    const { _id, currentJob } = req.body;

    if (!_id || !isValidObjectId(_id)) {
      return res.status(400).json({ success: false, message: "Valid Post ID is required" });
    }

    // Data formatting logic
    const updateData = {
      title: currentJob.title,
      description: currentJob.description,
      requirements: Array.isArray(currentJob.requirements) 
        ? currentJob.requirements 
        : (typeof currentJob.requirements === 'string' ? currentJob.requirements.split('\n') : []),
      benefits: Array.isArray(currentJob.benefits) 
        ? currentJob.benefits 
        : (typeof currentJob.benefits === 'string' ? currentJob.benefits.split('\n') : [])
    };

    // Clean empty entries
    updateData.requirements = updateData.requirements.map(s => s.trim()).filter(Boolean);
    updateData.benefits = updateData.benefits.map(s => s.trim()).filter(Boolean);

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ success: true, message: "Updated successfully", data: updatedPost });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- DELETE POST (BY ID) ---
// --- DELETE POST ---
export const DeletePost = async (req, res) => {
  let postId = req.params.id || req.body._id || req.body.id;

  try {
    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid Post ID is required" 
      });
    }

    const result = await Post.findByIdAndDelete(postId);

    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Post deleted successfully" 
    });
  } catch (err) {
    console.error("DeletePost Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: err.message 
    });
  }
};