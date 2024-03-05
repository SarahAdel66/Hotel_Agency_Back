import mongoose from "mongoose";

export let UserSchema = new mongoose.Schema({
    
    _id: { type: Number},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },

})