import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        RegExp: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        RegExp: /^[0-9]{10}$/,
    },
    address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    city: {
        type: String,
        minlength: 3,
        maxlength: 255,
    },
    country: {
        type: String,
        minlength: 3,
        maxlength: 255,
    },
    zipCode: {
        type: String,
        minlength: 3,
        maxlength: 255,
    },
    profileUrl: {
        type: String,
        minlength: 3,
        maxlength: 255,
        RegExp: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 1055,
    },
    links: {
        type: Array,
    },

} ,{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

//if profile with userId exists, update it, else create new profile
export default mongoose.model("Profile", userSchema);
