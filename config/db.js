import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
function ConnectDb() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("MongoDB Connected Successfully");
        })
        .catch((err) => {
            console.log(`MongoDB Connection Failed: ${err}`);
        });
}

export default ConnectDb;
