import { type VerifyErrors } from "jsonwebtoken";
interface TokenPayload {
    _id: string;
    email: string;
    role: string;
}
export declare const generateToken: (payload: TokenPayload) => string;
export declare const verifyToken: (token: string) => Promise<TokenPayload | VerifyErrors>;
export {};
//# sourceMappingURL=jwt.d.ts.map