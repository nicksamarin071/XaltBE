import message from "./msgs.js";
export const resSend = (res, code, msg, data) => {
    try {
        const result = {};
        const n_code = code ? code : 455;
        const m = message[n_code];
        result.success = m ? m.status : n_code;
        result.message = msg ? msg : (m ? m.message : "Unknown Error");
        result.data = data;
        res.status(m ? m.httpCode : 280).send(result);
    }
    catch (error) {
        res.status(406).send({
            success: false,
            message: "Failure while encrypting data: " + error.message,
        });
    }
};
//# sourceMappingURL=resSend.js.map