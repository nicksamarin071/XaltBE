import type { Request, Response } from "express";
import {resSend} from "../middlewares/response/resSend.js";
import { getUserByEmail, createUser, getUsers, getUserById } from "../service/userService.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import userModels from "../models/userModel.js";



export const userRegisterController = async (req:Request, res: Response): Promise<void> => {
    try {
    
    const {username , email, password, number, gender, role} = req.body;
    
    const checkNumber = await userModels.findOne({number})
    if(checkNumber){
        return resSend( res, 400, "Number Already Exit!!", null);    }

    const exitingUser = await getUserByEmail(email);
    if(exitingUser){
      return resSend(res, 400, "User Already Exit", null);
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const UserDetails = await createUser({username, email, password: hashedPassword, number, gender, role});

    const userObject = { ...UserDetails };

    delete userObject.password;


    resSend(res, 200, "User Registed Successfully", userObject);

    } catch (error) {
        console.log(error);
         resSend(res, 500, "", null); 
    }
};


export const userLoginController = async (req:Request, res: Response ): Promise<any> => {
    try {

    const { email, password } = req.body;        
    const user = await getUserByEmail(email);
    if (!user) {
    return resSend(res, 404, "", null);
   }
    
    const isMatch = await bcrypt.compare( password, user.password as string);
   
    if (!isMatch) {
         return resSend(res, 400, "Invalid password", []);  
    }
      
    const token = generateToken({_id: user._id.toString(),email: user.email, role: user.role});

    const userObject = user.toObject();

    delete userObject.password;

    return resSend(res, 200, "Login Successfully", { token, user: userObject, }
    );

    } catch (error) {
         console.log(error);
         resSend(res, 500, "", null); 
    }
    
};


export const getallUserController = async (req: Request, res: Response): Promise<any> => {
    
const user = req.session; 
if (!user || user.role!== "Admin") {
      return resSend(res, 400, "Access denied. Only admin can perform this action.", null);
};

try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 20;
    const skip = (page - 1) * perPage;      
    
     const users = await getUsers().skip(skip).limit(perPage);
     if( !users) {
     return resSend(res, 404, "", null);
     }
    const totalData = await userModels.countDocuments();
    const totalPage = Math.ceil(totalData / perPage);

     return resSend(res, 200, "Get All Users Successfully", {
      users, 
      totalData,
      currentPage: page,
      perPage,
      totalPage,
    })

    } 
    catch (error) {
    console.log(error);
         resSend(res, 500, "", null); 
   }
};


export const getUserByIdController = async (req:Request, res: Response): Promise<any>  => {
    try {
     const id = req.session?._id;     // find  user_id within token
     if (!id) {
       return resSend(res, 401, "", null);
     }
     const getUserDetails = await getUserById(id as string);
    
      if(!getUserDetails){
         return resSend(res, 404, "", null);

    }
    return resSend(res, 201, "User data fetched successfully", getUserDetails); 

    } catch (error) {
        console.log(error);
        resSend(res, 500, "", null); 
    }
    
};

