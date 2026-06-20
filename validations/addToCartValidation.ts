import Joi from "joi";


const commonFields = {
  id: Joi.string().length(24),
  user_id: Joi.string().length(24),
  product_id: Joi.string(),
  items: Joi.array().items(Joi.object({
    product_id: Joi.string().length(24),
    quantity: Joi.number().valid(-1, 0, 1).integer().min(1).default(1),
    })
 ),
  quantity: Joi.number().valid(-1, 0, 1).integer().min(1).default(1),
  total_amount: Joi.number(),
};


export const createAddCartValidation = Joi.object({
    product_id: commonFields.product_id.required(),
    quantity: commonFields.quantity.required(),

}); 