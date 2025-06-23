import mongoose from "mongoose";
const { Schema } = mongoose;

const JobSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true

  },experience: {
    type: String,
    required: true
  },
  hasLaptopandInternet: {
    type: Boolean,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  knowsEnglish: {
    type: Boolean,
    required: true
  },
  cvUrl:{
    type:String,
    require:true
    },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model("Job", JobSchema);

export default Job;
