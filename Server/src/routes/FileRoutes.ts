import  express  from "express";
import * as fileContoller from '../controllers/file.controller'
import protect from "../middleware/Protect";
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'src/public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
  });
  
         const upload = multer({
    storage:storage
  });

router.get('/',protect, fileContoller.getFile )
router.get('/:id',protect, fileContoller.getFileById )
router.post('/',upload.single('pdf') ,protect  ,fileContoller.createFile)
router.put('/:id',protect, fileContoller.updateFile)
router.delete('/:id',protect, fileContoller.deleteFile)

export default router