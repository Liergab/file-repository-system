import { RequestHandler } from "express";
import files from '../model/file.model'
import asyncHandler from 'express-async-handler'
import mongoose from "mongoose";
import { AuthRequest } from '../Types/Types';


//  @decs - get file data
// @routes - get api/file
//  @access - public
export const getFile:RequestHandler = asyncHandler( async(req:AuthRequest, res) => {
   if(!req.user){
    res.status(404);
    throw new Error('User cannot found!');
    
   }
    const getFile = await files.find({user :req.user.id}).exec();
    res.status(200).json(getFile)

});

//  @decs - get file data By id
// @routes -get api/file:id
//  @access - public
export const getFileById:RequestHandler = asyncHandler( async(req:AuthRequest, res) => {
  const id = (req.params.id).trim()
  
  if(!mongoose.isValidObjectId(id)){
    res.status(404)
    throw new Error('Error Id from mongoose')
  }

  if(!req.user){
    res.status(404);
    throw new Error('User cannot found!');
    
   }

  const getFileById = await files.findById(id);

  if(getFileById?.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("You cant manipulate or see the other file of users");
    
  }
  if(!getFileById || getFileById == null){
    res.status(404)
    throw new Error('Id cannot found!')
  }
  res.status(200).json(getFileById)

});




//  @decs - Create files
// @routes - post api/file:id
//  @access - public
export const createFile:RequestHandler = asyncHandler(async(req:AuthRequest, res) => {
    const {memo ,title} = req.body;
    

    if(!memo || !title){
        res.status(400);
        throw new Error('All Fields required!')
    } 

    if(!req.user){
      res.status(404);
      throw new Error('User cannot found!');
      
     }

    const createFile = await files.create({memo, title, user:req.user.id});

    res.status(201).json({message:'Successfull', Data:createFile, person:req.user})
});


//  @decs - delete files
// @routes - delete api/file:id
//  @access - public
export const updateFile:RequestHandler = asyncHandler( async(req:AuthRequest, res) => {
   const id = (req.params.id).trim();
   const {memo , title} = req.body

   if(!mongoose.isValidObjectId(id)){
    res.status(400);
    throw new Error('Error from mongoose id');
   }

   if(!id){
    res.status(404);
    throw new Error('Id cannot found!');
    
   }

   if(!req.user){
    res.status(404);
    throw new Error('User cannot found!');
    
   }


   const updateFile = await files.findByIdAndUpdate(id, {$set:{memo, title}});

   if(updateFile?.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("You cannot Updated Other File");
   }

   res.status(201).json(updateFile)

});

export const deleteFile:RequestHandler = asyncHandler( async(req:AuthRequest, res) => {
 const id = (req.params.id).trim()

 if(!mongoose.isValidObjectId(id)){
    res.status(400);
    throw new Error('Error from mongoose id');
   }

   if(!id){
    res.status(404);
    throw new Error('Id cannot found!');
    
   }

   if(!req.user){
    res.status(404);
    throw new Error('User cannot found!');
    
   }

   const removeFile = await files.findByIdAndDelete(id)
   if(removeFile?.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("You cannot Delete others File");
   }

   res.status(200).json(removeFile)


});

