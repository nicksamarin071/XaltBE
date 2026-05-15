import jwt, { type VerifyErrors } from "jsonwebtoken";

// Interface for the payload data you want to include in the token
interface TokenPayload {
  userId: string;
  // Add more properties if needed
}

// Function to generate a JWT token
export const generateToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || "", { expiresIn: (process.env.JWT_EXPIRY as any) || "1h" }); // Token expires in 1 hour
  return token;
};

// Function to verify a JWT token
export const verifyToken = (token: string): Promise<TokenPayload | VerifyErrors> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        // 'decoded' will contain the payload data
        resolve(decoded as TokenPayload);
      }
    });
  });
};
