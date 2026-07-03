import Joi from "joi";


export const EmailValidation = Joi.object({
    product_id: Joi.string().required(), 

});