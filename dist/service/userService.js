import UserModel from "../models/userModel.js";
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email) => UserModel.findOne({ email }).select("+password");
export const createUser = (values) => new UserModel(values).save().then((user => user.toObject()));
export const deleteUserById = (id) => UserModel.findByIdAndDelete({ _id: id });
export const UpdateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);
export const getUserById = (id) => UserModel.findOne({ _id: id });
//# sourceMappingURL=userService.js.map