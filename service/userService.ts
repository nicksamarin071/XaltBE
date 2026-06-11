import UserModel from "../models/userModel.js";


export const getUsers = ()=>UserModel.find();
export const getUserByEmail = (email: string)=>UserModel.findOne({email}).select("+password");
export const createUser = (values: Record<string, any>)=> new UserModel(values).save().then((user=> user.toObject()));
export const deleteUserById = (id: string)=> UserModel.findByIdAndDelete({_id: id});
export const UpdateUserById = (id: string, values: Record<string, any>)=> UserModel.findByIdAndUpdate(id, values);
export const getUserById = (id: string) => UserModel.findOne({ _id: id });

