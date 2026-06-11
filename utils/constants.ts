export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_HOST = process.env.MONGO_HOST;
export const MONGO_PORT = process.env.MONGO_PORT;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const MONGO_DB = process.env.MONGO_DB;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET_NAME = process.env.JWT_SECRET_NAME;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const AWS_REGION = process.env.AWS_REGION;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;
export const AWS_S3_FOLDER = process.env.AWS_S3_FOLDER;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;




// This is Constants Value of Products Cateogory =============

export const newGear = "6a2272d24ef4f64ce50425d4";
export const rigsAndRacks = "6a227272739158cfd6295e50";
export const crossfitEquipment = "6a2271fabf8b4a4816c236dc";
export const barbells = "6a19551af453dee9a589d923";
export const plates = "6a19552cf453dee9a589d924";


export  const categoryToNameMapping = {
    [newGear]:'near-gear',
    [rigsAndRacks]:'rigs-and-racks',
    [crossfitEquipment]:'crossfit-equipment',
    [barbells]:'barbells',
    [plates]:'plates'
}