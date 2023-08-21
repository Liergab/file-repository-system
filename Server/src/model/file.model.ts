import mongoose, { InferSchemaType, Schema, model} from "mongoose";


const fileSchema = new Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    memo:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
},{timestamps:true})

type File = InferSchemaType<typeof fileSchema>;

export default model<File>('files',fileSchema)