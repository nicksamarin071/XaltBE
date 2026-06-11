import mongoose, {Document, Schema} from "mongoose";


export interface ICategory extends Document{
    name: string,
    description: String,
    title : string,
    status?: string;
    image: string[];  
};


const categorySchema =new Schema<ICategory>(
    {

      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      description: {
        type: String,
      },

      title: {
        type: String,
      },

      image: {
        type: [String],
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );


export default  mongoose.model<ICategory>( "Category", categorySchema);

