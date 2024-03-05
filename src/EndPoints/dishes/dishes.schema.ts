import mongoose from "mongoose";

export let DishesSchema = new mongoose.Schema({
    _id:Number,
    title:String,
    description:String,
    image: String,
    price:Number
})