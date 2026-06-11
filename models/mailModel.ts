import mongoose, { Schema, Document } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  isSubscribed: boolean;
}

const newsletterSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INewsletter>("Newsletter", newsletterSchema);