import jwt, {} from "jsonwebtoken";
// Function to generate a JWT token
export const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || "", { expiresIn: process.env.JWT_EXPIRY || "1h" }); // Token expires in 1 hour
    return token;
};
// Function to verify a JWT token
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                // 'decoded' will contain the payload data
                resolve(decoded);
            }
        });
    });
};
//# sourceMappingURL=jwt.js.map