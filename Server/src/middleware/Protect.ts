import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import env from '../utils/EnvValidation'
import asyncHandler from 'express-async-handler';

import { ObjectId } from 'mongoose'; 
import {  NextFunction, Response } from 'express';
import { AuthRequest } from '../Types/Types';


interface DecodedToken {
    id: ObjectId; // Change to the appropriate type if you're not using ObjectId
}






const protect = asyncHandler(async(req:AuthRequest, res:Response, next:NextFunction) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error("Not Authorize");
            
        }
      
    }

    if(!token){
        res.status(401)
        throw new Error("Not Autorize || No Token");
        
    }
})

export default protect