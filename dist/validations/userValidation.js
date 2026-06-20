import Joi from "joi";
const commonFields = {
    username: Joi.string()
        .min(3)
        .max(30)
        .messages({
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters",
    }),
    email: Joi.string()
        .email()
        .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
    }),
    password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,}$/)
        .required()
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.pattern.base": "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@#$%^&*!)",
    }),
    number: Joi.string().min(5).max(10),
    gender: Joi.string().valid("male", "female", "other"),
    role: Joi.string().valid("User", "Admin"),
};
// Register Validation
export const registerValidation = Joi.object({
    username: commonFields.username.required(),
    email: commonFields.email.required(),
    password: commonFields.password.required(),
    number: commonFields.number.optional(),
    gender: commonFields.gender.optional(),
    role: commonFields.role.required(),
});
// Login Validation
export const loginValidation = Joi.object({
    email: commonFields.email.required(),
    password: commonFields.password.required(),
});
export const userUpdateValidation = Joi.object({
    username: commonFields.username.optional(),
    email: commonFields.email.optional(),
    password: commonFields.password.optional(),
    number: commonFields.number.optional(),
    gender: commonFields.gender.optional(),
    role: commonFields.role.optional(),
});
//# sourceMappingURL=userValidation.js.map