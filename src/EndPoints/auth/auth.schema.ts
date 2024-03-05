import mongoose from "mongoose";

export let userSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    email:String,
    password: String,
    image:String,
    isAdmin:Boolean
})