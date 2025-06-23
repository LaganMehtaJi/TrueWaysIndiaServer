import mongoose from "mongoose";
import {Schema} from "mongoose";

const HrSchema = new Schema({
    emailId:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require:true
    }
});

const Hr = mongoose.model("Hr",HrSchema);
export default Hr;
