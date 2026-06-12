import { resSend } from "../middlewares/response/resSend.js";
export const healthCheckC = async (req, res, next) => {
    try {
        resSend(res, 200, "Ok.", {});
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=commonController.js.map