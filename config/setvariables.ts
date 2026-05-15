import { getSecret } from "../thirdPartyServices/secrets.js";
import { JWT_SECRET_NAME } from "../utils/constants.js";
import { logInfo } from "../utils/debug.js";

export const setJWTVariable = async () => {
  try {
    // If JWT_SECRET_KEY is already provided in .env, use it and skip AWS
    if (process.env.JWT_SECRET_KEY && process.env.JWT_EXPIRY) {
      logInfo(`== Using JWT Secrets from local environment ==`);
      return;
    }

    // Try to fetch from AWS if credentials might be present
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      const secretData: any = await getSecret(JWT_SECRET_NAME);
      const { jwt_token, jwt_expiry } = secretData;

      if (jwt_token && jwt_expiry) {
        process.env.JWT_SECRET_KEY = jwt_token;
        process.env.JWT_EXPIRY = jwt_expiry;
        logInfo(`== JWT Secrets fetched from AWS ==`);
        return;
      }
    }

    // If we reach here, we don't have JWT secrets
    if (process.env.NODE_ENV === "dev" || !process.env.NODE_ENV) {
      logInfo("== AWS credentials missing, using default development JWT secrets ==");
      process.env.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "development_secret_key";
      process.env.JWT_EXPIRY = process.env.JWT_EXPIRY || "24h";
    } else {
      throw new Error("== Failed to receive secrets jwt_token and jwt_expiry. Please check AWS credentials or .env file. ==");
    }
  } catch (error) {
    if (process.env.NODE_ENV === "dev" || !process.env.NODE_ENV) {
      logInfo("== AWS Secret fetch failed, using default development JWT secrets ==");
      process.env.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "development_secret_key";
      process.env.JWT_EXPIRY = process.env.JWT_EXPIRY || "24h";
    } else {
      throw error;
    }
  }
};
