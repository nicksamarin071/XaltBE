export declare const getUsers: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[], import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/userModel.js").IUser, "find", {}>;
export declare const getUserByEmail: (email: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/userModel.js").IUser, "findOne", {}>;
export declare const createUser: (values: Record<string, any>) => Promise<import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const deleteUserById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/userModel.js").IUser, "findOneAndDelete", {}>;
export declare const UpdateUserById: (id: string, values: Record<string, any>) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/userModel.js").IUser, "findOneAndUpdate", {}>;
export declare const getUserById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, import("mongoose").Document<unknown, {}, import("../models/userModel.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userModel.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/userModel.js").IUser, "findOne", {}>;
//# sourceMappingURL=userService.d.ts.map