import { resSend } from "./resSend.js";
const errorHandler = (error, req, res, next) => {
    if (!error) {
        return next();
    }
    resSend(res, 400, error.message, null);
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map