import mongoose from "mongoose";

export let EventSchema = new mongoose.Schema({
    
    _id: { type: Number},
    name: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },

})