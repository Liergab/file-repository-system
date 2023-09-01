import { InferSchemaType, Schema, model } from "mongoose";

const userPicSchema = new Schema({
 
   profileName:{
    type:String
   }
},{timestamps:true});

type userpic = InferSchemaType<typeof userPicSchema>;

export default model<userpic>('userprofile', userPicSchema)