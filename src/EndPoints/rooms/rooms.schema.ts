import mongoose from "mongoose";

export let RoomSchema = new mongoose.Schema({
    
    _id: { type: Number},
    type: { type: String, required: true },
    standardOccupancy: { type: Number, required: true },
    maximumOccupancy: { type: Number, required: true },
    image: { type: String, required: true },
    basePrice: { type: Number, required: true },
    extraPerson: { type: Number, required: true },
    services: { type: [String], required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },

})