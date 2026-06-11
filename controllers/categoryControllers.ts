import type {Request, Response } from "express";
import categoryModel from "../models/categoryModel.js";
import { resSend } from "../middlewares/response/resSend.js";
import { deleteCategoryById } from "../service/categoryService.js";
import mongoose from "mongoose";
import { deleteimageFromS3 } from "../thirdPartyServices/configure.s3.js";
import { uploadImagesToS3 } from "../thirdPartyServices/uploadimages.s3.js";



export const createCategoryController = async (req:Request, res: Response): Promise<any> => {
    
const user = req.session; 
if (!user || user.role!== "Admin") {
return resSend(res, 400, "Access denied. Only admin can perform this action.", null);
};

try {
        const {name, description, title, status } = req.body;
         const CheckCategory = await categoryModel.findOne({name});
        if(CheckCategory){
            return resSend(res, 400, "Category Already Exit", null );
        }

        const uploadedImages = await uploadImagesToS3(req);
           if (uploadedImages.length === 0) {
            return resSend(res, 400, "Image is required", null);
        }

        const  categoryDetails = await categoryModel.create({
            name, description, title, status,  image: uploadedImages,
        });
        return resSend(res, 201, "Category Created SuccessFully", categoryDetails );

    } catch (error) {
        console.log(error);
        resSend(res, 500, "", null);  
    }
};


export  const getALLCategoryConroller = async (req:Request, res: Response): Promise<any> => {
    
     try {
       const page = parseInt(req.query.page as string) || 1;
       const perPage = parseInt(req.query.perPage as string) || 20;
       const skip = (page - 1) * perPage;      
       
        const  category = await categoryModel.find().skip(skip).limit(perPage);
        if( !category) {
        return resSend(res, 404, "", null);
        }
       const totalData = await categoryModel.countDocuments();
       const totalPage = Math.ceil(totalData / perPage);
   
        return resSend(res, 200, "Get All Category Successfully", {
         category, 
         totalData,
         currentPage: page,
         perPage,
         totalPage,
       })
   
       } 
       catch (error) {
       console.log(error);
       resSend(res, 500, "", null); 
      }
}


export const getProductByCategoryIdController = async (req: Request, res: Response): Promise<any> => {
 try {
   const name = req.query?.name;
   if (!name || typeof name !== "string") {
  return resSend(res, 400, "Category name is required", null);
}

const getCategoryDetails = await categoryModel.findOne({name});
    if(!getCategoryDetails){
     return resSend(res, 404, "", null);
    }
    return resSend(res, 200, "Category data fetched successfully", getCategoryDetails); 
     } catch (error) {
         console.log(error);
            resSend(res, 500, "", null); 
    }
    
}


export const updateCategoryController = async (req:Request, res: Response): Promise<any> => {
 
const user = req.session; 
if (!user || user.role!== "Admin") {
return resSend(res, 400, "Access denied. Only admin can perform this action.", null);
};

try {
        const { id } = req.body;
         if (!id) {
            return resSend(res, 400, "Category ID is required", null);
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
          return resSend(res, 400, "Invalid Category id", null);
        };

         const category = await categoryModel.findById(id);
            if (!category) {
              return resSend(res, 404, "Product not found", null);
            }
            const uploadedImages = await uploadImagesToS3(req);
        
            let imageUrls = category.image;
        
            // If new images uploaded
            if (uploadedImages.length > 0) {
        
              // Delete old images from AWS
              if (category.image?.length > 0) {
        
                for (const image of category.image) {
                  await deleteimageFromS3(image);
                }
              }
        
              // Set new images
              imageUrls = uploadedImages;
            }
        
          
        const {name, description, title, status } = req.body;
        const updateData = {name, description, title, status, image: imageUrls };
        
            // Remove undefined fields
        Object.keys(updateData).forEach((key) => {
              if (updateData[key as keyof typeof updateData] === undefined) {
                delete updateData[key as keyof typeof updateData];
              }
            });
        
            // const updateCategory = await categoryModel.findByIdAndUpdate(id as string, updateData, {new: true});
            const updateCategory = await categoryModel.findOneAndUpdate({ _id: id }, updateData,{ returnDocument: "after" }); //same behavior, but using the newer MongoDB driver terminology
            if (!updateCategory) {
              return resSend(res, 404, "", null);
            }
            return resSend(res, 200, "Category Updated successfully", updateCategory);
         
    } catch (error) {
    console.log(error);
    return resSend(res, 500, "", null);
    }
}


export const deleteCategoryController = async (req: Request,res: Response): Promise<any> => {

const user = req.session; 
  if (!user || user.role!== "Admin") {
  return resSend(res, 400, "Access denied. Only admin can perform this action.", null);
};

try {
    const { id } = req.params;
    if (!id) {
      return resSend(res, 400, "Category ID is required", null);
    }

   if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return resSend(res, 400, "Invalid Category id", null);
   }

    const category = await categoryModel.findById(id);
    if (!category) {
         return resSend(res, 404, "Category not found", null);
    }
   
    // Delete all product images from S3
    if (category.image) {
         await deleteimageFromS3(category.image);
    }

    const deletedCategory = await deleteCategoryById(id as string);
    if (!deletedCategory) {
      return resSend(res, 404, "", null);
    }

    return resSend(res, 200, "Category deleted successfully", null);
  } catch (error) {
    console.log(error);
    return resSend(res, 500, "", null);
  }
};


