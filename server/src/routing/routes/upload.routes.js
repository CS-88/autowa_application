const router = require("express").Router();

const multer = require('../../middleware/multer');
let upload = require("../../controllers/upload.controller")

//Routes related to user uploadst
router.post("/create", multer.upload, upload.createUpload);

module.exports = router;