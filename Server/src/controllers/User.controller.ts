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
    const verify = await User.find({email})
    if(!verify){
        res.json(400)
        throw new Error('No Email mAtch')
    }else{
        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                _id: user.id,
                email: user.email,
                username: user.username,
                generateToken:generateToken(user.id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid Password / Email')
        }
    }
   
});

export const updateUser:RequestHandler = asyncHandler(async(req, res) => {
    const {email, username, password} = req.body;
    const id = (req.params.id).trim();

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const update = await User.findByIdAndUpdate(id,{$set:{
         email,
         username,
         password:hashPassword,
         profileName: req.file?.originalname
    }});
     res.status(200).json({update})


})

export const protectById:RequestHandler = asyncHandler(async(req:AuthRequest, res) => {
        const id = (req.params.id).trim()
        const getId = await User.findById(id)
        if(getId?._id.toString() !== req.user.id){
            res.status(401)
            throw new Error("You cant manipulate or see the other file of users");
            
          }
        res.status(200).json(getId)
})







export const protect:RequestHandler = asyncHandler(async (req:AuthRequest,res) => {
    res.json(req.user)
})


