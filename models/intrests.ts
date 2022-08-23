import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

export default mongoose.model("Interest", userSchema);