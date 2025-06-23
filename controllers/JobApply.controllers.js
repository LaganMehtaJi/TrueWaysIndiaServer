import express from "express";
import Job from "../models/JobApply.models.js";

// Apply for a job
export const ApplyJob = async (req, res) => {
  try {
    // Parse JSON string sent via FormData from React
 

    const {
      fullName,              
      email,
      contactNumber,
      address,
      experience,
      hasLaptopandInternet,
      qualification,
      knowsEnglish,
    } = req.body.formData;
   
    // Get uploaded CV file path (via multer or Cloudinary) 
  const {cvUrl} =  req.body;
    const newApplication = new Job({
      fullName,
      email,
      contactNumber,
      address,
      experience,
      hasLaptopandInternet,
      qualification,
      knowsEnglish,
      cvUrl
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error("Job application failed:", error);
    res.status(500).json({ error: "Failed to submit job application." });
  }
};
// Get all job applications
export const GetAllApply = async (req, res) => {
  try {
    const allApplications = await Job.find();
    res.status(200).json(allApplications);
  } catch (error) {
    console.error("Fetching applications failed:", error);
    res.status(500).json({ error: "Failed to fetch applications." });
  }
};

export const DeleteApply = async (req,res)=>{
  try{
      const {fullName} = req.body;
      console.log(fullName);
      if(!fullName){
        res.status(400).json({message:"Hr require details of application"})
      }
      const result = await Job.deleteOne({fullName})
      if(result.deletedCount === 0){
         res.status(500).json({ error: "Failed to delete applications." });
      }
       res.status(200).json({ error: "The selected application has been removed from the system." });
  }catch(err){
    res.status(500).json({ error: "Failed to delete applications." });
  }
}