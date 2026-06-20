import mongoose, { Document, Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false //Use For Password hidden automatically 
    },
    number: {
        type: String,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=userModel.js.map