import mongoose, { Schema, Document } from "mongoose";
const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    isSubscribed: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model("Newsletter", newsletterSchema);
//# sourceMappingURL=mailModel.js.map