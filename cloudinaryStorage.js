import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 🔍 Check if Cloudinary connection is working
cloudinary.api.ping((err, res) => {
  if (err) {
    console.error("❌ Cloudinary connection failed:", err.message);
  } else {
    console.log("✅ Cloudinary connected:", res);
  }
});

// 📦 Cloudinary Storage for PDF uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdf_uploads',
    format: async () => 'pdf',
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

export default storage;
