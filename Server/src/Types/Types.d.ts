// import { Request } from 'express';
import userModel from '../model/user.model';

// Define your user type (replace with your actual user type)


// declare module 'express' {
//   interface Request {
//     user:userModel;
   
//   }
// }

import {Request} from "express"

export interface AuthRequest extends Request {
    user?: userModel
}