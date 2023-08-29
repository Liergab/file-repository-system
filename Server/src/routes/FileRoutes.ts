import  express  from "express";
import * as fileContoller from '../controllers/file.controller'
import protect from "../middleware/Protect";
import multer from 'multer'
import path from 'path'
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'src/public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
  });
  
         const upload = multer({
    storage:storage
  });

router.get('/',protect, fileContoller.getFile )
router.get('/:id',protect, fileContoller.getFileById )
router.post('/',upload.single('file') ,protect  ,fileContoller.createFile)
router.put('/:id',protect, fileContoller.updateFile)
router.delete('/:id',protect, fileContoller.deleteFile)

export default router