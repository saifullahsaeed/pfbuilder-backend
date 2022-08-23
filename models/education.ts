import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    institute: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    feildofstudy: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    degree: {
        type: String,
    },
    grade: {
        type: String,
    },     
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 1055,
    },
    schoolUrl: {
        type: String,
        minlength: 3,
        maxlength: 255,
        RegExp: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    },
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

export default mongoose.model('Education', userSchema);