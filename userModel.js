import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    username:{
      type:String,
      required:true,
      unique:true,
    },
    birthdate:{
      type:Date,
      required:true,
    },
    postalCode:{
      type:String,
      required:true,
    },

  
     points: {
      type: Number,
      default: 0,
    },

    badge: {
      type: String,
      enum: ["normal", "bronze", "silver"],
      default: "normal",
    },
  
    
    

    
  },
  { timestamps: true }
);

export default mongoose.model("Customers", customerSchema);  