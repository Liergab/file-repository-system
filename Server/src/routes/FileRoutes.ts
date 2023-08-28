import  express  from "express";
import * as fileContoller from '../controllers/file.controller'
import protect from "../middleware/Protect";
const router = express.Router();

router.get('/',protect, fileContoller.getFile )
router.get('/:id',protect, fileContoller.getFileById )
router.post('/',protect,  fileContoller.createFile)
router.put('/:id',protect, fileContoller.updateFile)
router.delete('/:id',protect, fileContoller.deleteFile)

export default router