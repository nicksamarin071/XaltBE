import { resSend } from "../response/resSend.js";
const options = {
    errors: {
        wrap: {
            label: "",
        },
    },
};
const reqValidator = (validator) => {
    return async function (req, res, next) {
        try {
            // if (["GET", "DELETE"].includes(req.method)) {
            //   req.query = await validator.validateAsync(req.query, options);
            if (["GET", "DELETE"].includes(req.method)) {
                req.validatedQuery = await validator.validateAsync(req.query, options);
            }
            else if (["POST", "PUT", "PATCH"].includes(req.method)) {
                req.body = await validator.validateAsync(req.body, options);
            }
            next();
        }
        catch (error) {
            resSend(res, 406, error.message, null);
        }
    };
};
export default reqValidator;
//# sourceMappingURL=reqValidator.js.map