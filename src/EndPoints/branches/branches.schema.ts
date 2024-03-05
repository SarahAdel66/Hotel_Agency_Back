import mongoose from "mongoose";

export let BranchesSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    overview:String,
    address: String,
    phone:String,
    email:String
})