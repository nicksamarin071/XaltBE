import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
const client = new SecretsManagerClient();
export const getSecret = async (secretName = "") => {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    try {
        const response = await client.send(command);
        if (response.SecretString) {
            return JSON.parse(response.SecretString);
        }
        else {
            console.error("SecretString is undefined");
            throw new Error("SecretString is undefined");
        }
    }
    catch (error) {
        console.error("Error fetching secret:", error);
        throw error;
    }
};
//# sourceMappingURL=secrets.js.map