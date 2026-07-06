import mongoose, {Document, Schema} from "mongoose";


export interface IProduct extends Document {
    productName: string,
    description : string,
    category_id: mongoose.Types.ObjectId,
    service: string,
    status?: string;
    image: string[];  
    sku?: number;
    brands: string;
    // slug: string;        //Rogue Echo Bike V3.0
    price: number;
    discount_price?: number;
    gst_Percentage : number;
    gst_price?: number; 
    stock: number;
    is_new: boolean;
    filters: object;
    feature_image: string;
    logo_name: string;
    weight: string;

}

const productSchema = new mongoose.Schema({
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category", 
      required: true
    },

    productName : {
        type: String,
        required: true,
        unique: true,
    },
    description : {
        type: String,
        required: true,

    },

    service: {
       type: String,
    },

    status : {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    image: {
      type: Array,
    },
    
    price: {
      type: Number,
      required: true,
    },

    gst_Percentage: {
      type: Number,
    },

    brands: {
    type: String,
    },

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
    type: Number,
    },
    
    gst_price: {
      type: Number,
      default: 0,
    },

    filters: {
     type: Object
    },

    feature_image: {
     type: String,
    },

    logo_name:{
     type: String,
    },

    weight :{
     type: String,
    },

    is_new: {
    type: Boolean,
    default: false,
  },

  
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", productSchema);