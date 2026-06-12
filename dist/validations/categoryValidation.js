import Joi from "joi";
const commonFields = {
    id: Joi.string().length(24),
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    title: Joi.string(),
    image: Joi.array(),
    page: Joi.number(),
    perPage: Joi.number(),
};
export const createCategoryValidation = Joi.object({
    name: commonFields.name.required(),
    description: commonFields.description.required(),
    status: commonFields.status.optional(),
    title: commonFields.title.required(),
    image: commonFields.image.optional(),
});
export const updateCategoryValidation = Joi.object({
    id: commonFields.id.required(),
    name: commonFields.name.optional(),
    description: commonFields.description.optional(),
    status: commonFields.status.optional(),
    title: commonFields.title.optional(),
    image: commonFields.image.optional(),
});
export const getCategoryValidation = Joi.object({
    name: commonFields.name.optional(),
});
export const getALLCategoryValidation = Joi.object({
    page: commonFields.page.optional(),
    perPage: commonFields.perPage.optional(),
});
//# sourceMappingURL=categoryValidation.js.map