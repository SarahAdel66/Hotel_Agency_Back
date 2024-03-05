import mongoose from "mongoose";

export let ReviwesForHotelSchema = new mongoose.Schema({
    
    _id: { type: Number},
    rating: { type: Number, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    text: { type: String, required: true },

})