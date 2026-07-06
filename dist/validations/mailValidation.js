import Joi from "joi";
export const ExpertEmailValidation = Joi.object({
    product_id: Joi.string().required(),
});
export const EmailValidation = Joi.object({
    email: Joi.string().required(),
});
//# sourceMappingURL=mailValidation.js.map