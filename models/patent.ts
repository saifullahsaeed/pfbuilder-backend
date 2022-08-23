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
    office: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    patentUrl: {
        type: String,
        minlength: 3,
        maxlength: 255,
        RegExp: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    },
    patentState: {
        type: String,
        required: true,
        options: ['Pending', 'Granted', 'Denied'],
    },
    patentNumber: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    date: {
        type: Date,
    },
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

export default mongoose.model("Patent", userSchema);