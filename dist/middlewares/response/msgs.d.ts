type MessageCode = 200 | 201 | 400 | 401 | 403 | 404 | 406 | 409 | 426 | 500;
type Message = {
    [key: number]: {
        message: string;
        httpCode: number;
        status: boolean;
    };
} & {
    [key in MessageCode]: {
        message: string;
        httpCode: number;
        status: boolean;
    };
};
declare const message: Message;
export default message;
//# sourceMappingURL=msgs.d.ts.map