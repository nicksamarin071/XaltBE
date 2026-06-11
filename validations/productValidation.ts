import Joi from "joi";

const commonFields = {
    id: Joi.string().length(24),
    category_id: Joi.string().hex().length(24),
    subCategory_id: Joi.string().hex().length(24),
    productName: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    price: Joi.number(),
    image: Joi.array(),
    filters: Joi.object()
      .pattern(Joi.string(), Joi.array().items(Joi.string()))
     ,
    sku: Joi.number(),
    brands:Joi.string(),
    discount_price: Joi.number(), 
    gst_Percentage: Joi.number(), 
    gst_price: Joi.number(),
    stock: Joi.number(), 
    is_new: Joi.boolean(),
    page: Joi.number(),
    perPage: Joi.number(),

};


export const createProductValidation = Joi.object({
  category_id: commonFields.category_id.required(),
  subCategory_id: commonFields.subCategory_id.optional(),
  productName: commonFields.productName.required(), 
  description: commonFields.description.required(),
  status: commonFields.status.optional(),
  price: commonFields.price.optional(),
  image: commonFields.image.optional(),
  filters: commonFields.filters.optional(),
  sku: commonFields.sku.optional(),
  brands: commonFields.brands.optional(),
  discount_price: commonFields.discount_price.optional(),
  gst_Percentage: commonFields.gst_Percentage.optional(),
  gst_price: commonFields.gst_price.optional(),
  stock: commonFields.stock.optional(),
  is_new: commonFields.is_new.optional(),


});



export const UpdateproductValidation = Joi.object({
  id: commonFields.id.required(),
  category_id: commonFields.category_id.optional(),
  subCategory_id: commonFields.subCategory_id.optional(),
  productName: commonFields.productName.optional(), 
  description: commonFields.description.optional(),
  status: commonFields.status.optional(),
  price: commonFields.price.optional(),
  image: commonFields.image.optional(),
  filters: commonFields.filters.optional(),
  sku: commonFields.sku.optional(),
  brands: commonFields.brands.optional(),
  discount_price: commonFields.discount_price.optional(),
  gst_Percentage: commonFields.gst_Percentage.optional(),
  gst_price: commonFields.gst_price.optional(),
  stock: commonFields.stock.optional(),
  is_new: commonFields.is_new.optional(),

});


export const getALLProductValidation = Joi.object({
  page: commonFields.page.optional(),
  perPage: commonFields.perPage.optional(),
});


export const getProductByIdValidation = Joi.object({
    productName: commonFields.productName.required(), 

})