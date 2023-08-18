import asyncHandler from 'express-async-handler'
import { RequestHandler } from "express";
import User from '../model/user.model'
import bcrypt from 'bcrypt'
import generateToken from '../utils/GenerateToken';
import { AuthRequest } from '../Types/Types';

//  @decs - Register
// @routes - get api/register
//  @access - public
type register = {
    email:string,
    password:string,
    username:string
}
export const userRegister:RequestHandler<unknown,unknown, register, unknown> = asyncHandler( async(req,res) => {
    const {username, password, email} = req.body;

    if(!username || !password || !email){
        res.status(400);
        throw new Error('All Fields Required!')
    }

    const accountValidation = await User.findOne({email});

    if(accountValidation){
        res.status(400);
        throw new Error('Email Already Taken!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username:username,
        email:email,
        password:hashedPassword
    });

    res.status(201).json({
        _id: user.id,
        email: user.email,
        username: user.username,
        generateToken : generateToken(user.id)
    })
});

//  @decs - Login 
// @routes - get api/login
//  @access - public
type login = {
    email:string,
    password:string
}

export const userLogin:RequestHandler<unknown, unknown, login, unknown> = asyncHandler( async(req,res) => {
    const {email, password} = req.body


    const user = await User.findOne({email})
    if(!user){
        res.json(400)
        throw new Error('Email not found')
    }
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            email: user.email,
            username: user.username,
            generateToken:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
});

export const protects:RequestHandler = asyncHandler( (req:AuthRequest,res) => {
  res.json(req.user)
});


