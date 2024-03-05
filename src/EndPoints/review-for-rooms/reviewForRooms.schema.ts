import mongoose from "mongoose";

export let ReviewForRoomsSchema = new mongoose.Schema({
    _id:Number,
    roomId:Number,
    rating:Number,
    author: String,
    date:String,
    text:String,
    imageUrl:String
})