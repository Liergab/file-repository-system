import express from 'express';
import 'dotenv/config';
import env from './utils/EnvValidation';
import cors from 'cors'
import db from './config/dbConnection';
import { ErrorHandler, notFoundPage } from './middleware/Errorhandler';
import fileRouter from './routes/FileRoutes';
import UserRouter from './routes/UserRoutes'





const app = express();
app.use(cors());
app.use(express.json())

app.use(express.urlencoded({extended:true}));
app.use('/api/file/', fileRouter)
app.use('/api/', UserRouter )
app.use(notFoundPage)
app.use(ErrorHandler)

// interface UploadedFile extends Express.Multer.File {
//     path: string;
//   }


 



const Port = env.PORT || 8000 ;

db();
app.listen(Port, () => {
    console.log(`connected in Port: http://localhost:${Port}`)
});